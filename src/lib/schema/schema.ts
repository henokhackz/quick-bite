import { z } from "zod";

export const studentSchema = z.object({
  batch: z.string().min(1, { message: "Batch is required!" }),
  scholarishipStatus: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }).or(z.literal(""))
    .optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  department: z.string().min(1, { message: "Student Id is required!" }),
 dateOfBirth: z
  .union([
    z.string().min(2, { message: "Birthday is required" }),
    z.date(),
  ])
  .transform((value) =>
    value instanceof Date ? value.toISOString().split("T")[0] : value
  )
  .optional(),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  assignedCafeteria: z
    .string()
    .min(1, { message: "Cafteria Type is required!" }),
  photo1: z.string({ message: "image 1 is required" }).optional(),
  photo2: z.string({ message: "image 2 is required" }).optional(),
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
    .min(5, { message: "Password must be at least 5 characters long!" }).or(z.literal("")).optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone is required!" }),
  assignedCafeteria: z.string({ message: "Assigned Cafeteria is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  dateOfBirth: z
  .union([
    z.string().min(2, { message: "Birthday is required" }),
    z.date(),
  ])
  .transform((value) =>
    value instanceof Date ? value.toISOString().split("T")[0] : value
  )
  .optional(),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  role: z.enum(["student", "studentService", "ticketHolder"], {
    message: "role is required!",
  }),
  photo: z.string({ message: "Image is required!" }).optional(),
});

export type StudentServiceForm = z.infer<typeof studentServiceSchema>;

export const ticketHolderSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  dateOfBirth: z.string({ message: "Birthday is required!" }),
  assignedCafeteria: z.string({ message: "Assigned Cafeteria is required!" }),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  role: z.enum(["student", "studentService", "ticketHolder"], {
    message: "role is required!",
  }),
  photo: z.string({ message: "Image is required!" }),
});

export type TicketHolder = z.infer<typeof ticketHolderSchema>;

export const signInSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 32 characters long"),
});

export type GroupForm = z.infer<typeof groupSchema>;

export const groupSchema = z.object({
  name: z.string().min(1, { message: "Group name is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  isPrivate: z.boolean(),
});


export const feedbackSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100),
  message: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  roles: z
    .array(z.string())
    .min(1, "Please select at least one role."),
  photo: z.any().optional(),
});

