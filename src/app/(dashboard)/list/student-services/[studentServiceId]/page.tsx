import Announcements from "@/components//charts/announcement";
import FormModal from "@/components/FormModal";
import AttendanceChart from "@/components/charts/Attendance-chart";
import {getStudentServiceDetailsById } from "@/lib/actions/admin.action";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { Suspense } from "react";

const SingleStudentPage = async ({
  params,
}: {
  params: { studentServiceId: string };
}) => {
  let studentService = null;
  const id = params.studentServiceId;
  console.log(id, "this is id");
  try {
    studentService = await getStudentServiceDetailsById(id);
    console.log(studentService.message, "studentService.message");
  } catch (error) {
    console.log(error);
  }
  const session = await auth();
  const role = session?.user?.role!;
console.log(studentService, "studentService");
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {!studentService && (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">Student Service not found</h1>
        </div>
      )}
      {/* LEFT */}
      <Suspense
        fallback={
          <div className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-primary/20 rounded-full animate-spin"></div>
            </div>
          </div>
        }
      >
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD */}
            <div className="bg-primary/10 py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  src={studentService?.data?.studentServicePhoto[0].photoUrl as string}
                  width={144}
                  height={144}
                  alt="student image"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold">
                  {studentService?.data?.firstName! + studentService?.data?.lastName!}
                </h1>
               
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <span>{studentService?.data?.gender}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>{studentService?.data?.phoneNumber}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>{studentService?.data?.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>{studentService?.data?.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <div className="">
                  <h1 className="text-xl font-semibold">Attendance</h1>
                  <span className="text-sm text-gray-400">60%</span>
                </div>
              </div>

              
              
            </div>
          </div>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 h-[500px]">

            <AttendanceChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Actions</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
              {role === "admin" && (
                <>
                  <FormModal table="student" type="delete" username={studentService?.data?.username} data={studentService?.data} />
                  <FormModal
                    table="student"
                    type="update"
                    data={studentService?.data}
                  />
                </>
              )}
            </div>
          </div>
          <Announcements />
        </div>
      </Suspense>
    </div>
  );
};

export default SingleStudentPage;
