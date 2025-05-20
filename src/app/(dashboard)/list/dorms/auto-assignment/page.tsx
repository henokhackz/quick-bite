// app/dashboard/auto-assign/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AutoAssignPage() {
  const router = useRouter();

  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 5 seconds of processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/list/dorms");
    }, 5000);
  };

  return (
    <div className="w-full mx-auto px-6 py-12 max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow border">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Academic Session</label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          >
            <option value="">Select Session</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2024/2025">2024/2025</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          >
            <option value="">Select Department</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Batch</label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          >
            <option value="">Select Batch</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Auto Assign Dorms"}
        </button>
      </form>

      {isProcessing && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Please wait while we assign dorms to students...
        </p>
      )}
    </div>
  );
}
