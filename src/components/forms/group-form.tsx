"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitButton } from "../ui/submit-button";

export default function GroupForm() {
  const [groupName, setGroupName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/groups/create", {
        method: "POST",
        body: JSON.stringify({ name: groupName, isPrivate }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to create group");

      toast.success("Group created successfully!");
      router.push("/groups");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Group Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label className="text-sm">Private Group</label>
      </div>

      <SubmitButton text="create new group" isLoading={loading}/>
    </form>
  );
}
