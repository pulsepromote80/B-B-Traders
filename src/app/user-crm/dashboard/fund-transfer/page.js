'use client';

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';

export default function FundTransfer() {
    const [amount, setAmount] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [walletBalance, setWalletBalance] = useState(0.0);
    const [globalFilter, setGlobalFilter] = useState('');

    const handleSendOTP = () => {
        console.log('Send OTP');
        setMessage('OTP sent to your email');
    };

    const handleTransfer = () => {
        console.log(`Transfer ${amount} with OTP ${otp}`);
        setMessage('Transfer successful!');
    };

    const handleRefresh = () => {
        console.log('Refresh wallet');
        setMessage('Refreshed wallet details');
    };

    // Sample data
    const data = useMemo(
        () => [
            { id: 1, date: '2025-06-13', amount: 100.0, remark: 'Fund Added' },
            { id: 2, date: '2025-06-12', amount: -50.0, remark: 'Transfer Sent' },
        ],
        []
    );

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'S.No.',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('date', {
                header: 'Trans. Date',
                cell: (info) => info.getValue(),
                enableSorting: true,
            }),
            columnHelper.accessor('amount', {
                header: 'Amount',
                cell: (info) => `$${info.getValue().toFixed(2)}`,
                enableSorting: true,
            }),
            columnHelper.accessor('remark', {
                header: 'Remark',
                cell: (info) => info.getValue(),
            }),
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div className="p-4">
            <div className="w-full space-y-6">
                {/* Wallet Form */}
                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800">
                            Wallet Balance: ${walletBalance.toFixed(2)}
                        </h2>
                    </div>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold block mb-1">Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    maxLength={8}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter Amount.."
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                />
                            </div>
                            <div>
                                <label className="font-semibold block mb-1">Enter OTP (Sent to Email)</label>
                                <input
                                    type="number"
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="text-red-500 font-semibold text-sm mt-2">{message}</div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                            <button
                                type="button"
                                onClick={handleSendOTP}
                                className="bg-[#6446d7] text-white px-4 py-2 rounded shadow"
                            >
                                Send OTP
                            </button>
                            <button
                                type="button"
                                onClick={handleTransfer}
                                className="bg-[#e6a114] text-white px-4 py-2 rounded shadow"
                            >
                                Transfer
                            </button>
                            <button
                                type="button"
                                onClick={handleRefresh}
                                className="bg-[#fce887] text-black px-4 py-2 rounded shadow"
                            >
                                Refresh
                            </button>
                        </div>
                    </form>
                </div>

                {/* Transaction Table */}
                <div className='bg-white p-6 pb-10'>
                <div className="bg-gradient-to-r from-[#020b22] to-[#17316f] text-white shadow-lg rounded-xl p-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <div className="flex items-center gap-2">
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                {[5, 10, 25, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize} className='bg-white text-black'>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium ">Search:</label>
                            <input
                                type="search"
                                value={globalFilter ?? ''}
                                onChange={e => setGlobalFilter(e.target.value)}
                                className="border rounded px-3 py-2 text-sm "
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full ">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                            >
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex items-center gap-1'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted()] ?? null}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="text-white">
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map(row => (
                                        <tr key={row.id} >
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-white">
                                            No transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                        <div className="text-sm text-white">
                            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                            {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getFilteredRowModel().rows.length
                            )}{' '}
                            of {table.getFilteredRowModel().rows.length} entries
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1  text-white"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                «
                            </button>
                            <button
                                className="px-3 py-1  text-white"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                ‹
                            </button>
                            <span className="text-sm text-white">
                                Page {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount()}
                            </span>
                            <button
                                className="px-3 py-1  text-white"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                ›
                            </button>
                            <button
                                className="px-3 py-1  text-white "
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
    );
}
