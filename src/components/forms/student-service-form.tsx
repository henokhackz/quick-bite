"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../Input-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { studentServiceSchema } from "@/lib/schema/schema";
import { createStudentService, updateStudentService } from "@/lib/actions/admin.action";
import { convertToBase64 } from "@/lib/utils";
import Image from "next/image";
import { SubmitButton } from "../ui/submit-button";
type Inputs = z.infer<typeof studentServiceSchema>;

const StudentServiceForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: (open: boolean) => void | undefined;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(studentServiceSchema),
    defaultValues: data,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<File | null>(null);

  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData, "form data");
    try {
      setIsLoading(true);
    switch(type){
      case "create":
        const result = await createStudentService({ data: formData });
      if (result?.success) {
        setIsLoading(false);
        setOpen(false);
        toast.success("student service created successfully");
        router.push("/list/student-services");
    }else {
        console.log(result.message, "result");
        toast.error("Failed to create student service .");
      }
      break;

      case "update":
        const updatedResult = await updateStudentService({ data: formData });
      if (updatedResult?.success) {
        setIsLoading(false);
        setOpen(false);
        toast.success("student service created successfully");
        router.push("/list/student-services");
    }else {
        console.log(updatedResult.message, "result");
        toast.error("Failed to create student service .");
      }
      break;
      default:
        break;
      
      } 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while a student service .");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(errors, "errors");
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{ type === "create" ? "Create Student Service" : "Update Student Service" }</h1>

      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          error={errors.phoneNumber}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Birthday"
          name="dateOfBirth"
          defaultValue={data?.dateOfBirth}
          register={register}
          error={errors.dateOfBirth}
          type="date"
        /> 
        <InputField
          label="Assigned Cafeteria"
          name="assignedCafeteria"
          defaultValue={data?.assignedCafeteria}
          register={register}
          error={errors.assignedCafeteria}
          type="text"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">{errors.gender.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Role</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("role")}
            defaultValue={data?.role}
          >
            <option value="studentService">student service</option>
            <option value="student">student</option>
            <option value="ticketHolder">ticket holder</option>
          </select>
          {errors.role?.message && (
            <p className="text-xs text-red-400">{errors.role.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label
            htmlFor="photo"
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          >
            <span>Upload Photo</span>
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhotoPreview(file);
                const base64 = await convertToBase64(file);
                setValue("photo", base64);
              }
            }}
          />
          {errors.photo?.message && (
            <p className="text-xs text-red-400">{errors.photo.message}</p>
          )}
          {photoPreview && (
            <Image
              src={photoPreview ? URL.createObjectURL(photoPreview) : ""}
              alt="student service preview"
              width={100}
              height={100}
              className="rounded-2xl h-50 w-50 object-cover"
            />
          )}
        </div>
      </div>
      <SubmitButton text={type === "create" ? "Create new student service " : "Update student service"} isLoading={isLoading} />
    </form>
  );
};

export default StudentServiceForm;
