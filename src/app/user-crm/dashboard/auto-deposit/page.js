"use client"

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { FaCopy } from 'react-icons/fa';

export default function AutoDeposit() {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const fnCopy = () => {
        // Implement your copy logic here
        navigator.clipboard.writeText('0xC3bE7bCFD8d4E18F1C80aa6b8c6e11F1f4551444')
            .then(() => {
                setModalMessage('Wallet Address copied!');
                setShowModal(true);
            })
            .catch(err => console.error('Copy failed', err));
    };

    const columns = useMemo(() => [
        { accessorKey: 'sno', header: 'S.No.' },
        { accessorKey: 'amount', header: 'Amount($)' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'date', header: 'Date' },
        { accessorKey: 'hash', header: 'TransHash' },
    ], [])

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageSize,
                pageIndex: 0,
            },
        },
        onPaginationChange: () => { },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                    onClick={() => setShowModal(false)}
                >
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <div className="flex justify-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center border-4 border-black shadow-sm">
                                <img
                                    src="/logo.webp"
                                    alt="Logo"
                                    className="w-3/4"
                                />
                            </div>
                        </div>
                        <div className="mt-8 mb-6 text-center">
                            <p className="text-xl text-black">{modalMessage}</p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-8 py-2 rounded w-56"
                                onClick={() => setShowModal(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white mx-4 py-6 rounded-lg mt-4 py-10 border-1">
                <div className='flex items-center gap-2 justify-center flex-col'>
                    <Image src="/qrCode.png" alt="Auto Deposit" width={100} height={100} />
                    <p className='text-sm'>Wallet (BEP20 USDT Binance Smart Chain)</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'>0xC3bE7bCFD8d4E18F1C80aa6b8c6e11F1f4551444  </p>
                        <button
                            type="button"
                            onClick={fnCopy}
                            className="w-9 h-9 ml-1 rounded cursor-pointer bg-black border border-black text-white flex items-center justify-center"
                        >
                            <FaCopy />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col mt-5 justify-center items-center'>
                    <p>
                        USDT Balance
                    </p>
                    0
                </div>

            </div>
            <div className=' px-4 flex justify-center p-2 gap-4 bg-[#f8f8f8] items-center'>
                <button className='bg-[#198754] text-white px-4 py-2 rounded-lg cursor-pointer'>
                    Load USDT
                </button>
                <button className='bg-[#198754] text-white px-4 py-2 rounded-lg cursor-pointer'>
                    REFRESH
                </button>
            </div>

            <div className='px-4 '>
                <div className='border-1 rounded-lg mt-4'>
                    <h1 className='border-b p-2'>Fund Deposit Records</h1>
                    <div className="px-4 my-4">
                        <div className="w-full overflow-x-auto bg-gradient-to-r from-[#020b22] to-[#17316f] rounded-lg pt-4">
                            {/* Top Controls */}
                            <div className="flex justify-between items-center mb-4 text-white px-4">
                                <div className="flex items-center gap-2">
                                    <select
                                        id="pageSize"
                                        className="border p-1 text-sm  rounded"
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            table.setPageSize(Number(e.target.value));
                                        }}
                                    >
                                        {[10, 25, 50, 100].map(size => (
                                            <option key={size} value={size} className='text-black'>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label htmlFor="search" className="text-sm">Search:</label>
                                    <input
                                        id="search"
                                        type="search"
                                        className="border p-1 text-sm rounded"
                                        placeholder=""
                                        value={globalFilter ?? ''}
                                        onChange={(e) => setGlobalFilter(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <table className="min-w-full text-sm ">
                                <thead className="text-white">
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-2 ">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map(row => (
                                            <tr key={row.id} className="text-white">
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id} className="p-2 ">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} className="p-4 text-center text-white">
                                                No data available in table
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-4 px-4 pb-4">
                                <div className="text-sm text-white">
                                    Showing {table.getRowModel().rows.length} of {data.length} entries
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-2 py-1 rounded  text-white"
                                        onClick={() => table.setPageIndex(0)}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        «
                                    </button>
                                    <button
                                        className="px-2 py-1  rounded  text-white"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="px-2 py-1 rounded  text-white"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        ›
                                    </button>
                                    <button
                                        className="px-2 py-1  rounded  text-white"
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

        </>
    );
}