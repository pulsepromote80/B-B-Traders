"use client"
import { useState } from 'react';
import TicketSupport from './ticket-support/page';

export default function TicketHistory() {
  const [showTicketSupport, setShowTicketSupport] = useState(false);

  if (showTicketSupport) {
    return <TicketSupport onBack={() => setShowTicketSupport(false)} />;
  }

  return (
    <div className="w-full px-4">
      <div className="bg-white border-1 rounded-lg shadow-md py-2 pb-6">
        <div className="border-b pb-2 mb-4">
          <h4 className="text-md ml-4">Ticket Detail</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 px-4">
          <div className="md:col-span-8">
            <div className="border-1 shadow-sm rounded-lg max-w-xl">
              <div className="mb-4 border-b pb-3">
                <h6 className="text-lg font-medium ml-4">Your Details</h6>
              </div>
              <div className="relative px-4">
                {/* Vertical line */}
                <div className="absolute left-[120px] top-2 bottom-2  "></div>
                <ul className="space-y-6 relative">
                  <li className="flex items-center">
                    <p className="w-[100px]">Ticket ID</p>
                    <div className="relative">
                      <span className="w-3 h-3 rounded-full bg-blue-500 absolute left-4 top-1/2 -translate-y-1/2 z-10"></span>
                    </div>
                    <h2 className="ml-12">B6622786646</h2>
                  </li>
                  <li className="flex items-center">
                    <p className="w-[100px]">Category</p>
                    <div className="relative">
                      <span className="w-3 h-3 rounded-full bg-green-500 absolute left-4 top-1/2 -translate-y-1/2 z-10"></span>
                    </div>
                    <h2 className="ml-12">Edit Profile</h2>
                  </li>
                  <li className="flex items-center">
                    <p className="w-[100px]">Date</p>
                    <div className="relative">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 absolute left-4 top-1/2 -translate-y-1/2 z-10"></span>
                    </div>
                    <h2 className="ml-12">04/06/2025</h2>
                  </li>
                  <li className="flex items-center">
                    <p className="w-[100px]">Subject</p>
                    <div className="relative">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 absolute left-4 top-1/2 -translate-y-1/2 z-10"></span>
                    </div>
                    <h2 className="ml-12">plese change my contact no</h2>
                  </li>
                  <li className="flex items-center pb-6">
                    <p className="w-[100px]">Action</p>
                    <div className="relative">
                      <span className="w-3 h-3 rounded-full bg-blue-500 absolute left-4 top-1/2 -translate-y-1/2 z-10"></span>
                    </div>
                    <h2 className="ml-12">
                      <button
                        onClick={() => setShowTicketSupport(true)}
                        className="bg-[#6446d7] px-4 py-2 rounded text-white cursor-pointer"
                      >
                        View
                      </button>
                    </h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
