import AttendanceChart from "@/components/charts/Attendance-chart";
import Announcements from "@/components/charts/announcement";
import Update from "@/components/charts/updated";

import React from "react";

const Student = () => {
  return (
    <div className="flex flex-col  p-4 gap-4 w-full justify-between">
      {/* left side  */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-auto">
        <div className="w-full col-span-2 flex flex-col gap-4 p-2 h-[80vh]  ">
          <AttendanceChart />   
        </div>

        <div className="flex flex-col gap-4">
          <Update />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default Student;
