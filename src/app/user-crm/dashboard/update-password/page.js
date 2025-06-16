"use client"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }


  };

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md border-1">
        <h1 className="text-xl font-bold mb-4">Create Your Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Current Password:
            </label>
            <input
              type="password"
              placeholder="Enter Previous Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              New Password:
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Confirm New Password:
            </label>
            <input
              type="password"
              placeholder="Enter Re-Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
