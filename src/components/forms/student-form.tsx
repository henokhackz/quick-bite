"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../Input-field";
import { studentSchema } from "@/lib/schema/schema";
import { createStudent } from "@/lib/actions/admin.action";
import { toast } from "react-toastify";

type Inputs = z.infer<typeof studentSchema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<Inputs>;
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

  const [img1Preview, setImg1Preview] = useState<File | null>(null);
  const [img2Preview, setImg2Preview] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    try {
      setIsLoading(true);
      const result = await createStudent({ data: formData });
      if (!result.success && result.message) {
        setError(result.message);
      }
      if (result.success) {
        toast.success("Student created successfully");
        router.push("/list/students");
      }
      console.log(result, "result");
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error from form tyring to submit");
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
          label="Student ID"
          name="studentId"
          register={register}
          error={errors.studentId}
        />{" "}
        <InputField
          label="password"
          name="password"
          register={register}
          error={errors.password}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors.email}
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
          name="birthday"
          register={register}
          error={errors.birthday}
        />
        <InputField
          label="Scholariship"
          name="scholariship"
          register={register}
          error={errors.scholariship}
        />
        <InputField
          label="Department"
          name="department"
          register={register}
          error={errors.department}
        />
        <InputField
          label="Phone Number"
          name="phone"
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Assagned Cafteria"
          name="assignedCafeteria"
          register={register}
          error={errors.assignedCafeteria}
        />
        {/* File Input for Image 1 */}
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
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label
            htmlFor="img1"
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          >
            <Image src="/upload.png" alt="Upload" width={28} height={28} />
            {img1Preview && (
              <Image
                src={URL.createObjectURL(img1Preview)}
                alt="student image"
                width={100}
                height={100}
                className="rounded-2xl h-50 w-50 object-fit"
              />
            )}
          </label>
          <input
            type="file"
            id="img1"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("img1", await convertToBase64(file));

                setImg1Preview(file);
              }
            }}
          />
          {errors.img1?.message && (
            <p className="text-xs text-red-400">{errors.img1.message}</p>
          )}
        </div>
        {/* File Input for Image 2 */}
        <div className="flex  gap-4 w-full md:w-1/4 ">
          <label
            htmlFor="img2"
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          >
            <Image src="/upload.png" alt="Upload" width={28} height={28} />
          </label>
          {img2Preview && (
            <Image
              src={URL.createObjectURL(img2Preview)}
              alt="student image"
              width={100}
              height={100}
              className="rounded-2xl h-50 w-50 object-fit"
            />
          )}
          <input
            type="file"
            id="img2"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("img2", await convertToBase64(file));
                setImg2Preview(file);
              }
            }}
          />
          {errors.img2?.message && (
            <p className="text-xs text-red-400">{errors.img2.message}</p>
          )}
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`py-2 px-4 bg-primary hover:bg-primary/80 transition-colors duration-300 rounded-md bg-lamaSky text-xs font-semibold text-white ${
          isLoading && "opacity-50 cursor-not-allowed   "
        }`}
      >
        {isLoading ? "Loading..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
