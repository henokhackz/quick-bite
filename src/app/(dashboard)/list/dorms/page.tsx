// app/(dashboard)/feedback/page.tsx

import { Suspense } from "react";
import Link from "next/link";
import { View } from "lucide-react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { auth } from "@/lib/auth";

const DormListPage = async () => {
  const session = await auth();
  const role = session?.user?.role || "";

  // Hardcoded dorm data
  const dorms = [
    {
      id: "dorm1",
      name: "Dorm A - Room 101",
      capacity: 6,
      students: [
        { id: "stu1", name: "Abel Mekonnen", studentId: "UGR/1234/14", gender: "Male" },
        { id: "stu2", name: "Hanna Tesfaye", studentId: "UGR/2345/14", gender: "Female" },
        { id: "stu3", name: "Kalkidan Alemu", studentId: "UGR/3456/14", gender: "Female" },
      ],
      materials: [
        { id: "mat1", name: "Bed", quantity: 6 },
        { id: "mat2", name: "Chair", quantity: 6 },
        { id: "mat3", name: "Table", quantity: 3 },
        { id: "mat4", name: "Shelf", quantity: 2 },
      ],
    },
    {
      id: "dorm2",
      name: "Dorm B - Room 202",
      capacity: 6,
      students: [
        { id: "stu4", name: "Bereket Yohannes", studentId: "UGR/4567/14", gender: "Male" },
        { id: "stu5", name: "Selam Haile", studentId: "UGR/5678/14", gender: "Female" },
      ],
      materials: [
        { id: "mat1", name: "Bed", quantity: 6 },
        { id: "mat2", name: "Chair", quantity: 6 },
        { id: "mat3", name: "Table", quantity: 3 },
        { id: "mat5", name: "Curtains", quantity: 2 },
      ],
    },
    {
      id: "dorm3",
      name: "Dorm C - Room 303",
      capacity: 6,
      students: [],
      materials: [
        { id: "mat1", name: "Bed", quantity: 6 },
        { id: "mat2", name: "Chair", quantity: 6 },
        { id: "mat6", name: "Fan", quantity: 1 },
      ],
    },
  ];

  const renderRow = (dorm: any) => (
    <tr
      key={dorm.id}
      className="border-b border-gray-200  even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      <td className ="p-4 font-medium">{dorm.name}</td>
      <td className="p-4">{dorm.capacity}</td>
      <td className="p-4">{dorm.students.length}</td>
      <td className="p-4">{dorm.materials.length}</td>
      <td className="p-4">
        <Link href={`/list/dorms/${dorm.id}`} className="text-blue-500 hover:underline flex items-center gap-1">
          <View className="w-4 h-4" />
          View
        </Link>
      </td>
      {role !== "student" && (
        <td className="p-4">
          <FormModal table="dorm" type="delete" data={dorm} />
        </td>
      )}
    </tr>
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow-md flex-1 m-4 mt-4">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-semibold mb-4">Dorm List</h1>
     <Link href="/list/dorms/auto-assignment" className="bg-primary text-white py-2 font-semibold text-md cursor-pointer px-5 rounded-lg">automated dorm creation</Link>
      </div>

      <Suspense fallback={<div>Loading dorms...</div>}>
        {dorms.length > 0 ? (
          <>
            <Table
              columns={[
                { header: "Name", accessor: "name" },
                { header: "Capacity", accessor: "capacity" },
                { header: "Students", accessor: "students" },
                { header: "Materials", accessor: "materials" },
                { header: "Actions", accessor: "actions" },
                ...(role !== "student"
                  ? [{ header: "Manage", accessor: "manage" }]
                  : []),
              ]}
              renderRow={renderRow}
              data={dorms}
            />
            <Pagination page={1} total={dorms.length} />
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">No dorms found.</div>
        )}
      </Suspense>
    </div>
  );
};

export default DormListPage;
