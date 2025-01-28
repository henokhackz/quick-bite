"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../Input-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ticketHolderSchema } from "@/lib/schema/schema";
import { createTicketHolder } from "@/lib/actions/admin.action";
import { convertToBase64 } from "@/lib/utils";
import Image from "next/image";
import { SubmitButton } from "../ui/submit-button";
type Inputs = z.infer<typeof ticketHolderSchema>;

const TicketHolderForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: Inputs;
  setOpen: (open: boolean) => void | undefined;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ticketHolderSchema),
    defaultValues: data,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<File | null>(null);

  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    try {
      setIsLoading(true);
      const result = await createTicketHolder({ data: formData });
      if (result?.success) {
        setIsLoading(false);
        setOpen(false);
        router.push("/list/ticket-holders");
        toast.success("ticker created successfully");
      } else {
        toast.error(result?.message || "Failed to create ticker.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while a  ticker.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Create a new ticket holder</h1>
      {}
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
          label="Assigned Cafeteria"
          name="assignedCafeteria"
          defaultValue={data?.assignedCafeteria}
          register={register}
          error={errors.assignedCafeteria}
        />
        <InputField
          label="Birthday"
          name="dateOfBirth"
          defaultValue={data?.dateOfBirth}
          register={register}
          error={errors.dateOfBirth}
          type="date"
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
      <SubmitButton text="create new ticket holder" isLoading={isLoading} />
    </form>
  );
};

export default TicketHolderForm;
