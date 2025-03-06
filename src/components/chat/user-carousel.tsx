"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChatRoomUser, User } from "@prisma/client";

type UserCarouselProps = {
  users: (ChatRoomUser & { user: User })[];
};

const UserCarousel = ({ users }: UserCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const nextSlide = () => {
    if (startIndex + visibleCount < users.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center mx-auto w-full overflow-hidden bg-gray-50 rounded-lg">
      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={startIndex === 0}
        className="absolute left-2 z-10 p-2 bg-white shadow-md rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {/* User List */}
      <div className="relative w-full flex items-center justify-center overflow-hidden py-2">
        <motion.div
          className="flex gap-4 items-center px-6"
          animate={{ x: `-${startIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center min-w-[80px] space-y-1  p-2 rounded-full justify-center cursor-pointer">
              <Image
                src={user?.user?.image || "/avatar.png"}
                alt={user.user?.name || "User"}
                height={40}
                width={40}
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <p className="text-[11px] font-medium text-gray-700 truncate w-[70px] text-center">{user?.user?.name}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={startIndex + visibleCount >= users.length}
        className="absolute right-2 z-10 p-2 bg-white shadow-md rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default UserCarousel;
