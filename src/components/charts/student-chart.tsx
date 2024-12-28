"use client";
import { User, Users } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Special",
    count: 106,
    fill: "white",
  },
  {
    name: "Scholars",
    count: 106,
    fill: "white",
  },
  {
    name: "Normal",
    count: 53,
    fill: "#4361ee",
  },
  {
    name: "Fasters",
    count: 53,
    fill: "#4cc9f0",
  },
];

const StudentChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Users
          size={50}
          className="absolute text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16 text-cardForeground/80">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-primary/50 rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300 flex items-center">
            <User size={12} className="mr-1" />
            Special (55%)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-primaryLight/50 rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300 flex items-center">
            <User size={12} className="mr-1" />
            Scholars (45%)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-primary/50 rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300 flex items-center">
            <User size={12} className="mr-1" />
            Normal (45%)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-primaryLight/50 rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300 flex items-center">
            <User size={12} className="mr-1" />
            Fasters (45%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StudentChart;
