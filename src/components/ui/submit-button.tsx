"use client";

import React from "react";
import Spinner from "./spinner";

interface SubmitButtonProps {
  text: string; // Text to display when not loading
  isLoading: boolean; // Loading state
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isLoading,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${
        isLoading
          ? "bg-primary/80 cursor-not-allowed"
          : "bg-primary hover:bg-primary/80  ease-in-out "
      }`}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
};
