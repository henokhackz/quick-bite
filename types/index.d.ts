import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { Gender } from "@prisma/client";

export type Student = {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  clerkId: string;

  role: "student";
  photo1?: string;
  photo2?: string;
  qrcode: {};
  isBlacklisted: boolean;
  scholarshipStatus: "none" | "scholarship";
  healthStatus: "none" | "special";
  department: string;
  batch: string;
  assignedCafeteria: string;
  attendance: {
    meal: "Breakfast" | "Lunch" | "Dinner";
    date: string;
    attended: boolean;
  }[];
  studentServices?: {
    isMember: boolean;
    position: string;
    discription: string;
  };
};

/******  1b15deec-20dd-4356-aa5d-e81e6763eb7d  *******/

export type Feedback = {
  id: string;
  title: string;
  description: string;
  studentId: string;
  status: "resolved" | "pending" | "inProgress";
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
  priority: "low" | "medium" | "high";
  category: string;
  isPublic: boolean;
  comments?: Array<{
    userId: string;
    text: string;
    createdAt: Date;
  }>;
};

export type Attendance = {
  studentId: string;
  studentName: string;
  studentPicture: string;
  cafeteria: string;
  mealType: "Breakfast" | "Lunch" | "Dinner";
  timestamp: Date;
  attended: boolean;
  mealCost?: number;
  checkInMethod?: "Facial Recognition" | "QR Code";
  remarks?: string;
};

export type StudentForm = {
  batch: string;
  scholariship?: string;
  studentId: string;
  email: string;
  password: string;
  assignedCafeteria: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  department: string;
  birthday: string;
  sex: "male" | "female";
  img1: string;
  img2: string;
};

export type StudentService = {
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  birthday: DateTime;
  gender: Gender;
  photo?: string;
  address?: string;
  department?: string;
  email?: string;
  username: string;
};
export type StudentServiceForm = {
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  email?: string;
  birthday: DateTime;
  sex: Gender;
  photo?: string;
  address?: string;
  department?: string;
  username: string;
  password: string;
};
export type TicketHolderForm = {
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  email?: string;
  birthday: DateTime;
  sex: Gender;
  photo?: string;
  address?: string;
  department?: string;
  username: string;
  password: string;
  assignedCafeteria: string;
};
export type TicketHolder = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string | null;
  email?: string;
  birthday: DateTime;
  sex: Gender;
  photo?: string | null;
  address?: string | null;
  department?: string;
  username: string;
  password?: string;
  assignedCafeteria: string;
};

// Declare module to extend the default NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    };
  }

  interface User {
    role: string;
  }
}
