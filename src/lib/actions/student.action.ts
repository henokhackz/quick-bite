'use server';

import { z } from 'zod';
import { feedbackSchema } from '../schema/schema';
import { auth } from '../auth';
import prisma from '../prisma';
import cloudinary from '../cloudinary';
import { revalidatePath } from 'next/cache';

export async function submitFeedback(data: z.infer<typeof feedbackSchema>) {
  const { user }: any = await auth();

  if (!user) {
    throw new Error("User must be logged in to submit feedback");
  }

  const validatedData = feedbackSchema.parse(data);
  const { title, message, roles, photo } = validatedData;

  try {
    let photoUrl: string | null = null;
    if (photo) {
      const uploadResult = await cloudinary.uploader.upload(photo, { folder: "feedback" });
      photoUrl = uploadResult.secure_url;
    }

    const feedback = await  prisma.feedback.create({
      data: {
        title,
        message,
        roles,
        photoUrl,
        userId: user.id,
        status: 'PENDING', 
      },
    });
    
    revalidatePath('/list/feedbacks');
    return {success:true, feedback};
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw new Error("Failed to submit feedback");
  }
}

export async function getFeedbacks() {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return {
        data: [],
        total: 0,
        success: false,
        message: "User must be logged in to view feedbacks",
      };
    }

    const isStudent = user.role === "student";

    const page = 1;
    const limit = 10;

    const where = isStudent
      ? { userId: user.id }
      : { roles: { has: user.role } };

    const [data, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true, 
        },
      }),
      prisma.feedback.count({ where }),
    ]);

    return {
      data,
      total,
      success: true,
      message: "Feedbacks fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return {
      data: [],
      total: 0,
      success: false,
      message: "Failed to fetch feedbacks",
    };
  }
}


export const getFeedbackById = async (id: string) => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: { user: true },
    });
    return feedback;
  } catch (error) {
    console.error("Failed to get feedback by ID", error);
    return null;
  }
};



export async function updateFeedbackStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'RESOLVED') {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role === 'student') {
    throw new Error("Unauthorized: Only staff can update feedback status");
  }

  try {
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: { status },
    });

    return { success: true, feedback: updatedFeedback };
  } catch (error) {
    console.error("Failed to update feedback status", error);
    return { success: false, message: "Could not update feedback status" };
  }
}


export async function deleteFeedbackById(id: string) {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role === 'student') {
    throw new Error("Unauthorized: Only staff can delete feedback");
  }

  try {
    await prisma.feedback.delete({
      where: { id },
    });

    return { success: true, message: "Feedback deleted successfully" };
  } catch (error) {
    console.error("Failed to delete feedback", error);
    return { success: false, message: "Could not delete feedback" };
  }
}
