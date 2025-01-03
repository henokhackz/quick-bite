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
