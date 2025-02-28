import { MoreVertical } from "lucide-react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:text-foreground even:text-dashboardForeground  odd:bg-primary/80 even:bg-cardBackground/80 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          
          2024/25
        </span>
        <MoreVertical size={20} className="text-gray-400" />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium">{type}s</h2>
    </div>
  );
};

export default UserCard;
