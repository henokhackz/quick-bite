import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllStudentService } from "@/lib/actions/admin.action";
import StudentListLoadingPage from "./loading";
import { columns } from "@/lib/constants";
import { auth } from "@/lib/auth";
import SortModal from "@/components/sort-modal";
import { Prisma } from "@prisma/client";
import { StudentService } from "types";

interface SearchParams {
  [key: string]: string | undefined;
}

const StudentServicePage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // Extract page and other query parameters
  const { page, ...queryParams } = searchParams;

  // Prepare Prisma query filters
  const query: Prisma.StudentServiceWhereInput = {};
  for (const [key, value] of Object.entries(queryParams)) {
    if (value) {
      switch (key) {
        case "search":
          query.firstName = { contains: value, mode: "insensitive" };
          break;
        default:
          break;
      }
    }
  }

  // Authenticate user
  const session = await auth();
  const role = session?.user?.role || "";

  // Parse page number (default to 1 if undefined)
  const currentPage = page ? Number(page) : 1;

  // Fetch student data
  let studentServicesData;

  try {
    studentServicesData = await getAllStudentService(currentPage, query);
  } catch (error) {
    console.error("Error fetching student services:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Failed to load student services.
        </h1>
      </div>
    );
  }

  const {
    data: studentServices,
    success,
    message,
    total,
  } = studentServicesData || {};

  // Handle error in fetching students
  if (!success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  // Render student table rows
  const renderRow = (studentService: Partial<StudentService>) => (
    <tr
      key={studentService.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      {/* Student Information */}
      <td className="flex items-center gap-4 p-4">
        {studentService.studentServicePhoto?.[0]?.photoUrl && (
          <Image
            src={studentService.studentServicePhoto[0].photoUrl}
            alt="Student"
            width={40}
            height={40}
            className="hidden md:block w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {`${studentService.firstName?.toUpperCase()} ${studentService.lastName?.toUpperCase()}`}
          </h3>
          <p className="text-xs text-gray-500">
            {studentService.username?.toLowerCase()}
          </p>
        </div>
      </td>
      {/* Additional Columns */}
      <td className="hidden md:table-cell">{studentService.username}</td>
      <td className="hidden md:table-cell">{studentService.firstName}</td>
      <td className="hidden md:table-cell">{studentService?.address}</td>
      <td className="hidden md:table-cell">
        {studentService.address?.toLowerCase()}
      </td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${studentService.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/20">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModal
                table="studentService"
                type="delete"
                username={studentService?.username}
              />
              <FormModal
                table="studentService"
                type="update"
                data={studentService}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Student Services
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <SortModal />
            {role === "admin" && (
              <FormModal table="studentService" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* Student List and Pagination */}
      <Suspense fallback={<StudentListLoadingPage />}>
        {studentServices && (
          <>
            <Table
              columns={columns}
              renderRow={renderRow}
              data={studentServices}
            />
            <Pagination page={currentPage} total={total || 0} />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default StudentServicePage;
