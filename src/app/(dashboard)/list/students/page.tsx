import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import { role } from "@/lib/data";
import { Student } from "../../../../../types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllStudents } from "@/lib/actions/admin.action";
import StudentListLoadingPage from "./loading";
import { columns } from "@/lib/constants";
const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? Number(page) : 1;
  //fetch students data from database
  let res;
  try {
    res = await getAllStudents(p);
  } catch (error) {
    console.log(error);
  }

  let students = res?.data;
  let success = res?.success;
  let message = res?.message;
  let total = res?.total;

  if (!success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  const renderRow = (item: Partial<Student>) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      <td className="flex items-center gap-4 p-4">
        {item?.photo1 && (
          <Image
            src={item?.photo1}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {item?.firstName?.toLocaleUpperCase() +
              " " +
              item?.lastName?.toLocaleUpperCase()}
          </h3>
          <p className="text-xs text-gray-500">
            {item?.department?.toLocaleLowerCase()}
          </p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item?.assignedCafeteria}</td>
      <td className="hidden md:table-cell">{item.batch}</td>
      <td className="hidden md:table-cell">
        {item.department?.toLocaleLowerCase()}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/20">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="student" type="delete" id={item?.id} />
              <FormModal table="student" type="update" data={item} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Suspense fallback={<StudentListLoadingPage />}>
        {students && (
          <>
            <Table columns={columns} renderRow={renderRow} data={students} />
            <Pagination page={p} total={total!} />
          </>
        )}
        {/* PAGINATION */}
      </Suspense>
    </div>
  );
};

export default StudentListPage;
