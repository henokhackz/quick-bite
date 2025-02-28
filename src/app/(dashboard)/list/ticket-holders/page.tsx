"use client";

import { useState, useEffect, useMemo } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import Image from "next/image";
import Link from "next/link";
import { TicketHolder } from "../../../../../types";

import { getAllTicketHolders } from "@/lib/actions/admin.action";
import { useSession } from "next-auth/react";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Assigned Cafeteria", accessor: "cafeteria", className: "hidden lg:table-cell" },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const StudentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const currentPage: number = page ? Number(page) : 1;

  const [data, setData] = useState<TicketHolder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>("");

  const { data: sessionData } = useSession();
  const role = sessionData?.user?.role;

  const stableQuery = useMemo(() => {
    const query: Record<string, any> = {};
    if (queryParams["search"]) {
      query["firstName"] = { contains: queryParams?.["search"], mode: "insensitive" };
    }
    return query;
  }, [queryParams]);

  const fetchTicketHolders = useMemo(
    () =>
      debounce(async (page: number, query: Record<string, any>) => {
        const queryKey = JSON.stringify({ page, query });
        if (queryKey === lastQuery) return; // Prevent duplicate fetches

        setLoading(true);
        setError(null);
        try {
          const response = await getAllTicketHolders(page, query);
          if (response) {
            setData(response.data || []);
            setTotal(response.total || 0);
            setLastQuery(queryKey);
          } else {
            throw new Error("Invalid response from the server.");
          }
        } catch (err) {
          console.error("Failed to fetch ticket holders:", err);
          setError("Failed to load ticket holders. Please try again.");
        } finally {
          setLoading(false);
        }
      }, 300),
    [lastQuery]
  );

  useEffect(() => {
    fetchTicketHolders(currentPage, stableQuery);
  }, [fetchTicketHolders, currentPage, stableQuery]);

  const renderRow = (item: TicketHolder) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-primaryLight/10"
    >
      <td className="flex items-center gap-4 p-4">
        {item?.ticketHolderPhoto?.[0] && (
          <Image
            src={  item.ticketHolderPhoto[0].photoUrl}
            alt="Ticket Holder"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{`${item.firstName} ${item.lastName}`}</h3>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.phoneNumber}</td>
      <td className="hidden md:table-cell">{item.assignedCafeteria}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">{item.gender}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/ticket-holders/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
            <FormModal table="ticketHolder" type="delete" username={item.username} data={item} />
            <FormModal table="ticketHolder" type="update" />
            </>
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
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="ticketHolder" type="create" />
              
            )}
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex w-full items-center justify-center h-full">
          <div className="loader"></div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && data.length > 0 && (
        <Table columns={columns} renderRow={renderRow} data={data} />
      )}
      {total > 0 && <Pagination page={currentPage} total={total} />}
    </div>
  );
};

export default StudentListPage;
