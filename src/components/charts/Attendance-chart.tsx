"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Monday",
    present: 4000,
    absent: 2400,
  },
  {
    name: "Tuesday",
    present: 3000,
    absent: 1398,
  },
  {
    name: "Wednesday",
    present: 2000,
    absent: 9800,
  },
  {
    name: "Thursday",
    present: 2780,
    absent: 3908,
  },
  {
    name: "Friday",
    present: 1890,
    absent: 4800,
  },
  {
    name: "Saturday",
    present: 2390,
    absent: 3800,
  },
  {
    name: "Sunday",
    present: 3490,
    absent: 4300,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Weekly Attendance Report</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="present"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="absent" stroke="#CFCEFF" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

