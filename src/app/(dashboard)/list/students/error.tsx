"use client";
import React from "react";

const StudentPageError = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h3 className="text-red-400 text-sm font-semibold">{error.message}</h3>
    </div>
  );
};

export default StudentPageError;
