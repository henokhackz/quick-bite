"use client";

import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("academic");

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Settings
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-300 dark:border-gray-700">
        {[
          { id: "academic", label: "Academic Session" },
          { id: "cafe", label: "Cafeteria Settings" },
          { id: "dorm", label: "Dormitory Settings" },
          { id: "general", label: "General Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 space-y-6">
        {activeTab === "academic" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Academic Session Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Current Academic Year
                </label>
                <input
                  type="text"
                  placeholder="2024/2025"
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Semester
                </label>
                <select className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2">
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                </select>
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all">
              Save Academic Settings
            </button>
          </div>
        )}

        {activeTab === "cafe" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Cafeteria Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Meals Per Day
                </label>
                <input
                  type="number"
                  defaultValue={3}
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Meal Start Time
                </label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Meal End Time
                </label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2"
                />
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all">
              Save Cafeteria Settings
            </button>
          </div>
        )}

        {activeTab === "dorm" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Dormitory Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Dorm Capacity
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Assign Method
                </label>
                <select className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2">
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all">
              Save Dorm Settings
            </button>
          </div>
        )}

        {activeTab === "general" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  System Email
                </label>
                <input
                  type="email"
                  placeholder="admin@university.edu"
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Notification Frequency
                </label>
                <select className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 p-2">
                  <option>Instant</option>
                  <option>Daily Summary</option>
                  <option>Weekly Summary</option>
                </select>
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all">
              Save General Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
