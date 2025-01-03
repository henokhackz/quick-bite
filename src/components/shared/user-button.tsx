"use client";

import React, { useState } from "react";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./sign-out-button";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative p-5">
      {/* Button to open the modal */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200/50 hover:bg-gray-300/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
        aria-label="Open user menu"
      >
        <img
          src="/profile.png"
          className="w-6 h-6 rounded-full"
          alt="Profile Icon"
        />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="p-2 space-y-2 text-gray-700">
            <li
              className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Link href={"/profile"} className="flex gap-2">
                <User className="w-5 h-5 mr-2" />
                <span>Profile</span>
              </Link>
            </li>
            <li
              className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Link href="/settings" className="flex gap-2">
                <Settings className="w-5 h-5 mr-2" />
                <span>Settings</span>
              </Link>
            </li>
            <li className="flex items-center p-2 rounded-md text-red-500 hover:bg-red-100 cursor-pointer">
              <SignOutButton setOpen={setOpen} />
            </li>
          </ul>
        </div>
      )}

      {/* Click outside to close modal */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-white bg-opacity-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default UserButton;
