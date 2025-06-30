import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const dorm = {
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
};

export default function DormDetailsPage() {
  if (!dorm) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <Link
          href="/list/dorms"
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dorm List
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Dorm</h1>
      </div>

      {/* Dorm Info Table */}
      <section className="bg-white shadow border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Dorm Info</h2>
        <div className="overflow-x-auto items-center flex justify-center">
          <table className="min-w-full border border-gray-200 text-sm text-gray-800">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50 w-1/4">Dorm Name</td>
                <td className="p-3">{dorm.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Capacity</td>
                <td className="p-3">{dorm.capacity} Students</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Total Students</td>
                <td className="p-3">{dorm.students.length}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Material Types</td>
                <td className="p-3">{dorm.materials.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Students Table */}
      <section className="bg-white shadow border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Assigned Students</h2>
        {dorm.students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-gray-800">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Student ID</th>
                  <th className="p-3 border">Gender</th>
                </tr>
              </thead>
              <tbody>
                {dorm.students.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 border-t">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border font-medium">{student.name}</td>
                    <td className="p-3 border">{student.studentId}</td>
                    <td className="p-3 border">{student.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No students assigned.</p>
        )}
      </section>

      {/* Materials Table */}
      <section className="bg-white shadow border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Provided Materials</h2>
        {dorm.materials.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-gray-800">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Material Name</th>
                  <th className="p-3 border">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {dorm.materials.map((mat, index) => (
                  <tr key={mat.id} className="hover:bg-gray-50 border-t">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border font-medium">{mat.name}</td>
                    <td className="p-3 border">{mat.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No materials recorded.</p>
        )}
      </section>
    </div>
  );
}
