'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function TopupForm() {
  const [mainWallet, setMainWallet] = useState(400000.0);
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const data = useMemo(
    () => [
      { id: 1, amount: 100000.0, date: '02/06/2025', remark: 'Trade' },
      { id: 2, amount: 100.0, date: '05/06/2025', remark: 'PowerPack' },
      { id: 3, amount: 100.0, date: '05/06/2025', remark: 'FDPack' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        header: 'S.no.',
        accessorKey: 'id',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (info) => `$${info.getValue().toFixed(4)}`,
      },
      {
        header: 'Order Date',
        accessorKey: 'date',
      },
      {
        header: 'Remark',
        accessorKey: 'remark',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) return alert('Please accept the terms');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // Logic for upgrading account
    alert('Account upgraded successfully!');
    setShowConfirm(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 ">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-1 ">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-lg font-semibold text-gray-800">
              Topup Wallet : ${mainWallet.toFixed(2)}
            </h6>
            <input type="hidden" value={mainWallet} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Enter Amount:</label>
              <input
                type="text"
                placeholder="Enter USDT"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                maxLength={15}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">User ID</label>
              <input
                type="text"
                placeholder="Enter UserId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                maxLength={12}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                disabled
                className="w-full border rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 mr-2 w-4 h-4"
              />
              <label className="text-sm mt-1">
                <a href="#">Verify Terms & Conditions</a>
              </label>
            </div>

            <div className="pt-6 space-x-4">
              {!showConfirm ? (
                <button
                  type="submit"
                  className="bg-[#e6a114] text-white px-4 py-2 rounded-md "
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="bg-[#e6a114] text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  CLICK TO CONFIRM
                </button>
              )}
              <button
                type="button"
                onClick={handleRefresh}
                className="bg-[#e6a114] text-white px-4 py-2 rounded-md"
              >
                REFRESH
              </button>
            </div>

            {showConfirm && (
              <strong className="block text-red-600 mt-4">
                Please click on the confirm button to continue the payment.
              </strong>
            )}
          </form>
        </div>
      </div>

      {/* Right Panel - Transactions Table */}
      <div className="w-full md:w-1/2">
        <div className="bg-white bg-gradient-to-r from-[#020b22] to-[#17316f] rounded-2xl shadow-lg p-4 overflow-x-auto gap-1">
          <div className="mb-2 flex justify-between items-center">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="mx-2 border px-2 py-1 text-white rounded bg-transparent"
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size} className="bg-[#020b22]">
                  {size}
                </option>
              ))}
            </select>

            <div className="flex items-center text-white gap-1">
              <label>Search:</label>
              <div className="relative">
                <input
                  type="text"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="border px-2 py-1 rounded bg-transparent pr-8"
                  placeholder=""
                />
                {globalFilter && (
                  <button
                    onClick={() => setGlobalFilter('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <table className="w-full text-sm text-left">
            <thead className="text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-3 py-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="text-white border-b border-white">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-sm text-white flex justify-between items-center">
            <div>
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} entries
            </div>
            <div className="flex gap-2">
              <button
                className="border px-2 py-1 rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                className="border px-2 py-1 rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
