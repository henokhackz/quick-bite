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

export type TicketHolder = {
  id: string;
  name: string;
  photo: string;
  assignedCafteria: string;
  address: string;
  phoneNumber: string;
  role: "TicketHolder";
};

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
  firstName: String;
  lastName: String;
  role: Role;
  phoneNumber?: String;
  dateOfBirth: DateTime;
  gender: Gender;
  photo?: String;
  address?: String;
  department?: String;
  email?: string;
  username: string;
};
export type StudentServiceForm = {
  firstName: String;
  lastName: String;
  role: Role;
  phoneNumber?: String;
  dateOfBirth: DateTime;
  sex: Gender;
  photo?: String;
  address?: String;
  department?: String;
  username: string;
  password: string;
};
