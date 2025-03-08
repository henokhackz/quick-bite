"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { SubmitButton } from "../ui/submit-button";
import { createGroup, getUsers } from "@/lib/actions/chat.action";
import { User } from "@prisma/client";
import { SelectableUserCard } from "./selectable-user-card";

interface GroupFormValues {
  name: string;
  description: string;
  isPrivate: boolean;
}

export default function GroupForm() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

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
    setIsLoading(sessionStatus === "loading");
  }, [sessionStatus, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { success, data } = await getUsers();
        if (success && data) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data: GroupFormValues) => {
    try {
      
      const { success, data: createdGroup } = await createGroup(
        data,
        session?.user?.id || "",
        selectedUsers
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto bg-white px-4 py-2 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-700">Create a Group</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Group Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name", { required: "Group name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isPrivate")} className="h-4 w-4" />
        <label className="text-sm text-gray-700">Private Group</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Group Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          {...register("description", { required: "Group description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <h2 className="text-lg font-semibold text-gray-700">Select Users</h2>
      <div className="p-4 bg-gray-50 rounded-lg overflow-y-auto max-h-60 flex flex-col space-y-2">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <SelectableUserCard
              key={user.id}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No users found</p>
        )}
      </div>

      <SubmitButton text="Create New Group" isLoading={isSubmitting} />
    </form>
  );
}
