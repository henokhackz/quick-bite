"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import {
  createAttendance,
  getLatestTenAttendance,
} from "@/lib/actions/attendance.action";
import { useDebounceCallback } from "usehooks-ts";

interface DetectedStudent {
  firstName: string;
  lastName: string;
  photo1: string;
  studentId: string;
  id: string;
  photos: { photoUrl: string; photoId: string, studentId: string }[]
}

interface CheckedInStudent {
  studentName: string;
  studentPicture: string;
  cafeteria: string;
  mealType: string;
  timestamp: Date;
}

interface LatestTenAttendance {
  success: boolean;
  data?: CheckedInStudent[] | undefined;
  message?: string | undefined;
}

const CafteriaAccessTrackerTable = ({
  detectedStudent,setError
}: {
  detectedStudent: DetectedStudent, setError:(message: string) => void
}) => {
  const [checkedInStudent, setCheckedInStudent] =
    useState<CheckedInStudent | null>(null);
  const [lastetTenAttendance, setLastetTenAttendance] =
    useState<LatestTenAttendance | null>(null);
  const [checkInResult, setCheckInResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isCheckInLoading, setIsCheckInLoading] = useState(false);

  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

  console.log(isAttendanceLoading, isCheckInLoading, 'detected student')

  const checkInStudent = useCallback(async () => {
    if (!detectedStudent) return;

    try {
      setCheckInResult(null);
      setIsCheckInLoading(true);

      const result = await createAttendance(detectedStudent as DetectedStudent);
      setCheckInResult(result);
      setError(result.message)

      if (result.success && result.data) {
        setCheckedInStudent(result.data);
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      setCheckInResult({ success: false, message: "An error occurred." });
    } finally {
      setIsCheckInLoading(false);
    }
  }, [detectedStudent]);
  const debounce = useDebounceCallback(checkInStudent, 500);

  useEffect(() => {
    debounce();
  }, [detectedStudent, checkInStudent, checkInResult]);

  useEffect(() => {
    const fetchLatestTenAttendance = async () => {
      try {
        setIsAttendanceLoading(true);
        const result = await getLatestTenAttendance();
        if (result) {
          setLastetTenAttendance(result);
        }
      } catch (error) {
        console.error("Error fetching latest ten attendance:", error);
      } finally {
        setIsAttendanceLoading(false);
      }
    };
    fetchLatestTenAttendance();
  }, []);


  // Loader for latest attendance
  const AttendanceLoader = () => (
    <div className="flex justify-center items-center mt-4 w-full">
      <div className="w-6 h-6 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-lg mt-4 flex items-center justify-center flex-col">
      {/* Check-in result or error */}
      {checkInResult && (
        <>
          <div
            className={`w-full overflow-hidden rounded-lg mt-4 mb-4 ${
              checkInResult.success ? "text-green-400" : "text-red-400"
            }`}
          >
            
            <audio
              src={checkInResult.success ? "/success.mp3" : "/error.mp3 "}
              autoPlay
            />
          </div>
        </>
      )}

      {/* Table */}
      <table className="w-full rounded-md bg-cardBackground text-cardForeground  shodow-md">
        <thead className="bg-primary-500 text-cardForeground">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Student</th>
            <th className="px-6 py-3 text-left font-semibold">Meal</th>
            <th className="px-6 py-3 text-left font-semibold">Time</th>
            <th className="px-6 py-3 text-left font-semibold">Present</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {/* Check-in loader */}

          {/* Latest attendance loader */}
          {isAttendanceLoading && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                <AttendanceLoader />
              </td>
            </tr>
          )}

          {/* Current checked-in student */}
          {checkedInStudent && (
            <tr className="odd:bg-primary/10 even:bg-primaryLight/10 hover:bg-primary/20 transition duration-300">
              <td className="flex items-center gap-2 px-6 py-4">
                <Image
                  src={checkedInStudent.studentPicture || "/default-avatar.jpg"}
                  height={40}
                  width={40}
                  alt="student"
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <p className="text-gray-700">{checkedInStudent.studentName}</p>
              </td>
              <td className="px-6 py-4">{checkedInStudent.mealType}</td>
              <td className="px-6 py-4">
                {new Date(checkedInStudent.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-green-500 font-semibold text-sm">
                  <Check />
                </span>
              </td>
            </tr>
          )}

          {/* Latest 10 Attendance */}
          {lastetTenAttendance?.data?.map((student, index) => (
            <tr
              key={index}
              className="odd:bg-primary/10 even:bg-primaryLight/10 hover:bg-primary/20 transition duration-300"
            >
              <td className="flex items-center gap-2 px-6 py-4">
                <Image
                  src={student.studentPicture || "/default-avatar.jpg"}
                  height={40}
                  width={40}
                  alt="student"
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <p className="text-gray-700">{student.studentName}</p>
              </td>
              <td className="px-6 py-4">{student.mealType}</td>
              <td className="px-6 py-4">
                {new Date(student.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-green-500 font-semibold text-sm">
                  <Check />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CafteriaAccessTrackerTable;
