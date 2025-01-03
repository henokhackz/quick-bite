"use server";
import { revalidatePath } from "next/cache";

import cloudinary from "../cloudinary";
import bcryptjs from "bcryptjs";

import {
  StudentForm,
  StudentServiceForm,
  TicketHolderForm,
} from "../../../types";
import prisma from "../prisma";
import { page, saltAndHashPassword, toISO8601DateTime } from "../utils";
import {
  studentSchema,
  studentServiceSchema,
  ticketHolderSchema,
} from "../schema/schema";
import { Role } from "@prisma/client";
import { ticketHolders } from "../dummy";

export const deleteImage = async (imageId: string) =>
  await cloudinary.uploader
    .destroy(imageId)
    .then(() => true)
    .catch(() => false);

export async function createStudent({ data }: { data: Partial<StudentForm> }) {
  const validData = studentSchema.safeParse(data);
  if (!validData.success) {
    return {
      success: false,
      message: `${validData.error.message}`,
    };
  }

  const { firstName, lastName, studentId, email, password, img1, img2 } =
    validData.data;

  try {
    const existingStudent = await prisma.user.findUnique({
      where: { username: studentId },
    });

    if (existingStudent) {
      return {
        success: false,
        message: "Student with this username already exists",
      };
    }

    const [img1Result, img2Result] = await Promise.all([
      cloudinary.uploader.upload(img1, { folder: "students" }),
      cloudinary.uploader.upload(img2, { folder: "students" }),
    ]);

    const newStudent = await prisma.user.create({
      data: {
        username: studentId,
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword: await bcryptjs.hash(password, 10),
        student: {
          create: {
            firstName,
            lastName,
            studentId,
            photos: [
              { url: img1Result.secure_url, publicId: img1Result.public_id },
              { url: img2Result.secure_url, publicId: img2Result.public_id },
            ],
          },
        },
      },
    });

    revalidatePath("/list/students");

    return {
      success: true,
      data: newStudent,
    };
  } catch (error) {
    console.error("Error creating student:", error);
    return {
      success: false,
      message: "Error creating student",
    };
  }
}

// export async function getStudentImages() {
//   try {
//     const result = await prisma.student.findMany({
//       select: {
//         photo1: true,
//         photo2: true,
//         id: true,
//       },
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// export async function getStudentById(id: string) {
//   try {
//     const student = await prisma.student.findUnique({
//       where: {
//         id,
//       },
//       select: {
//         firstName: true,
//         lastName: true,
//         photo1: true,
//         studentId: true,
//       },
//     });
//     return {
//       success: true,
//       data: student,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       message: "Error getting student",
//     };
//   }
// }

// export const getAllStudents = async (p: number) => {
//   try {
//     const [students, total] = await prisma.$transaction([
//       prisma.student.findMany({
//         skip: (p - 1) * 10,
//         take: page,
//       }),
//       prisma.student.count(),
//     ]);
//     if (!students) {
//       return {
//         success: false,
//         message: "cannot find students ",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       data: students,
//       total: total,
//     };
//   } catch (error) {
//     console.log(error, "error occured while fetching students data");
//     return {
//       success: false,
//       message: "something went wrong please try again",
//     };
//   }
// };
// // get all student service data
// export const getAllStudentService = async (p: number) => {
//   try {
//     const [studentServices, total] = await prisma.$transaction([
//       prisma.studentService.findMany({
//         skip: (p - 1) * 10,
//         take: 10,
//       }),
//       prisma.student.count(),
//     ]);

//     if (!studentServices) {
//       return {
//         success: false,
//         message: "cannot find student service",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       data: studentServices,
//       total: total,
//     };
//   } catch (error) {
//     console.log(error, "error occured while fetching students data");
//     return {
//       success: false,
//       message: "something went wrong please try again",
//     };
//   }
// };

// export const getStudentDetailsById = async (id: string) => {
//   try {
//     const student = await prisma.student.findUnique({
//       where: {
//         id,
//       },
//     });
//     return {
//       success: true,
//       data: student,
//     };
//   } catch (error) {
//     console.log("error occured while fetching student details", error);
//     return {
//       success: false,
//       message: "something went wrong please try again",
//     };
//   }
// };

// // delete student

// export const deleteStudent = async (id: string) => {
//   if (id === "" || !id)
//     return { success: false, message: "student id is required" };
//   try {
//     const [ photo1Id, photo2Id, clerkId ]: any =
//       await prisma.student.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           photos: true,
//         },
//       });

//     await clerkClient.users.deleteUser(clerkId);

//     const isImg1Deleted = await deleteImage(photo1Id);
//     const isImg2Deleted = await deleteImage(photo2Id);

//     if (!isImg1Deleted || !isImg2Deleted) {
//       return {
//         success: false,
//         message: "something went wrong please try again",
//       };
//     }
//     const student = await prisma.student.delete({
//       where: {
//         id,
//       },
//       include: {
//         studentServicesMembership: true,
//         attendance: true,
//       },
//     });

//     revalidatePath("/list/students");
//     return {
//       success: true,
//       data: student,
//       message: "student deleted successfully",
//     };
//   } catch (error) {
//     console.log("error occured while deleting student", error);
//     return {
//       success: false,
//       message: "something went wrong please try again",
//       data: null,
//     };
//   }
// };

// // create new student service

// export const createStudentService = async ({
//   data,
// }: {
//   data: StudentServiceForm;
// }) => {
//   const validData = studentServiceSchema.safeParse(data);

//   if (!validData.success)
//     return { success: false, message: `${validData.error.message}` };

//   const { firstName, lastName, username, address, password, photo, email } =
//     validData.data;
//   const studentService = validData.data;

//   const [photoResult] = await Promise.all([
//     cloudinary.uploader.upload(photo, { folder: "student-service" }),
//   ]);

//   const { secure_url: photoUrl, public_id: photoId } = photoResult;

//   const existingStudents = await clerkClient.users.getUserList({
//     limit: 10,
//     query: email,
//   });

//   const existingStudent = existingStudents.data.find(
//     (student) => student.username === username
//   );

//   if (existingStudent) {
//     return {
//       success: false,
//       message: "student already exist ",
//     };
//   }

//   const hashedPassword = await bcryptjs.hash(password, 10);
//   try {
//     const newUser = await clerkClient.users.createUser({
//       username,
//       password: hashedPassword,
//       firstName,
//       lastName,
//     });

//     const isoDate = toISO8601DateTime(studentService.birthday);

//     const newStudentService = await prisma.studentService.create({
//       data: {
//         firstName: studentService?.firstName,
//         lastName: studentService?.lastName,
//         email: studentService?.email,
//         username: studentService?.username,
//         address: studentService?.address,
//         phoneNumber: studentService?.phoneNumber,
//         photo: photoUrl,
//         photoId: photoId,
//         role: Role.studentService,
//         department: studentService.department,
//         dateOfBirth: isoDate,
//         gender: studentService.sex,
//         clerkId: newUser.id,
//       },
//     });
//     revalidatePath("/list/student-services");
//     return {
//       success: true,
//       data: newStudentService,
//       message: "student service created successfully",
//     };
//   } catch (error) {
//     console.log("error occured while creating student service", error);
//     return { success: false, message: "something went wrong please try again" };
//   }
// };
// // create new ticket holder
// export const createTicketHolder = async ({
//   data,
// }: {
//   data: TicketHolderForm;
// }) => {
//   const validData = ticketHolderSchema.safeParse(data);

//   if (!validData.success)
//     return { success: false, message: `${validData.error.message}` };

//   const {
//     firstName,
//     lastName,
//     username,
//     address,
//     password,
//     photo,
//     email,
//     assignedCafeteria,
//   } = validData.data;
//   const ticketHolder = validData.data;

//   const [photoResult] = await Promise.all([
//     cloudinary.uploader.upload(photo, { folder: "ticket-holder" }),
//   ]);

//   const { secure_url: photoUrl, public_id: photoId } = photoResult;

//   const existingTicketHolders = await clerkClient.users.getUserList({
//     limit: 10,
//     query: email,
//   });

//   const existingTicketHolder = existingTicketHolders.data.find(
//     (ticketHolder) => ticketHolder.username === username
//   );

//   if (existingTicketHolder) {
//     return {
//       success: false,
//       message: "ticker already exist ",
//     };
//   }

//     const isoDate = toISO8601DateTime(ticketHolder.birthday);

//     const newTicketHolder = await prisma.ticketHolder.create({
//       data: {
//         firstName: ticketHolder?.firstName,
//         lastName: ticketHolder?.lastName,
//         email: ticketHolder?.email,
//         assignedCafeteria: ticketHolder.assignedCafeteria,
//         username: ticketHolder?.username,
//         address: ticketHolder?.address,
//         phoneNumber: ticketHolder?.phoneNumber,
//         photo: photoUrl,
//         photoId: photoId,
//         role: Role.ticketHolder,
//         department: ticketHolder.department,
//         birthday: isoDate,
//         sex: ticketHolder.sex,
//         clerkId: newUser.id,
//       },
//     });
//     revalidatePath("/list/ticket-holder");
//     return {
//       success: true,
//       data: newTicketHolder,
//       message: "ticket holder created successfully",
//     };
//   } catch (error) {
//     console.log("error occured while creating ticket holder", error);
//     return { success: false, message: "something went wrong please try again" };
//   }
// };

// // get all ticket holders data

// export const getAllTicketHolders = async (p: number) => {
//   try {
//     const [ticketHOlders, total] = await prisma.$transaction([
//       prisma.ticketHolder.findMany({
//         skip: (p - 1) * 10,
//         take: 10,
//       }),
//       prisma.student.count(),
//     ]);

//     if (!ticketHolders) {
//       return {
//         success: false,
//         message: "cannot find ticket holders",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       data: ticketHOlders,
//       total: total,
//     };
//   } catch (error) {
//     console.log(error, "error occured while fetching ticket holders data");
//     return {
//       success: false,
//       message: "something went wrong please try again",
//     };
//   }
// };
