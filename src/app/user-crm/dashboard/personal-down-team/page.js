'use client';
import React from 'react';
import UserTable from '../user-Table/page';

export default function PersonalDownTeamForm() {
  const fnchangeIncomeType = () => {
    // Implement your onchange logic here
    console.log('Status changed');
  };

  const fnValidate = () => {
    // Implement your validation logic here
    console.log('Form submitted');
    // Return false to prevent actual submission
    return false;
  };

  return (
    <>
    <div className="w-full px-4 max-w-full overflow-x-hidden ">
      <div className="bg-white shadow-md border-1 rounded-lg p-4 mb-8 border ">
        <div className="border-b pb-2 mb-4">
          <h6 className="text-lg font-semibold">Personal Down Team</h6>
        </div>
        <form method="post" className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            {/* Hidden Fields */}
            <div className="hidden w-1/2 px-2">
              <label className="block font-semibold mb-1">Superlative%:</label>
              <select
                id="ID"
                name="ID"
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Superlative%</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="hidden w-1/2 px-2">
              <label className="block font-semibold mb-1">Recognition:</label>
              <select
                id="hwRank"
                name="hwRank"
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Recognition</option>
                {[
                  'Silver', 'Gold', 'Platinum', 'Ruby', 'Sapphire',
                  'Emerald', 'Diamond', 'Crown', 'LBT9'
                ].map((rank, idx) => (
                  <option key={idx + 1} value={idx + 1}>{rank}</option>
                ))}
              </select>
            </div>

            {/* Depth */}
            <div className="w-1/4 px-2">
              <label className="block font-semibold mb-1">Depth:</label>
              <select
                id="Level"
                name="Level"
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Level</option>
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="w-1/4 px-2">
              <label className="block font-semibold mb-1">Select Status:</label>
              <select
                id="ddlstatus"
                name="ddlstatus"
                onChange={fnchangeIncomeType}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-Select Status-</option>
                <option value="1">Active (Customer)</option>
                <option value="5">Registered</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="w-1/4 px-2 flex items-end">
              <button
                onClick={fnValidate}
                type="submit"
                className="bg-[#eab23e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded max-w-sm"
              >
                Search
              </button>
            </div>
          </div>

          {/* Hidden Token */}
          <input
            name="__RequestVerificationToken"
            type="hidden"
            value="CfDJ8ILotT1nd4pKtt8nbEgJbB2XIVMwRK2XdIMjyUrw_lieLZAhKdSpvqix--ZrLm1v0oBbm9BAs9ZEPj-0JEDo8tIh9wpn2qEGE8W2BYkPorLxHbsy_do18kki3Q2mem1rbMp7cUs_f1j1jR2CVWm-fE4"
          />
        </form>
      </div>
    </div>

    {/* Table  */}
    <UserTable />
    </>
  );
}
