'use client';
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const TradingProfit = () => {
  const [selectedTransType, setSelectedTransType] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');

  const data = useMemo(() => [], []); 

  const columns = useMemo(
    () => [
      columnHelper.accessor((_, idx) => idx + 1, {
        id: 'sno',
        header: 'S.No.',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('transType', {
        header: 'Trans Type',
      }),
      columnHelper.accessor('credit', {
        header: 'Credit',
      }),
      columnHelper.accessor('debit', {
        header: 'Debit',
      }),
      columnHelper.accessor('date', {
        header: 'Date',
      }),
      columnHelper.accessor('remark', {
        header: 'Remark',
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="flex flex-col px-5 gap-6">
      {/* Header Card */}
      <div className="w-full  rounded-xl p-6 shadow-md border-gray-500 border-1">   
        <form className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="form-select w-full p-2 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe] border-1"
              id="transType"
              name="transType"
              value={selectedTransType}
              onChange={(e) => setSelectedTransType(e.target.value)}
            >
              <option value="">Select Transaction</option>
            </select>
            <div className="flex items-center  text-lg ">
              <h6 className="text-xl">Income Wallet Balance : $0.00</h6>
            </div>
          </div>
        </form>
      </div>

      {/* Transactions Table */}
      <div className="w-full bg-gray-800 rounded-xl shadow-md p-4 overflow-x-auto border-gray-500 border-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border rounded px-2 py-1 text-sm  text-white"
            >
              {[10, 20, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} className='bg-white text-black'>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Search:</label>
            <input
              type="search"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="border rounded px-3 py-2 text-sm  text-white"
              placeholder=""
            />
          </div>
        </div>
        <table className="min-w-full  text-sm text-left">
          <thead >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 font-semibold text-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-white">
                  No data available in table
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="text-white">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2 text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer Info */}
        <div className="flex justify-between items-center mt-4 text-sm text-white">
          <div>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()} 
              className="px-2 py-1 text-white rounded disabled:opacity-50"
            >
              «
            </button>
            <button 
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()} 
              className="px-2 py-1 text-white rounded disabled:opacity-50"
            >
              ‹
            </button>
            <span className="text-sm text-white">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button 
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()} 
              className="px-2 py-1 text-white rounded disabled:opacity-50"
            >
              ›
            </button>
            <button 
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()} 
              className="px-2 py-1 text-white rounded disabled:opacity-50"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingProfit;