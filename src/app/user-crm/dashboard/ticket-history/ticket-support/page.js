'use client';

import { FaList, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const SupportTicket = ({ onBack }) => {
    const [showReply, setShowReply] = useState(false);

    const showDiv = () => {
      setShowReply(true);
    };
  return (
    <>
    <div className="w-full px-4">
      <div className="bg-white shadow-md rounded-xl p-6 border-1">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FaArrowLeft /> Back to Ticket History
          </button>
          <Link href="/user-crm/dashboard/ticket-form">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#e6a114] text-white rounded-md transition-colors cursor-pointer">
              <FaList /> New Ticket
            </button>
          </Link>
        </div>

        <div className="space-y-4 text-[15px]">
          <div className="grid grid-cols-12">
            <div className="col-span-2 font-semibold">Ticket# :</div>
            <div className="col-span-10">B6622786646</div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 font-semibold">Category :</div>
            <div className="col-span-10">Edit Profile</div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 font-semibold">Subject :</div>
            <div className="col-span-10">plese change my contact no</div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 font-semibold">Message :</div>
            <div className="col-span-10">Change kar dena</div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 font-semibold">Date :</div>
            <div className="col-span-10">04/06/2025</div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap mt-4 px-4">
      {/* Question */}
      <div className="w-full md:w-1/2 px-2 mb-4 ">
        <div className="bg-white shadow-lg rounded-lg border-1">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h4 className="text-lg ">Question</h4>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody>
                  {/* Query 1 */}
                  <tr className="bg-[#1b3671]">
                    <td colSpan="2" className="text-white font-bold text-sm p-2">
                      Query At : 6/4/2025 3:53:42 PM
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-sm p-2">My Query</td>
                  </tr>
                  <tr className="bg-[#129a4d]">
                    <td className="text-white p-2">
                      hello sir,<br />
                      plese change my contact no:<br />
                      0011223344<br />
                      thnks
                    </td>
                  </tr>

                  {/* Query 2 */}
                  <tr className="bg-[#1b3671]">
                    <td colSpan="2" className="text-white font-bold text-sm p-2">
                      Query At : 6/4/2025 4:10:24 PM
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-sm p-2">My Query</td>
                  </tr>
                  <tr className="bg-[#129a4d]">
                    <td className="text-white p-2">hi</td>
                  </tr>

                  {/* Query 3 */}
                  <tr className="bg-[#1b3671]">
                    <td colSpan="2" className="text-white font-bold text-sm p-2">
                      Query At : 6/4/2025 8:48:51 PM
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-sm p-2">My Query</td>
                  </tr>
                  <tr className="bg-[#129a4d]">
                    <td className="text-white p-2">Change kar dena</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Reply Button */}
            {!showReply && (
              <div className="text-center mt-4">
                <button
                  className="bg-[#e6a114] text-white px-4 py-2 cursor-pointer rounded w-full"
                  onClick={showDiv}
                >
                  Reply
                </button>
              </div>
            )}

            {/* Reply Form */}
            {showReply && (
              <div className="mt-6">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full px-2 mb-4">
                    <textarea
                      placeholder="Enter Your Reply Here..."
                      className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                      maxLength="50"
                      required
                    ></textarea>
                  </div>
                  <div className="w-full md:w-auto px-2">
                    <button className="bg-[#e6a114] text-white px-4 py-2  cursor-pointer rounded w-full">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  Answer */}
      <div className="w-full md:w-1/2 px-2 mb-4">
        <div className="bg-white shadow-lg rounded-lg border-1">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h4 className="text-lg ">Answer</h4>
          </div>
          <div className="p-4">
            <table className="w-full text-sm text-left">
              <tbody>
                <tr>
                  <td colSpan="2" className="text-[#db7177] font-medium p-2">
                    Reply By Operator At - 6/4/2025 8:00:06 PM
                  </td>
                </tr>
                <tr>
                  <td className="font-bold p-2">Explanation :-</td>
                  <td className="text-[#db7177] p-2">hello</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SupportTicket;
