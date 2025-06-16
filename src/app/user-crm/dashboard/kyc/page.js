"use client"
import React from 'react';

const Kyc = () => {
  return (
    <div className=" mx-4 p-6 border rounded-md shadow-sm mt-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Holder Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Account Holder Name</label>
          <input
            type="text"
            defaultValue="Vikash"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Account Number</label>
          <input
            type="text"
            defaultValue="465464688888"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Branch Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Branch Name</label>
          <input
            type="text"
            defaultValue="SBI"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">IFSC Code</label>
          <input
            type="text"
            defaultValue="SBI0001123"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Bank Name</label>
          <input
            type="text"
            defaultValue="State Bank of india"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* OTP */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Enter OTP</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Update
        </button>
        <button className="bg-yellow-300 text-black px-6 py-2 rounded-md hover:bg-yellow-400">
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Kyc;
