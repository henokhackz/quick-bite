import React from "react";
import SearchBar from "./search-bar";
import Image from "next/image";
import { UserButton, UserProfile } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="w-full bg-background/50 py-3 px-6 flex items-center justify-between shadow-md top-0 left-0 right-0 sticky backdrop-blur-2xl z-50">
      <SearchBar />
      <div className="flex items-center  space-x-6 w-full justify-end">
        <div className="relative cursor-pointer">
          <Image
            src="/message.png"
            alt="Feedback Icon"
            width={20}
            height={20}
          />
          <span className="absolute -top-3 -right-3 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
            34
          </span>
        </div>
        <div className="relative cursor-pointer">
          <Image
            src="/announcement.png"
            alt="Announcement Icon"
            width={20}
            height={20}
          />
          <span className="absolute -top-3 -right-3 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
            34
          </span>
        </div>
        <UserButton
          appearance={{
            elements: {
              footer: {
                display: "none",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
