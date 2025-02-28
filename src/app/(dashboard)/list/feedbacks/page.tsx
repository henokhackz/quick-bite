import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import TableSearch from "@/components/table-search";
import { role,} from "@/lib/data";
import Image from "next/image";
// import Link from "next/link";
// import { Feedback } from "../../../../../types";

// const columns = [
//   {
//     header: "Feedback",
//     accessor: "feedback",
//   },
//   ,{
//     header: "Student ID",
//     accessor: "studentId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Assigned Cafteria",
//     accessor: "cafteria",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

const StudentListPage = () => {
  // const renderRow = (item: Feedback) => (
  //   <tr
  //     key={item.id}
  //     className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
  //   >
  //     <td className="flex items-center gap-4 p-4">
  //      {
  //        item.priority ==='high'? <div className="h-5 w-5 bg-danger/20 p-2 rounded-full animate-spin"></div>
  //      : <div className="h-5 w-5 bg-dang p-2 rounded-full animate-spin bg-primaryLight/20"></div>

  //      }
  //       <div className="flex flex-col">
  //         <h3 className="font-semibold">{item.title}</h3>
  //         <p className="text-xs text-gray-500">{item.studentId}</p>
  //       </div>
  //     </td>
  //     <td className="hidden md:table-cell">{item.studentId}</td>
  //     <td className="hidden md:table-cell">{item.studentId}</td>
      

  //     <td>
  //       <div className="flex items-center gap-2">
  //         <Link href={`/list/teachers/${item.id}`}>
  //           <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
  //             <Image src="/view.png" alt="" width={16} height={16} />
  //           </button>
  //         </Link>
  //         {role === "admin" && (
  //           // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
  //           //   <Image src="/delete.png" alt="" width={16} height={16} />
  //           // </button>
  //           <FormModal table="student" type="delete" username={item.studentId}/>
  //         )}
  //       </div>
  //     </td>
  //   </tr>
  // );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Student Services</h1>
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
              <FormModal table="student" type="create"/>
              </>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
     
      {/* PAGINATION */}
      <Pagination page={1} total={10} />
    </div>
  );
};

export default StudentListPage;
