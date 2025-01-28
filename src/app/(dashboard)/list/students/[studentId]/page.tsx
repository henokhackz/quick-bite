import Announcements from "@/components//charts/announcement";
import FormModal from "@/components/FormModal";
import AttendanceChart from "@/components/charts/Attendance-chart";
import { getStudentDetailsById } from "@/lib/actions/admin.action";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { Suspense } from "react";

const SingleStudentPage = async ({
  params,
}: {
  params: { studentId: string };
}) => {
  let student = null;
  let username = null;
  const id = params.studentId;
  try {
    student = await getStudentDetailsById(id);
    username  = student.data?.username

  } catch (error) {
    console.log(error);
  }
  const session = await auth();
  const role = session?.user?.role!;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {!student && (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">Student not found</h1>
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
                  src={student?.data?.photos?.[0].photoUrl as string}
                  width={144}
                  height={144}
                  alt="student image"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold">
                  {student?.data?.firstName! + student?.data?.lastName!}
                </h1>
                <p className="text-sm text-gray-500">
                  {student?.data?.department}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <span>{student?.data?.healthStatus}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>{student?.data?.assignedCafeteria}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>{student?.data?.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>{student?.data?.phoneNumber}</span>
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

              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <div className="">
                  <h1 className="text-md font-semibold">Health Status</h1>
                  <span className="text-sm text-gray-400">
                    {student?.data?.healthStatus || "Good"}
                  </span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <div className="">
                  <h1 className="text-xl font-semibold">Scholariship</h1>
                  <span className="text-sm text-gray-400">
                    {student?.data?.scholarishipStatus || "none"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 h-[500px]">
            <h1>Student&apos;s Schedule</h1>

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
                  <FormModal table="student" type="delete" username={username} data={student?.data} />
                  <FormModal
                    table="student"
                    type="update"
                    data={student?.data}
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
