"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../Input-field";
import { studentSchema } from "@/lib/schema/schema";
import { createStudent, updateStudent } from "@/lib/actions/admin.action";
import { toast } from "react-toastify";
import { SubmitButton } from "../ui/submit-button";
import ImageUpload from "../image-upload";
import { Student } from "types";

type Inputs = z.infer<typeof studentSchema>;

const StudentForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: Partial<Student>;
  setOpen: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(studentSchema),
    defaultValues: data,
  });

  const [photo1Preview, setPhoto1Preview] = useState<File | null | string>(
   data?.photos!=undefined ? data?.photos[0].photoUrl : null
  );
  const [photo2Preview, setPhoto2Preview] = useState<File | null | string>(
    //@ts-expect-error 
   data?.photos?.[1]?.photoUrl || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData, "form data");
    try {
      setIsLoading(true);
      if (type === "update") {
        const result = await updateStudent({ data: formData });
        if (!result.success && result.message) {
          setError(result.message);
          toast.error(result.message);
          setIsLoading(false);
        }
        if (result.success) {
          toast.success("Student updated successfully");
          setIsLoading(false);
          setOpen(false);
          router.push("/list/students");
        }
      }

      if (type === "create") {
        const result: any = await createStudent({ data: formData });
        if (!result.success && result.message) {
          setError(result.message);
          toast.error(result.message);
          setIsLoading(false);
        }
        if (result.success) {
          toast.success("Student created successfully");
          setOpen(false);
          setIsLoading(false);
          router.push("/list/students");
        }
      }
    } catch (error) {
      console.log(error, "error from form tyring to submit");
      setIsLoading(false);
      setError("something went wrong please try again");
    }
  };

  return (
    <form
      className="flex flex-col gap-8 py-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a New Student" : "Update Student"}
      </h1>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex flex-wrap gap-12">
        <div className="w-full">
          <span className="text-xs text-gray-400 font-medium">
            Authentication Information
          </span>
        </div>
        <InputField
          label="username(Student Id)"
          name="username"
          register={register}
          error={errors.username}
        />{" "}
        <InputField
          label="password"
          placeHolder="Enter new password (leave blank to keep current)"
          name="password"
          
          register={register}
          error={errors.password}
          
        />
        <div className="w-full">
          {}
          <span className="text-xs text-gray-400 font-medium">
            Personal Information
          </span>
        </div>
        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="address"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputField
          label="batch"
          name="batch"
          register={register}
          error={errors.batch}
        />
        <InputField
          label="Birth Day"
          type="date"
          name="dateOfBirth"
          register={register}
          error={errors.dateOfBirth}
        />
        <InputField
          label="Scholariship"
          name="scholarishipStatus"
          register={register}
          error={errors.scholarishipStatus}
        />
        <InputField
          label="Department"
          name="department"
          register={register}
          error={errors.department}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
        />
        <InputField
          label="Assagned Cafteria"
          name="assignedCafeteria"
          register={register}
          error={errors.assignedCafeteria}
        />
        {/* File Input for Image 1 */}
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
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <div className="flex  gap-2 w-full ">
          <ImageUpload
            errors={errors}
            setValue={setValue}
            photoPreview={photo1Preview}
            setPhotoPreview={setPhoto1Preview}
            type="photo1"
          />
          <ImageUpload
            errors={errors}
            setValue={setValue}
            photoPreview={photo2Preview}
            setPhotoPreview={setPhoto2Preview}
            type="photo2"
          />
        </div>
      </div>
      <SubmitButton
        text={type === "create" ? "Create a student" : "Update a student"}
        isLoading={isLoading}
      />
    </form>
  );
};

export default StudentForm;
