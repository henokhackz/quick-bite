import { countUsersByRole } from "@/lib/actions/user.action";
import { MoreVertical } from "lucide-react";
import React from "react";
import clsx from "clsx";

// Define available roles, names, and colors
const roleColors: Record<string, string> = {
  student: "bg-blue-50 text-blue-600",
  admin: "bg-red-50 text-red-600",
  studentService: "bg-yellow-50 text-yellow-600",
  ticketHolder: "bg-purple-50 text-purple-600",
};

const roleNames: Record<string, string> = {
  student: "Students",
  admin: "Admins",
  studentService: "Student Services",
  ticketHolder: "Ticket Holders",
};

interface UserCardProps {
  type: string;
}

const UserCard = async ({ type }: UserCardProps) => {
  const { success, data } = await countUsersByRole();

  if (!success || !data) {
    return <div className="text-red-500">Error loading data</div>;
  }

  const count = data[type as keyof typeof data] ?? 0;
  const roleLabel = roleNames[type] ?? type;
  const badgeColor = roleColors[type] ?? "bg-gray-100 text-gray-600";

  return (
    <div
      className={clsx(
        "rounded-2xl p-6 min-w-[150px] flex-1 transition-all duration-300 border shadow-sm",
        "bg-gradient-to-br from-white via-white/90 to-white/60 dark:from-primary dark:to-chartSecondary",
        "hover:shadow-md hover:scale-[1.01]"
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className={clsx("text-[10px] px-2 py-1 rounded-full font-medium", badgeColor)}>
          2024/25
        </span>
        <MoreVertical
          size={18}
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition"
        />
      </div>

      {/* Stats */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {count}
        </h1>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">
          {roleLabel}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
