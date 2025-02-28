"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { ErrorMessage } from "../ui/error-message";
import { SubmitButton } from "../ui/submit-button";


const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Sign in the user
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false, 
      });
       
      console.log(res, 'this is response from sign page')
      if (res?.error || !res?.ok) {
        setError("Invalid username or password");
        return;
      }

     
      const session = await getSession();

      // Handle role-based redirection
      if (session?.user ) {
        const role = session.user.role;
        if (role) {
          router.push(`/${role.toLowerCase()}`);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full items-center justify-center bg-cardBackground text-cardForeground p-12 rounded-md flex flex-col gap-4">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className='flex flex-col gap-2 w-full justify-center items-center'>
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="object-cover"
            />
          <h1 className="text-xl font-bold flex items-center gap-2">
            Cafe and dorm Management System
          </h1>

          </div>
          <h2 className="text-gray-400">Sign in to your account</h2>
          {error && <ErrorMessage message={error} />}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs text-gray-500">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={`p-2 rounded-md ring-1 ring-gray-300 ${
                errors.username ? "ring-red-400" : ""
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`p-2 rounded-md ring-1 ring-gray-300 ${
                errors.password ? "ring-red-400" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>
          <SubmitButton isLoading={loading} text="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
