"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChatRoomUser, User } from "@prisma/client";

type  UserCarouselProps = {
 users: (ChatRoomUser & { user: User })[]
}

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
    <div className="relative flex items-center w-full max-w-lg mx-auto overflow-hidden">
      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={startIndex === 0}
        className="absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full disabled:opacity-50"
      >
        <ChevronLeft size={24} />
      </button>

      {/* User List */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${startIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center min-w-[80px]">
              <Image
                src={user?.user?.image || "/avatar.png"}
                alt={user.user?.name || "User"}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
              <p className="text-xs mt-1 text-center truncate w-[60px]">{user?.user?.name}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={startIndex + visibleCount >= users.length}
        className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full disabled:opacity-50"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default UserCarousel;
