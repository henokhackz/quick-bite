"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SortModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Student ID", value: "id" },
    { label: "Batch", value: "batch" },
  ];

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSort = () => {
    if (selectedOption) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("sortBy", selectedOption);
      router.push(`${window.location.pathname}?${params.toString()}`);
      toggleModal(); // Close the modal after sorting
    }
  };

  return (
    <div className="relative">
      {/* Button/Icon to toggle modal */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10"
        onClick={toggleModal}
        aria-label="Sort"
      >
        <img src="/sort.png" alt="Sort Icon" width={16} height={16} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 z-50">
          <h3 className="text-sm font-semibold mb-2">Sort By</h3>
          <ul className="space-y-2">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded-md"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm bg-primary text-white rounded-md"
              onClick={handleSort}
              disabled={!selectedOption}
            >
              Sort
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortModal;
