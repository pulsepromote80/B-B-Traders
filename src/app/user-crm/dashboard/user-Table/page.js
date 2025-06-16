// components/UserTable.js
"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const UserTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const data = useMemo(
    () => [
      {
        sno: 1,
        sponsorId: "BB100000",
        userId: "BB4630903",
        name: "Lucky",
        activationDate: "Id not Activated",
        tradingFund: "$0.00",
        teamBusiness: "$0.00",
        depth: 1,
      },
      {
        sno: 2,
        sponsorId: "BB100000",
        userId: "BB9524520",
        name: "Shoeb",
        activationDate: "Id not Activated",
        tradingFund: "$0.00",
        teamBusiness: "$0.00",
        depth: 1,
      },
      {
        sno: 3,
        sponsorId: "BB100000",
        userId: "BB5359547",
        name: "Ajay",
        activationDate: "Id not Activated",
        tradingFund: "$0.00",
        teamBusiness: "$0.00",
        depth: 1,
      },
      {
        sno: 4,
        sponsorId: "BB100000",
        userId: "BB9210451",
        name: "Abhi",
        activationDate: "Id not Activated",
        tradingFund: "$0.00",
        teamBusiness: "$0.00",
        depth: 1,
      },
      {
        sno: 5,
        sponsorId: "BB4630903",
        userId: "BB4268039",
        name: "Ayudh Rajay",
        activationDate: "Id not Activated",
        tradingFund: "$0.00",
        teamBusiness: "$0.00",
        depth: 2,
      },
      // Add more data as needed...
    ],
    []
  );

  const columns = useMemo(
    () => [
      { 
        accessorKey: "sno", 
        header: "S.No.",
        sortingFn: "basic"
      },
      { 
        accessorKey: "sponsorId", 
        header: "Sponsor ID",
        sortingFn: "basic"
      },
      { 
        accessorKey: "userId", 
        header: "User ID",
        sortingFn: "basic"
      },
      { 
        accessorKey: "name", 
        header: "Name",
        sortingFn: "basic"
      },
      { 
        accessorKey: "activationDate", 
        header: "Activation Date",
        sortingFn: "basic"
      },
      { 
        accessorKey: "tradingFund", 
        header: "Trading Fund",
        sortingFn: "basic"
      },
      { 
        accessorKey: "teamBusiness", 
        header: "Team Business",
        sortingFn: "basic"
      },
      { 
        accessorKey: "depth", 
        header: "Depth",
        sortingFn: "basic"
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-white mx-4 py-6 border-1 rounded-lg ">
    <div className="card bg-[#0a1c40] text-white shadow-md rounded-lg mx-4">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 border rounded-md text-sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-white">entries per page</span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="text-sm text-white">
              Search:
            </label>
            <input
              id="search"
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
              placeholder=""
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-white">
            <thead className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-gray-200 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="text-xs">
                          {{
                            asc: "↑",
                            desc: "↓",
                          }[header.column.getIsSorted()] ?? ""}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-white border-b border-gray-200"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-white">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-md "
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronDoubleLeftIcon className="h-3 w-3" />
            </button>
            <button
              className="p-1 rounded-md "
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-3 w-3" />
            </button>
            {Array.from(
              { length: table.getPageCount() },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-md ${
                  table.getState().pagination.pageIndex === pageNumber - 1
                    ? "border-1 border-white text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => table.setPageIndex(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="p-1 rounded-md "
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-3 w-3" />
            </button>
            <button
              className="p-1 rounded-md"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronDoubleRightIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserTable;
