"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { LastTimeCheckIn } from "../utils";

interface DetectedStudent {
  firstName: string;
  lastName: string;
  photo1: string;
  studentId: string;
}

export const createAttendance = async (detectedStudent: DetectedStudent) => {
  // Early validation
  if (
    !detectedStudent.firstName ||
    !detectedStudent.lastName ||
    !detectedStudent.photo1
  ) {
    return {
      success: false,
      message: "Invalid student data. Please provide all required fields.",
    };
  }

  try {
    const { firstName, lastName, photo1, studentId } = detectedStudent; // Ensure studentId exists in DetectedStudent
    const cafeteria = "Cafeteria 1";
    const mealType = "Breakfast";

    if (!studentId) {
      return {
        success: false,
        message:
          "Missing student ID. Each student must have a unique identifier.",
      };
    }

    // Check if the student has already checked in recently
    const existingAttendance = await prisma.attendance.findFirst({
      where: { studentId },
      orderBy: {
        timestamp: "desc",
      },
      select: { timestamp: true },
    });

    if (existingAttendance) {
      const isValid = LastTimeCheckIn(existingAttendance.timestamp.toString());
      console.log(`LastTimeCheckIn result: ${isValid}`);
      if (!isValid) {
        return {
          success: false,
          message:
            "🥳 You have had your fun now, food ninja! 🥷 The cafeteria needs to catch its breath! 😌 Check in again later for round two of deliciousness! 🍽️💥",
        };
      }
    }

    // Create a new attendance record
    const result = await prisma.attendance.create({
      data: {
        studentId,
        studentName: `${firstName} ${lastName}`,
        studentPicture: photo1,
        cafeteria,
        mealType,
        checkInMethod: "fr",
        attended: true,
        mealCost: "35",
      },
    });

    revalidatePath("/list/attendances");

    return {
      success: true,
      data: result,
      message:
        "Here to feed your brain... and your belly. Welcome to the cafeteria! 🧠🍕",
    };
  } catch (error) {
    console.error("Error in createAttendance:", error);
    return {
      success: false,
      message: "An error occurred while processing the attendance.",
    };
  }
};

export const getLatestTenAttendance = async () => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const result = await prisma.attendance.findMany({
      take: 5,
      where: {
        timestamp: {
          gte: oneHourAgo,
          lte: now,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      select: {
        studentName: true,
        studentPicture: true,
        cafeteria: true,
        mealType: true,
        timestamp: true,
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error in getLatestTenAttendance:", error);
    return {
      success: false,
      message: "An error occurred while fetching the latest attendance.",
    };
  }
};
