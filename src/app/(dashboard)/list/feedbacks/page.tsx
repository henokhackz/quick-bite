// app/(dashboard)/feedback/page.tsx

import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import SortModal from "@/components/sort-modal";
import { auth } from "@/lib/auth";
import { getFeedbacks } from "@/lib/actions/student.action";
import { Suspense } from "react";
import Link from "next/link";
import { View } from "lucide-react";

const FeedbackListPage = async () => {
  const session = await auth();
  const role = session?.user?.role || "";

  let feedbackData;
  try {
    feedbackData = await getFeedbacks();
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Failed to load feedbacks.</h1>
      </div>
    );
  }

  const { data: feedbacks, success, message, total } = feedbackData || {};

  if (!success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  const renderRow = (feedback: any) => (
    <tr
      key={feedback.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      <td className="p-4 font-medium">{feedback.title}</td>
      <td className="p-4">{feedback.message.slice(0, 20) + "..."}</td>
      <td className="p-4">{feedback.user?.username || "N/A"}</td>
      <td className="p-4">
        {feedback.photoUrl ? (
          <img
            src={feedback.photoUrl}
            alt="Feedback"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          "No photo"
        )}
      </td>
      <td className="p-4">{new Date(feedback.createdAt).toLocaleDateString()}</td>
      <td className="p-4">
        <Link href={`/list/feedbacks/${feedback.id}`} className="text-blue-500 hover:underline">
          <View className="w-4 h-4" />
        </Link>
      </td>
      {role !== "student" && (
        <td className="p-4">
          <FormModal table="feedback" type="delete" data={feedback} />
        </td>
      )}
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Feedbacks</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <SortModal />
            {role === "student" && (
              <FormModal table="feedback" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <Suspense fallback={<div>Loading feedbacks...</div>}>
        {feedbacks && feedbacks.length > 0 ? (
          <>
            <Table
              columns={[
                { header: "Title", accessor: "title" },
                { header: "Description", accessor: "description" },
                { header: "Student", accessor: "student" },
                { header: "Photo", accessor: "photo" },
                { header: "Date", accessor: "createdAt" },
                ...(role !== "student" ? [{ header: "Status", accessor: "status" }] : [ ]),
                ...(role !== "student" ? [{ header: "Actions", accessor: "actions" }] : [ ])
              ]}
              renderRow={renderRow}
              data={feedbacks}
            />
            <Pagination page={1} total={total || 0} />
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">No feedbacks found.</div>
        )}
      </Suspense>
    </div>
  );
};

export default FeedbackListPage;
