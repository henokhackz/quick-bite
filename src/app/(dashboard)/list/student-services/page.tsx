import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import { role, studentsData, studentServices } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

import { getAllStudentService } from "@/lib/actions/admin.action";
import { Suspense } from "react";
import { StudentService } from "@prisma/client";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Position",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Batch",
    accessor: "batch",
    className: "hidden md:table-cell",
  },
  {
    header: "Assigned Cafteria",
    accessor: "cafteria",
    className: "hidden lg:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentServiceListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = Number(page) ?? 1;

  let studentService = null;

  try {
    studentService = await getAllStudentService(p);
  } catch (error) {
    console.log("error while fetching student service data ", error);
  }

  const renderRow = (item: StudentService) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      <td className="flex items-center gap-4 p-4">
        {item.photo && (
          <Image
            src={item?.photo}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{item?.firstName + item?.lastName}</h3>
          <p className="text-xs text-gray-500">{item?.department}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item?.address}</td>
      <td className="hidden md:table-cell">{item?.department}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Student Services
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                  <Image src="/plus.png" alt="" width={14} height={14} />
                </button>
                <FormModal table="studentService" type="create" />
              </>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Suspense>
        {studentService && studentService.data != undefined && (
          <Table
            columns={columns}
            renderRow={renderRow}
            data={studentService?.data}
          />
        )}
      </Suspense>
      {}
      {/* PAGINATION */}
      <Pagination page={1} total={10} />
    </div>
  );
};

export default StudentServiceListPage;
