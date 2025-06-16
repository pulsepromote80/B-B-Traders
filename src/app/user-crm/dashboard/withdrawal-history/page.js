'use client';

import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';

export default function WithdrawalHistory() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const data = useMemo(() => [], []); 

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        {
            header: 'S.No.',
            cell: (info) => info.row.index + 1,
        },
        columnHelper.accessor('paymentMode', {
            header: 'Payment Mode',
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('withdrawal', {
            header: 'Withdrawal',
        }),
        columnHelper.accessor('charges', {
            header: 'Charges',
        }),
        columnHelper.accessor('release', {
            header: 'Release',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
        }),
        columnHelper.accessor('hash', {
            header: 'Hash',
        }),
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            pagination: {
                pageSize,
            },
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div className="bg-white p-4 mx-4 rounded-lg border-gray-500 border-1">
            <p className="text-md ">
                Withdrawal (Total Release): ₹0.00
            </p>
            <div className='bg-gradient-to-r from-[#020b22] to-[#17316f] p-4 rounded-lg mt-4'>
                <div className="flex  justify-between items-center mb-4 ">
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="p-2 rounded  text-white border border-gray-600"
                    >
                        {[10, 20, 25].map((size) => (
                            <option key={size} value={size} className='bg-white text-black'>
                                {size}
                            </option>
                        ))}
                    </select>
                    <div>
                        <label className="text-white font-bold ">
                            Search:
                        </label>
                        <input
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="p-2 rounded  text-white border border-gray-600 ml-2"
                            placeholder=""
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-white">
                        <thead className="text-white">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-4 py-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center p-4 ">
                                        No data available in table
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="border-t border-gray-700">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-4 py-2 ">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                   
                    <span className="text-white">
                        Showing {table.getState().pagination.pageIndex + 1} to {' '}
                        {table.getPageCount()} of {table.getFilteredRowModel().rows.length} entries
                    </span>
                    <div className="flex items-center gap-2 text-white">
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2 py-1 "
                        >
                            {'<<'}
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2  py-1  "
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-2 py-1  "
                        >
                            {'>'}
                        </button>
                        <button
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="px-2 py-1  "
                        >
                            {'>>'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
