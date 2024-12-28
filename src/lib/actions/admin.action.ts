"use server";

import { ClerkClient, clerkClient } from "@clerk/clerk-sdk-node";
import { Student, StudentForm, StudentServiceForm } from "../../../types";
import cloudinary from "../cloudinary";
import prisma from "../prisma";
import { toISO8601DateTime } from "../utils";
import { revalidatePath } from "next/cache";
import { studentServiceSchema } from "../schema/schema";
import { Role } from "@prisma/client";

export async function createStudent({ data }: { data: Partial<StudentForm> }) {
  const {
    firstName,
    lastName,
    batch,
    scholariship,
    studentId,
    assignedCafeteria,
    email,
    password,
    phone,
    address,
    department,
    birthday,

    sex,
    img1,
    img2,
  } = data;
  if (
    !firstName ||
    !lastName ||
    !batch ||
    !studentId ||
    !email ||
    !phone ||
    !address ||
    !department ||
    !birthday ||
    !sex ||
    !assignedCafeteria
  ) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }

  if (!img1 || !img2) {
    return {
      success: false,
      message: "Please upload two images",
    };
  }

  try {
    const [img1Result, img2Result] = await Promise.all([
      cloudinary.uploader.upload(img1, { folder: "students" }),
      cloudinary.uploader.upload(img2, { folder: "students" }),
    ]);

    const { secure_url: img1Url, public_id: img1Id } = img1Result;
    const { secure_url: img2Url, public_id: img2Id } = img2Result;

    const existingStudentId = await clerkClient.users.getUserList({
      limit: 1,
      query: studentId,
    });

    const existingEmail = await clerkClient.users.getUserList({
      limit: 1,
      query: email,
    });

    if (existingStudentId.data.length > 0 || existingEmail.data.length > 0) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const { id } = await clerkClient.users.createUser({
      firstName,
      lastName,
      username: studentId,
      password,
    });

    const ISODate = toISO8601DateTime(birthday);

    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        batch,
        scholarishipStatus: scholariship,
        studentId,
        email,
        phoneNumber: phone,
        address,
        department,
        dateOfBirth: ISODate,
        gender: sex,
        photo1: img1Url,
        photo2: img2Url,
        photo1Id: img1Id,
        photo2Id: img2Id,

        isBlackListed: false,
        clerkId: id,
        role: "student",
        assignedCafeteria,
      },
    });
    revalidatePath("/list/students");
    return {
      success: true,
      data: newStudent,
    };
  } catch (error) {
    console.error("Error creating student", error);
    return {
      success: false,
      message: "Error creating student",
    };
  }
}

export async function getStudentImages() {
  try {
    const result = await prisma.student.findMany({
      select: {
        photo1: true,
        photo2: true,
        id: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStudentById(id: string) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        photo1: true,
        studentId: true,
      },
    });
    return {
      success: true,
      data: student,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error getting student",
    };
  }
}

export const getAllStudents = async (p: number) => {
  try {
    const students = await prisma.student.findMany({
      skip: (p - 1) * 10,
      take: 10,
    });
    const total = await prisma.student.count();
    if (!students) {
      return {
        success: false,
        message: "cannot find students ",
        data: null,
      };
    }

    return {
      success: true,
      data: students,
      total: total,
    };
  } catch (error) {
    console.log(error, "error occured while fetching students data");
    return {
      error: false,
      message: "something went wrong please try again",
    };
  }
};
export const getAllStudentService = async (p: number) => {
  try {
    const studentService = await prisma.studentService.findMany({
      skip: (p - 1) * 10,
      take: 10,
    });
    const total = await prisma.student.count();
    if (!studentService) {
      return {
        success: false,
        message: "cannot find student service",
        data: null,
      };
    }

    return {
      success: true,
      data: studentService,
      total: total,
    };
  } catch (error) {
    console.log(error, "error occured while fetching students data");
    return {
      error: false,
      message: "something went wrong please try again",
    };
  }
};

export const getStudentDetailsById = async (id: string) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });
    return {
      success: true,
      data: student,
    };
  } catch (error) {
    console.log("error occured while fetching student details", error);
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
};

export const deleteStudent = async (id: string) => {
  if (id === "" || !id) return;
  try {
    const { photo1Id, photo2Id, clerkId }: any =
      await prisma.student.findUnique({
        where: {
          id,
        },
        select: {
          photo1Id: true,
          photo2Id: true,
          clerkId: true,
        },
      });
    console.error(photo1Id, photo2Id, clerkId, "here we go");
    await clerkClient.users.deleteUser(clerkId);

    console.error(clerkId, id, "compare ");
    await cloudinary.uploader.destroy(photo1Id);
    await cloudinary.uploader.destroy(photo2Id);
    const student = await prisma.student.delete({
      where: {
        id,
      },
      include: {
        studentServicesMembership: true,
        attendance: true,
      },
    });

    revalidatePath("/list/students");
    return {
      success: true,
      data: student,
      message: "student deleted successfully",
    };
  } catch (error) {
    console.log("error occured while deleting student", error);
    return {
      success: false,
      message: "something went wrong please try again",
      data: null,
    };
  }
};

export const createStudentService = async ({
  data,
}: {
  data: StudentServiceForm;
}) => {
  const { firstName, lastName, username, address, password } = data;
  if (!firstName || !lastName || !username || !password)
    return { success: false, message: "please fill all fields to register " };
  const validData = studentServiceSchema.safeParse(data);
  const studentService = validData.data;
  if (!validData.success)
    return { success: false, message: `${validData.error.message}` };

  if (!studentService) return;

  const student = await prisma.studentService.create({
    data: {
      firstName: studentService?.firstName,
      lastName: studentService?.lastName,
      email: studentService?.email,
      username: studentService?.username,
      address: studentService?.address,
      phoneNumber: studentService?.phoneNumber,
      photo: studentService?.photo,
      role: Role.studentService,
      department: studentService.department,
      dateOfBirth: studentService.birthday,
      gender: studentService.sex,
    },
  });
};
