import React from "react";
import SearchBar from "./search-bar";
import UserButton from "./shared/user-button";
import { Megaphone, MessageCircleMore } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-50/20 py-2  px-6 flex items-center justify-between shadow-md top-0 left-0 right-0 sticky backdrop-blur-2xl z-50 border-b-indigo-700">
      <SearchBar />
      <div className="flex items-center  space-x-6 w-full justify-end">
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
  <MessageCircleMore size={20} className="text-gray-800/80" />
  <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md font-medium">
    34
  </span>
</div>

        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
  <Megaphone size={20} className="text-gray-800/80" />
  <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md font-medium">
    34
  </span>
</div>


        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
