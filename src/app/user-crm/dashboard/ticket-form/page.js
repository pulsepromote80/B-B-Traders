'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { categories } from '@/app/constants/constant';

export default function TicketForm() {
  const [formData, setFormData] = useState({
    LoginId: '',
    Name: '',
    HdnLoginId: '',
    CategoryId: '',
    Subject: '',
    Message: '',
  });

  useEffect(() => {
    const storedData = Cookies.get("data")
    const data = JSON.parse(storedData)

    setFormData(prev => ({
      ...prev,
      LoginId: data.LoginID,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., POST to API)
    alert('Ticket submitted successfully!');
  };

  return (
    <div className="w-full px-4">
      <div className="bg-white shadow-lg rounded-2xl mb-6  px-4 py-2 border border-gray-200">
        <div className="border-b  mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Generate Ticket</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <label className="block font-semibold mb-2">From:</label>
                <input
                  type="text"
                  name="LoginId"
                  value={formData.LoginId}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none"
                />
                <input type="hidden" name="Name" value={formData.Name} />
                <input type="hidden" name="HdnLoginId" value={formData.HdnLoginId} />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2">Category:</label>
                <select
                  name="CategoryId"
                  value={formData.CategoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className='bg-[#051330] text-white '>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2">Subject:</label>
                <input
                  type="text"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                />
              </div>
            </div>

            <div>
              <div className="mb-6 h-full">
                <label className="block font-semibold mb-2">Message:</label>
                <textarea
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  rows={10}
                  maxLength={500}
                  className="w-full px-4 py-2 border rounded-md h-44 focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            {/* <p className="text-sm font-semibold text-gray-600 mb-2">
              Thank you for reaching out to us. Your request has been received, and a support ticket has been created. Our team will review it and respond personally within 24 hours.
            </p> */}
            {/* Display errors/messages here */}
            <span className="text-red-500 text-sm block" id="form-error-message"></span>
          </div>

          <div className="flex justify-center my-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
