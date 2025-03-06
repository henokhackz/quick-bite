"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { SubmitButton } from "../ui/submit-button";
import { createGroup } from "@/lib/actions/chat.action";

interface GroupFormValues {
  name: string;
  description: string;
  isPrivate: boolean;
}

export default function GroupForm() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(sessionStatus === "loading");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormValues>({
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
  });

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/sign-in");
    }
    setLoading(sessionStatus === "loading");
  }, [sessionStatus, router]);

  const onSubmit = async (data: GroupFormValues) => {
    try {
      console.log(data)
      const { success, data: createdGroup } = await createGroup(
        data,
        session?.user?.id || ""
      );
      if (!success) {
        toast.error("Failed to create group");
        return;
      }

      toast.success("Group created successfully!");
      router.push(`/list/chats/${createdGroup?.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Group Name */}
      <div>
        <label className="block text-sm font-medium">Group Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          {...register("name", { required: "Group name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Private Group Checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isPrivate")} />
        <label className="text-sm">Private Group</label>
      </div>

      {/* Group Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">Group Description</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          {...register("description", { required: "Group description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <SubmitButton text="Create New Group" isLoading={isSubmitting} />
    </form>
  );
}
