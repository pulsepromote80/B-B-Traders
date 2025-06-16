'use client';
import { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getFilteredRowModel,
} from '@tanstack/react-table';

const P2PTransfer = () => {
    const [balance, setBalance] = useState('400000.00');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [otp, setOtp] = useState('');
    const [globalFilter, setGlobalFilter] = useState('');

    // Sample data - replace with your actual data
    const data = [];

    const columns = useMemo(
        () => [
            {
                header: 'S.No.',
                accessorKey: 'id',
            },
            {
                header: 'Trans. Date',
                accessorKey: 'transDate',
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
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
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    const fnCheckSponserName = () => {
        // Implement your logic here
        console.log('Checking sponsor name');
    };

    const limitInputLength = (input, maxLength) => {
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }
    };

    const validatenumerics = (event) => {
        // Implement numeric validation
        return true;
    };

    const fnForTransferFund = () => {
        // Implement transfer fund logic
        console.log('Transferring funds');
    };

    const fnSendOTPTrading = () => {
        // Implement OTP sending logic
        console.log('Sending OTP');
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="w-full max-w-6xl p-4 ">
                <div className="bg-white rounded-lg shadow border-gray-500 border-1 ">
                    <div className="p-4 border-b">
                        <h6 className="text-lg ">
                            Topup Wallet Balance: $
                            <span id="lblBalnce" className="font-bold">
                                {balance}
                            </span>
                        </h6>
                    </div>
                    <div className="p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <input
                                    id="UserId"
                                    name="UserId"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                    onKeyUp={fnCheckSponserName}
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                        fnCheckSponserName();
                                    }}
                                    placeholder="Enter Userid"
                                    type="text"
                                    value={userId}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="Name"
                                    name="Name"
                                    placeholder="Name"
                                    type="text"
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                    value={name}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="Amount"
                                    name="Amount"
                                    onInput={(e) => limitInputLength(e.target, 8)}
                                    placeholder="Enter Amount"
                                    onKeyPress={validatenumerics}
                                    type="number"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="OTP"
                                    type="number"
                                    name="OTP"
                                    maxLength="6"
                                    placeholder="Enter OTP"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="form-group flex space-x-4">
                                    <button
                                        id="btnTransfer"
                                        className="px-4 py-2 bg-[#e6a114] text-white rounded "
                                        onClick={fnForTransferFund}
                                    >
                                        Transfer
                                    </button>
                                    <button
                                        id="lnkresend"
                                        className="px-4 py-2 bg-[#6446d7] text-white rounded"
                                        onClick={fnSendOTPTrading}
                                    >
                                        Send OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className='bg-white p-6 pb-10 mx-4 border-gray-500 border-1 rounded-lg'>
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
                                            No data available in table
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
                                className="px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                «
                            </button>
                            <button
                                className="px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
                                className="px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                ›
                            </button>
                            <button
                                className="px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
    );
};

export default P2PTransfer;