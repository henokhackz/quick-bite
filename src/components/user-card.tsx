import { MoreVertical } from "lucide-react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/80 to-white/60  backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex-1 min-w-[150px] border border-white/20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
          2024/25
        </span>
        <MoreVertical size={20} className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
      </div>

      {/* Stats */}
      <h1 className="text-3xl font-bold my-4 even:text-primary/80">34</h1>
      <h2 className="capitalize text-sm font-medium text-gray-600/80">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;
