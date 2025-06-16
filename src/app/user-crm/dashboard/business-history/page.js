"use client";

import { useState } from "react";
import UserTable from "../user-Table/page";

export default function BusinessHistory() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      alert("Please select both dates.");
      return false;
    }
  };

  return (
    <>
    <div className="w-full px-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
        <div className="border-b pb-2 mb-4">
          <label className="m-0 font-semibold text-gray-700">
            Total Team Business: $0
          </label>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="fromDate" className="text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="toDate" className="text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="flex items-end w-full md:w-1/4">
              <button
                type="submit"
                className="w-full max-w-sm bg-[#eab23e] text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <UserTable/>
    </>
  );
}
