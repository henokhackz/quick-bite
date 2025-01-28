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
      {/* Sort Button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-light text-primary focus:outline-none focus:ring focus:ring-primary-dark transition"
        onClick={toggleModal}
        aria-label="Sort"
      >
        <img src="/sort.png" alt="Sort Icon" className="w-5 h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg p-6 z-50 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
          <ul className="space-y-3">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="form-radio text-primary"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 transition"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg focus:outline-none focus:ring focus:ring-primary-light transition ${
                selectedOption ? "hover:bg-primary-dark" : "opacity-50 cursor-not-allowed"
              }`}
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
