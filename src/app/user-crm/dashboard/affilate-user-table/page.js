'use client';
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import styles from './styles.module.css';

const AffiliateUserTable = ({ data = [] }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const tableData = React.useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        header: 'S.No.',
        accessorKey: 'sNo',
      },
      {
        header: 'Userid',
        accessorKey: 'userId',
        cell: ({ row }) => (
          <a
            href={`/UserCRM/DirectMember?id=${row.original.userId}`}
            className="btn btn-primary btn-sm"
            onClick={() => btnDirectlist()}
          >
            {row.original.userId}
          </a>
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Reg. Date',
        accessorKey: 'regDate',
      },
      {
        header: 'Act. Date',
        accessorKey: 'actDate',
      },
      {
        header: 'Trading Fund',
        accessorKey: 'tradingFund',
      },
      {
        header: 'Team Business',
        accessorKey: 'teamBusiness',
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="col-xl-12 col-lg-12 mx-4 ">
      <div className={`${styles.card} ${styles.glowing} m-b30 mb-3`}>
        <div className={styles['card-header']}>
          <h4 className={styles['card-title']}>Affiliate User</h4>
        </div>
        <div className="card-body" style={{ padding: '15px' }}>
          <div className="table-responsive ">
            <div className="dt-container dt-empty-footer">
              {/* Table Controls */}
              <div className="dt-layout-row flex justify-between items-center mb-4">
                <div className="dt-layout-cell dt-layout-start">
                  <div className="dt-length flex items-center">
                    <select
                      className={styles['dt-input']}
                      value={pageSize}
                      onChange={e => setPageSize(Number(e.target.value))}
                    >
                      {[10, 25, 50, 100].map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <label className="ml-2"> entries per page</label>
                  </div>
                </div>
                <div className="dt-layout-cell dt-layout-end">
                  <div className="dt-search">
                    <label htmlFor="dt-search-0" className="mr-2">Search:</label>
                    <input
                      type="search"
                      className={styles['dt-input']}
                      value={globalFilter}
                      onChange={e => setGlobalFilter(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="dt-layout-row dt-layout-table">
                <div className="dt-layout-cell dt-layout-full">
                  <table className={`${styles.table} ${styles['table-striped']} ${styles['table-borderable-hover']}`}>
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
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
                      {table.getRowModel().rows.length === 0 ? (
                        <tr>
                          <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                            No data available
                          </td>
                        </tr>
                      ) : (
                        table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className={styles.input_noborder}>
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className="px-4 py-2 whitespace-nowrap text-sm text-center"
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="dt-layout-row flex justify-between items-center mt-4">
                <div className="dt-layout-cell dt-layout-start">
                  <div className="dt-info">
                    Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
                    {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, table.getFilteredRowModel().rows.length)}{' '}
                    of {table.getFilteredRowModel().rows.length} entries
                  </div>
                </div>
                <div className="dt-layout-cell dt-layout-end">
                  <div className="dt-paging">
                    <nav className="flex items-center gap-2">
                      <button
                        className={`${styles['dt-paging-button']} ${!table.getCanPreviousPage() ? styles.disabled : ''}`}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        «
                      </button>
                      <button
                        className={`${styles['dt-paging-button']} ${!table.getCanPreviousPage() ? styles.disabled : ''}`}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        ‹
                      </button>
                      <button className={`${styles['dt-paging-button']} ${styles.current}`}>
                        {table.getState().pagination.pageIndex + 1}
                      </button>
                      <button
                        className={`${styles['dt-paging-button']} ${!table.getCanNextPage() ? styles.disabled : ''}`}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        ›
                      </button>
                      <button
                        className={`${styles['dt-paging-button']} ${!table.getCanNextPage() ? styles.disabled : ''}`}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                      >
                        »
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateUserTable;
