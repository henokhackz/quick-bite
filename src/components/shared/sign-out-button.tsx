"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Spinner from "../ui/spinner";

const SignOutButton = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="flex items-center gap-2"
      onClick={async () => {
        return (
          setLoading(true), await signOut(), setLoading(false), setOpen(false)
        );
      }}
    >
      <LogOut className="w-5 h-5 mr-2" />
      <span> {loading ? <Spinner /> : "Sign out"}</span>
    </button>
  );
};

export default SignOutButton;
