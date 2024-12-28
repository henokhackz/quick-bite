import { z } from "zod";

export const studentSchema = z.object({
  batch: z.string().min(1, { message: "Batch is required!" }),
  scholariship: z.string().optional(),
  studentId: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  department: z.string().min(1, { message: "Student Id is required!" }),
  birthday: z.string().min(2, { message: "birthday is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  assignedCafeteria: z
    .string()
    .min(1, { message: "Cafteria Type is required!" }),
  img1: z.instanceof(File, { message: "image 1 is required" }),
  img2: z.instanceof(File, { message: "image 1 is required" }),
});

export type studentFormSchema = z.infer<typeof studentSchema>;

export const studentServiceSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  department: z.string().min(1, { message: "Last name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  photo: z.string({ message: "Image is required!" }),
});

export type StudentService = z.infer<typeof studentServiceSchema>;
