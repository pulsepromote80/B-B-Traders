"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FiCopy } from 'react-icons/fi';
import { FundRequestColumns, paymentModes } from '@/app/constants/constant';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';

export default function FundRequest() {
  const [paymentMode, setPaymentMode] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [remark, setRemark] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');

  const data = [
    {
      id: 1,
      status: 'unApproved',
      amount: '$10.00',
      date: '04/06/2025',
      transactionHash: 'teatetteateastestsetestsetestetest1011',
      mode: 'TRC20 USDT'
    }
  ];

  // Initialize the table
  const table = useReactTable({
    data,
    columns: FundRequestColumns,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    // Implement changewalletaddress logic here
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    // Implement changewalletaddress logic here
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    // You can add a toast notification here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex flex-wrap ">
      <div className="w-full md:w-1/2 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="PaymentMode">
                  Payment Mode
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-0 focus:border-[#86b7fe] "
                  id="PaymentMode"
                  name="PaymentMode"
                  value={paymentMode}
                  onChange={handlePaymentModeChange}
                  required
                >
                  {paymentModes.map((mode) => (
                    <option key={mode.value} value={mode.value} className="bg-[#020b22] text-white">
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Ramount">
                  Enter Amount
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                  id="Ramount"
                  name="Ramount"
                  maxLength="8"
                  placeholder="Enter Amount"
                  required
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>

              <input type="hidden" id="MDRCoinrate" name="MDRCoinrate" value="" />
              <input type="hidden" id="BLNCoinrate" name="BLNCoinrate" value="" />

              <div className="mb-4" id="divqrcode">
                <div className="mt-2">
                  <Image src="/qrCode.png" className="filter invert" alt="QR Code" width={100} height={100} />
                </div>
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2" htmlFor="PaymentDetails">
                  Company Deposit Wallet
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                    id="PaymentDetails"
                    name="PaymentDetails"
                    maxLength="5"
                    placeholder=""
                    readOnly
                    required
                    type="text"
                    value={walletAddress}
                  />
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="ml-2 p-1 focus:outline-none cursor-pointer"
                  >
                    <FiCopy className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="refrenceNo">
                  Enter Transaction Hash
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe] "
                  id="refrenceNo"
                  name="refrenceNo"
                  placeholder="Enter Transaction Hash"
                  required
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Commentbox">
                  Remark
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                  id="Commentbox"
                  name="Commentbox"
                  placeholder="Enter Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4 hidden">
                <label className="block text-gray-700 mb-2" htmlFor="FormFile">
                  Upload Screenshot <span className="text-blue-500">*</span>
                </label>
                <input
                  type="file"
                  name="FormFile"
                  id="FormFile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label id="lblMsg" className="text-blue-600 font-bold"></label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  id="btnSubmit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="Button2"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <h4 className="text-xl text-gray-800">Fund Request List</h4>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gradient-to-r from-[#020b22] to-[#17316f] text-white pt-4">
              <div className="flex flex-wrap justify-between items-center mb-4 px-4">
                <div className="mb-4 md:mb-0">
                  <select
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                      table.setPageSize(Number(e.target.value))
                    }}
                  >
                    {[10, 25, 50, 100].map(pageSize => (
                      <option key={pageSize} value={pageSize} className='bg-white text-black'>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mr-2">Search:</label>
                  <input
                    type="search"
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={globalFilter ?? ''}
                    onChange={e => setGlobalFilter(String(e.target.value))}
                    placeholder=""
                  />
                </div>
              </div>

              <table className="min-w-full">
                <thead >
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium  text-white uppercase tracking-wider"
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex justify-center">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody >
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-wrap justify-between items-center mt-4 px-4 pb-4">
                <div className="mb-4 md:mb-0">
                  <span>
                    Showing {table.getState().pagination.pageIndex + 1} to{' '}
                    {table.getPageCount()} of {table.getFilteredRowModel().rows.length}{' '}
                    entries
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    «
                  </button>
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    ‹
                  </button>
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    ›
                  </button>
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}