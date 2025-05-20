import Announcements from "@/components/charts/announcement";
import AttendanceChart from "@/components/charts/Attendance-chart";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { Suspense } from "react";

const SingleUserPage = async () => {
  const userId = await auth().then((res) => res?.user?.id);
  let user = null;

  try {
    const res = await getUserById(userId as string);
    user = res?.data;
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-primary/20 rounded-full animate-spin"></div>
          </div>
        }
      >
        {/* LEFT SECTION */}
        <div className="w-full xl:w-2/3">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO */}
            <div className="bg-primary/10 py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  src={user.image || "/default-avatar.png"}
                  width={100}
                  height={100}
                  alt="User image"
                  className="w-36 h-36 rounded-full object-contain"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold capitalize">
                  {user.name || user.username}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/2 flex items-center gap-2">
                    <span className="font-medium">Role:</span>
                    <span>{user.role}</span>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center gap-2">
                    <span className="font-medium">Username:</span>
                    <span>{user.username}</span>
                  </div>
                  {user.studentId && (
                    <div className="w-full md:w-1/2 flex items-center gap-2">
                      <span className="font-medium">Student ID:</span>
                      <span>{user.studentId}</span>
                    </div>
                  )}
                  <div className="w-full md:w-1/2 flex items-center gap-2">
                    <span className="font-medium">Email Verified:</span>
                    <span>
                      {user.emailVerified
                        ? new Date(user.emailVerified).toLocaleDateString()
                        : "Not verified"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center gap-2">
                    <span className="font-medium">Last Seen:</span>
                    <span>
                      {user.lastSeen
                        ? new Date(user.lastSeen).toLocaleString()
                        : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              <div className="bg-white p-4 rounded-md w-full md:w-[48%] xl:w-[45%]">
                <h1 className="text-md font-semibold">Account Status</h1>
                <span className="text-sm text-gray-400 capitalize">
                  {user.status}
                </span>
              </div>
              <div className="bg-white p-4 rounded-md w-full md:w-[48%] xl:w-[45%]">
                <h1 className="text-md font-semibold">Created At</h1>
                <span className="text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-4 rounded-md w-full md:w-[48%] xl:w-[45%]">
                <h1 className="text-md font-semibold">Updated At</h1>
                <span className="text-sm text-gray-400">
                  {new Date(user.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM CHART SECTION */}
          <div className="mt-4 bg-white rounded-md p-4 h-[500px]">
            <h1 className="text-xl font-semibold mb-2">Users Activity</h1>
            {user.role === "student" && <AttendanceChart />}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <Announcements />
        </div>
      </Suspense>
    </div>
  );
};

export default SingleUserPage;
