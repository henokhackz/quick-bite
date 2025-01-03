"use client";

import { TypeAnimation } from "react-type-animation";

export const TextTypeAnimation = () => {
  return (
    <div className="relative bg-gradient-to-br from-white via-white to-gray-200 h-screen flex flex-col items-center justify-center">
      {/* Static Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight text-center px-4 mb-8">
        Welcome to Arbaminch University
      </h1>

      {/* Animated Text */}
      <TypeAnimation
        sequence={[
          "Student Management System",
          2000,
          "Dorm Management System",
          2000,
          "Cafe Management System",
          2000,
          "Community Engagement",
          2000,
        ]}
        wrapper="h2"
        speed={60}
        repeat={Infinity}
        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800/80 tracking-tight text-center px-4"
      />

      {/* Subtle Animated Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-primaryDark rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-primary rounded-full blur-[100px] opacity-30 animate-spin-slow"></div>
        <div className="absolute top-10 right-1/5 w-32 h-32 md:w-40 md:h-40 bg-primaryDark rounded-full blur-xl opacity-15 animate-bounce"></div>
      </div>
    </div>
  );
};
