"use client";
import { useRouter } from "next/navigation";
const Pagination = ({ page, total }: { page: number; total: number }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    router.push(`?${searchParams.toString()}`);
  };

  const hasPrevious = page > 1;
  const hasNext = page < Math.ceil(total / 10);

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrevious}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(total / 10) }, (_, index) => (
          <button
            key={index}
            className={`px-2 rounded-sm hover:bg-lamaSky hover:text-white ${
              page === index + 1 ? "bg-primary/20 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        disabled={!hasNext}
        onClick={() => handlePageChange(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
