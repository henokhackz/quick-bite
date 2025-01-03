"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { TicketHolder } from "../../../../../types";

import { getAllTicketHolders } from "@/lib/actions/admin.action";
import { useState, useEffect, Suspense } from "react";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  {
    header: "Assigned Cafeteria",
    accessor: "cafeteria",
    className: "hidden lg:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const StudentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...keyParams } = searchParams;
  const p: number = page ? Number(page) : 1;

  const [data, setData] = useState<TicketHolder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketHolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllTicketHolders(p);
        setData(response.data || []);
        setTotal(response.total || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load ticket holders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketHolders();
  }, [p]);

  const renderRow = (item: TicketHolder) => (
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
          <h3 className="font-semibold">
            {item?.firstName + " " + item?.lastName}
          </h3>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.phoneNumber}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">{item.assignedCafeteria}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="ticketHolder" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Ticket Holders
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
              <FormModal table="ticketHolder" type="create" />
            )}
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex w-full items-center justify-center ">
          <div className="loader"></div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && data && (
        <Table columns={columns} renderRow={renderRow} data={data} />
      )}
      {total > 0 && <Pagination page={p} total={total} />}
    </div>
  );
};

export default StudentListPage;
