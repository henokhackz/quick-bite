"use server";
import { revalidatePath } from "next/cache";

import cloudinary from "../cloudinary";
import bcryptjs from "bcryptjs";

import { StudentForm, TicketHolderForm } from "../../../types";
import prisma from "../prisma";

import { page, saltAndHashPassword, toISO8601DateTime } from "../utils";
import {
  studentSchema,
  StudentServiceForm,
  ticketHolderSchema,
} from "../schema/schema";
// import { Role } from "@prisma/client";
// import { ticketHolders } from "../dummy";
import { auth } from "../auth";
import { TicketHolder } from "../../../types/index";

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

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    photo1,
    photo2,
    address,
    phoneNumber,
    dateOfBirth,
    gender,
    assignedCafeteria,
    department,
    scholarishipStatus,
    batch,
  } = validData.data;

  try {
    const existingStudent = await prisma.user.findUnique({
      where: { username },
    });

    if (existingStudent) {
      return {
        success: false,
        message: "Student with this username already exists",
      };
    }

    if (!photo1 || !photo2) {
      return {
        success: false,
        message: "Please upload both photos",
      };
    }

    const [img1Result, img2Result] = await Promise.all([
      cloudinary.uploader.upload(photo1, { folder: "students" }),
      cloudinary.uploader.upload(photo2, { folder: "students" }),
    ]);

    if (
      !img1Result ||
      !img2Result ||
      !img1Result.secure_url ||
      !img2Result.secure_url
    ) {
      return {
        success: false,
        message: "Failed to upload images. Please try again.",
      };
    }
    if (!password) {
      return {
        success: false,
        message: "Please enter a password",
      };
    }

    const isoDate = toISO8601DateTime(dateOfBirth as string);

    const newStudent = await prisma.user.create({
      data: {
        username,
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword: await saltAndHashPassword(password),
        role: "student",
        image: img1Result.secure_url,
        Student: {
          create: {
            username,
            firstName,
            batch,
            lastName,
            address,
            role: "student",
            phoneNumber,
            dateOfBirth: isoDate,
            gender,
            assignedCafeteria,
            department,
            email,
            scholarishipStatus: scholarishipStatus ?? "no scholarship",
            photos: {
              create: [
                {
                  photoUrl: img1Result.secure_url,
                  photoId: img1Result.public_id,
                },
                {
                  photoUrl: img2Result.secure_url,
                  photoId: img2Result.public_id,
                },
              ],
            },
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

export async function updateStudent({ data }: { data: Partial<StudentForm> }) {
  // Validate input data
  const validation = studentSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: validation.error.message };
  }

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    photo1,
    photo2,
    address,
    phoneNumber,
    dateOfBirth,
    gender,
    assignedCafeteria,
    department,
    scholarishipStatus,
    batch,
  } = validation.data;

  if (!username) {
    return {
      success: false,
      message: "Student username (student ID) is required",
    };
  }

  try {
    // Fetch existing student record
    const existingStudent = await prisma.user.findUnique({
      where: { username },
      include: {
        Student: true,
      },
    });

    const photos = await prisma.student.findUnique({
      where: { username },
      select: {
        photos: true,
      },
    });

    if (!existingStudent) {
      return {
        success: false,
        message: "Student with this username does not exist",
      };
    }

    const userId = existingStudent.id;

    // Upload photos if provided
    const [img1Result, img2Result] = await Promise.all([
      photo1
        ? cloudinary.uploader.upload(photo1, { folder: "students" })
        : null,
      photo2
        ? cloudinary.uploader.upload(photo2, { folder: "students" })
        : null,
    ]);

    // Prepare updated data
    const isoDate = toISO8601DateTime(dateOfBirth as string);
    const hashedPassword = password
      ? await saltAndHashPassword(password)
      : undefined;

    // Update student record
    const updatedStudent = await prisma.user.update({
      where: { id: userId },
      data: {
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword,
        image: img1Result?.secure_url || existingStudent.image,
        Student: {
          update: {
            where: {
              username,
            },
            data: {
              username,
              firstName,
              lastName,
              batch,
              address,
              phoneNumber,
              dateOfBirth: isoDate,
              gender,
              assignedCafeteria,
              department,
              email,
              role: "student",
              scholarishipStatus: scholarishipStatus || "no scholarship",
              photos: {
                update: [
                  {
                    where: {
                      photoId: photos?.photos[0]?.photoId,
                    },
                    data: {
                      photoUrl: img1Result?.secure_url || existingStudent.image,
                      photoId: img1Result?.public_id || existingStudent.image,
                    },
                  },
                  {
                    where: {
                      photoId: photos?.photos[1]?.photoId,
                    },
                    data: {
                      photoUrl: img2Result?.secure_url || existingStudent.image,
                      photoId: img2Result?.public_id || existingStudent.image,
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    // Revalidate cache
    revalidatePath("/list/students");

    return { success: true, data: updatedStudent };
  } catch (error) {
    console.error("Error while updating student:", error);
    return {
      success: false,
      message: "An error occurred while updating the student.",
    };
  }
}

export const deleteStudent = async (username: string) => {
  console.log(username, "this is student username ");
  if (id === "" || !id)
    return { success: false, message: "student id is required" };
  try {
    const existingStudent = await prisma.student.findUnique({
      where: {
        username,
      },
      include: {
        photos: true,
      },
    });
    if (!existingStudent) {
      return {
        success: false,
        message: "student not found",
      };
    }
    const photo1Id = existingStudent?.photos[0].photoId!;
    const photo2Id = existingStudent?.photos[1].photoId;

    const isImg1Deleted = await deleteImage(photo1Id);
    const isImg2Deleted = await deleteImage(photo2Id);

    if (!isImg1Deleted || !isImg2Deleted) {
      return {
        success: false,
        message: "something went wrong please try again",
      };
    }
    const student = await prisma.user.delete({
      where: {
        username,
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

export const getStudentDetailsById = async (id: string) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
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

export const getAllStudents = async (p: number, query: any) => {
  const session = await auth();
  if (!session && !session?.user) {
    return {
      success: false,
      message: "please  login to view this page",
    };
  }

  const role = session?.user.role;
  if (role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to view this page",
    };
  }
  try {
    const [students, total] = await prisma.$transaction([
      prisma.student.findMany({
        where: query,
        skip: (p - 1) * 10,
        take: page,
        include: {
          photos: true,
        },
      }),
      prisma.student.count(),
    ]);
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
      success: false,
      message: "something went wrong please try again",
    };
  }
};
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
// create new ticket holder
export const createTicketHolder = async ({
  data,
}: {
  data: TicketHolderForm;
}) => {
  const validData = ticketHolderSchema.safeParse(data);

  if (!validData.success) {
    return { success: false, message: validData.error.message };
  }

  const {
    firstName,
    lastName,
    username,
    address,
    password,
    photo,
    email,
    assignedCafeteria,
    dateOfBirth,
    phoneNumber,
    gender,
  } = validData.data;

  try {
    // Upload photo to Cloudinary
    const photoResult = await cloudinary.uploader.upload(photo, {
      folder: "ticket-holder",
    });
    const { secure_url: photoUrl, public_id: photoId } = photoResult;

    // Check for existing ticket holder by username
    const existingTicketHolder = await prisma.user.findUnique({
      where: { username },
    });

    if (existingTicketHolder) {
      return {
        success: false,
        message: "Ticket holder already exists",
      };
    }

    // Convert date of birth to ISO format
    const isoDate = toISO8601DateTime(dateOfBirth);

    // Create new ticket holder
    const newTicketHolder = await prisma.user.create({
      data: {
        username,
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword: await saltAndHashPassword(password),
        role: "ticketHolder",
        ticketHolder: {
          create: {
            username,
            firstName,
            lastName,
            email,
            dateOfBirth: isoDate,
            address,
            phoneNumber,
            gender,
            role: "ticketHolder",
            assignedCafeteria,
            ticketHolderPhoto: {
              create: {
                photoUrl,
                photoId,
              },
            },
          },
        },
      },
    });

    // Revalidate the ticket holder list path
    revalidatePath("/list/ticket-holders");

    return {
      success: true,
      data: newTicketHolder,
      message: "Ticket holder created successfully",
    };
  } catch (error) {
    console.error("Error occurred while creating ticket holder:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

// get all ticket holders data

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves all ticket holders
 * @param p the page number
 * @param query the query to filter the result
 * @returns a promise that resolves to an object with a boolean success property and a data property that contains an array of ticket holders and a total property that contains the total count of ticket holders
 */
/******  b86f39f2-e51d-4835-bb05-3c5f8a0f59b6  *******/
export const getAllTicketHolders = async (p: number, query: any) => {
  try {
    const [ticketHolders, total] = await prisma.$transaction([
      prisma.ticketHolder.findMany({
        where: query,
        skip: (p - 1) * 10,
        take: 10,
        include: {
          ticketHolderPhoto: true,
        },
      }),

      prisma.student.count(),
    ]);

    if (!ticketHolders) {
      return {
        success: false,
        message: "cannot find ticket holders",
        data: null,
      };
    }

    return {
      success: true,
      data: ticketHolders,
      total: total,
    };
  } catch (error) {
    console.log(error, "error occured while fetching ticket holders data");
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
};

export const deleteTicketHolder = async (username: string) => {
  console.log(username, "this is  username ");
  if (username === "" || !username)
    return { success: false, message: "ticket holder is required" };
  try {
    const existingTicketHolder = await prisma.ticketHolder.findUnique({
      where: {
        username,
      },
      include: {
        ticketHolderPhoto: true,
      },
    });
    if (!existingTicketHolder) {
      return {
        success: false,
        message: "ticker not found",
      };
    }
    const photo1Id = existingTicketHolder?.ticketHolderPhoto[0].photoId!;

    const isImg1Deleted = await deleteImage(photo1Id);

    if (!isImg1Deleted) {
      return {
        success: false,
        message: "something went wrong please try again",
      };
    }
    const ticketHolder = await prisma.user.delete({
      where: {
        id: existingTicketHolder.userId as string,
      },
    });

    revalidatePath("/list/ticket-holders");
    return {
      success: true,
      data: ticketHolder,
      message: "ticker deleted successfully",
    };
  } catch (error) {
    console.log("error occured while deleting ticker", error);
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
  const validData = ticketHolderSchema.safeParse(data);

  if (!validData.success) {
    return { success: false, message: validData.error.message };
  }

  const {
    firstName,
    lastName,
    username,
    address,
    password,
    photo,
    email,
    assignedCafeteria,
    dateOfBirth,
    phoneNumber,
    gender,
  } = validData.data;

  try {
    // Upload photo to Cloudinary
    const photoResult = await cloudinary.uploader.upload(photo, {
      folder: "student-service",
    });
    const { secure_url: photoUrl, public_id: photoId } = photoResult;

    // Check for existing student service by username
    const existingStudentService = await prisma.user.findUnique({
      where: { username },
    });

    if (existingStudentService) {
      return {
        success: false,
        message: "Student service already exists",
      };
    }

    // Convert date of birth to ISO format
    const isoDate = toISO8601DateTime(dateOfBirth);

    // Create new student service
    const newStudentService = await prisma.user.create({
      data: {
        username,
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword: await saltAndHashPassword(password),
        role: "studentService",
        studentService: {
          create: {
            username,
            firstName,
            lastName,
            email,
            dateOfBirth: isoDate,
            address,
            phoneNumber,
            gender,
            role: "studentService",
            assignedCafeteria,
            studentServicePhoto: {
              create: {
                photoUrl,
                photoId,
              },
            },
          },
        },
      },
    });

    // Revalidate the student service list path
    revalidatePath("/list/student-services");

    return {
      success: true,
      data: newStudentService,
      message: "Student service created successfully",
    };
  } catch (error) {
    console.error("Error occurred while creating student service:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const deleteStudentService = async (username: string) => {
  console.log(username, "this is  username ");
  if (username === "" || !username)
    return { success: false, message: "username is required" };
  try {
    const existingStudentService = await prisma.studentService.findUnique({
      where: {
        username,
      },
      include: {
        studentServicePhoto: true,
      },
    });
    if (!existingStudentService) {
      return {
        success: false,
        message: "student service not found",
      };
    }
    const photo1Id = existingStudentService?.studentServicePhoto[0].photoId!;

    const isImg1Deleted = await deleteImage(photo1Id);

    if (!isImg1Deleted) {
      return {
        success: false,
        message: "something went wrong please try again",
      };
    }
    const studentService = await prisma.user.delete({
      where: {
        id: existingStudentService.userId as string,
      },
    });

    revalidatePath("/list/student-services");
    return {
      success: true,
      data: studentService,
      message: "student service deleted successfully",
    };
  } catch (error) {
    console.log("error occured while deleting student service", error);
    return {
      success: false,
      message: "something went wrong please try again",
      data: null,
    };
  }
};
/******  b86f39f2-e51d-4835-bb05-3c5f8a0f59b6  *******/
export const getAllStudentService = async (p: number, query: any) => {
  try {
    const [studentServices, total] = await prisma.$transaction([
      prisma.studentService.findMany({
        where: query,
        skip: (p - 1) * 10,
        take: 10,
        include: {
          studentServicePhoto: true,
        },
      }),

      prisma.studentService.count(),
    ]);

    if (!studentServices) {
      return {
        success: false,
        message: "cannot find student services",
        data: null,
      };
    }

    return {
      success: true,
      data: studentServices,
      total: total,
    };
  } catch (error) {
    console.log(error, "error occured while fetching student services data");
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
};
