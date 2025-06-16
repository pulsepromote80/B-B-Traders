"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserKycByLoginId } from '@/app/redux/slices/authSlice';
import Cookies from 'js-cookie';

const Kyc = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    accountNo: '',
    ifscCode: '',
    bankName: '',
    otp: ''
  });

  useEffect(() => {
    const fetchKycData = async () => {
      try {
        const storedData = Cookies.get("data");
        const data = JSON.parse(storedData);
        const loginId = data.LoginID;

        const response = await dispatch(getUserKycByLoginId(loginId)).unwrap();
        if (response.statusCode === 200 && response.data) {
          setFormData({
            name: response.data.name || 'N/A',
            accountNo: response.data.accountNo || 'N/A',
            ifscCode: response.data.ifscCode || 'N/A',
            bankName: response.data.bankName || 'N/A',
            otp: ''
          });
        }
      } catch (error) {
        console.error('Error fetching KYC data:', error);
      }
    };

    fetchKycData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 mx-4 mt-10 bg-white border rounded-md shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account Holder Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>

        {/* Branch Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>

        {/* OTP */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Enter OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-6 space-x-4">
        <button className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
          Update
        </button>
        <button className="px-6 py-2 text-black bg-yellow-300 rounded-md hover:bg-yellow-400">
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Kyc;
