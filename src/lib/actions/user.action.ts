import { getUsers } from '@/lib/actions/chat.action';
"use server";

import prisma from "../prisma";
export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return { success: false, data: null };
    }
    const { hashedPassword, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};


export const countUsersByRole = async () => {
  try {
    const studentCount = await prisma.user.count({
      where: { role: "student" }
    });
    const ticketHolderCount = await prisma.user.count({
      where: { role: "ticketHolder" }
    });
    const adminCount = await prisma.user.count({
      where: { role: "admin" }
    });
    const studentServiceCount = await prisma.user.count({
      where: { role: "studentService" }
    });
    return {
      success: true,
      data: {
        student: studentCount,
        ticketHolder: ticketHolderCount,
        admin: adminCount,
        studentService: studentServiceCount,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};