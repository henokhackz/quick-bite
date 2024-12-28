"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../Input-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { studentServiceSchema } from "@/lib/schema/schema";
import { createStudentService } from "@/lib/actions/admin.action";

type Inputs = z.infer<typeof studentServiceSchema>;

const TicketHolderForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
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
  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    const photoBase64 = await convertToBase64(formData.photo);
    const validData = {
      ...formData,
      photo: photoBase64,
    };
    setIsLoading(true);

    try {
      const result = await createStudentService({ data: validData });
      if (result?.success) {
        toast.success("Student service created successfully");
        router.push("/list/student-services");
      } else {
        toast.error(result?.message || "Failed to create student service.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Create a new student service</h1>
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
          label="Department"
          name="department"
          defaultValue={data?.department}
          register={register}
          error={errors.department}
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
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">{errors.sex.message}</p>
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
                const base64 = await convertToBase64(file);
                setValue("photo", base64);
              }
            }}
          />
          {errors.photo?.message && (
            <p className="text-xs text-red-400">{errors.photo.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary/80 text-white p-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TicketHolderForm;
