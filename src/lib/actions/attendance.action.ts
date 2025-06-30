"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { LastTimeCheckIn } from "../utils";



export const createAttendance = async (studentId:string) => {
  
  if (!studentId) {
    return {
      success: false,
      message: "Invalid student data. Please provide all required fields.",
    };
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId }, 
      select: {
        firstName: true,
        lastName: true,
        photos: {
          select: {
            photoUrl: true,
            photoId: true,
            studentId: true,
          },
        },
      },
    })
  
    if (!student) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    const { firstName, lastName, photos } = student;

    const photo1 = photos?.[0]?.photoUrl || "";
    if (!photo1) {
      return {
        success: false,
        message: "Student does not have a valid photo for attendance.",
      };
    }

    const cafeteria = "Cafeteria 1"; 
    const mealType = "Breakfast"; 

    // Check if the student has already checked in recently
    const existingAttendance = await prisma.attendance.findFirst({
      where: { studentId: studentId },
      orderBy: { timestamp: "desc" },
      select: { timestamp: true },
    });

    if (existingAttendance) {
      const isValid = LastTimeCheckIn(existingAttendance.timestamp.toString());
      console.log(`LastTimeCheckIn result: ${isValid}`);
      if (!isValid) {
        return {
          success: false,
          message:
            "🥳 You’ve already checked in recently. Please wait before trying again! 🍽️",
        };
      }
    }

  
    const result = await prisma.attendance.create({
      data: {
        studentId: studentId,
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
        "Welcome to the cafeteria! Your attendance has been successfully recorded. 🧠🍕",
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
      take: 10, // Fetch latest 10 records
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



export const TakeAttendanceByQRCode = async (username:string) => {
  console.log("TakeAttendanceByQRCode called with username:", username);
  
  if (!username) {
    return {
      success: false,
      message: "Invalid QR code data. Please provide all required Data.",
    };
  }

  try {
    const student = await prisma.student.findUnique({
      where: { username: username }, 
      select: {
        id: true,
        firstName: true,
        lastName: true,
        photos: {
          select: {
            photoUrl: true,
            photoId: true,
            studentId: true,
          },
        },
      },
    })
  
    if (!student) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    const { firstName, lastName, photos } = student;

    const photo1 = photos?.[0]?.photoUrl || "";
    if (!photo1) {
      return {
        success: false,
        message: "Student does not have a valid photo for attendance.",
      };
    }

    const cafeteria = "Cafeteria 1"; 
    const mealType = "Breakfast"; 

    // Check if the student has already checked in recently
    const existingAttendance = await prisma.attendance.findFirst({
      where: { studentId: student.id },
      orderBy: { timestamp: "desc" },
      select: { timestamp: true },
    });

    if (existingAttendance) {
      const isValid = LastTimeCheckIn(existingAttendance.timestamp.toString());
      console.log(`LastTimeCheckIn result: ${isValid}`);
      if (!isValid) {
        return {
          success: false,
          message:
            "🥳 You’ve already checked in recently. Please wait before trying again! 🍽️",
        };
      }
    }

  
    const result = await prisma.attendance.create({
      data: {
        studentId: student.id,
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
        "Welcome to the cafeteria! Your attendance has been successfully recorded. 🧠🍕",
    };
  } catch (error) {
    console.error("Error in createAttendance:", error);
    return {
      success: false,
      message: "An error occurred while processing the attendance.",
    };
  }
};