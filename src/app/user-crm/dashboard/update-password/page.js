"use client";
import { getUserId } from "@/app/api/auth";
import { updatePassword } from "@/app/redux/slices/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdatePassword = () => {
  const [userInput, setUserInput] = useState({
    currentpassword: "",
    password: "",
    confirmpassword: "",
  });

  const [modal, setModal] = useState({
    show: false,
    message: "",
  });

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const passwordMatch = () =>
    userInput.password && userInput.password === userInput.confirmpassword;

  const hideModal = () => {
    setModal({ show: false, message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  let errors = "";

  if (!userInput.currentpassword) {
    errors = "Please enter current password.";
  } else if (!userInput.password) {
    errors = "Please enter new password.";
  } else if (!userInput.confirmpassword) {
    errors = "Please confirm your new password.";
  } else if (!passwordMatch()) {
    errors = "Passwords do not match.";
  }

  if (errors) {
    setModal({ show: true, message: errors });
    return;
  }

  const userId = getUserId();
  if (!userId) {
    setModal({ show: true, message: "User not logged in or UserId missing." });
    return;
  }

  const payload = {
    userId,
    oldPassword: userInput.currentpassword,
    newPass: userInput.password,
  };

  try {
    const result = await dispatch(updatePassword(payload)).unwrap();

    if (result.statusCode === 200) {
      setUserInput({ currentpassword: "", password: "", confirmpassword: "" });
      setModal({ show: true, message: "Password updated successfully." });
    } else if (result.statusCode === 409) {
      setModal({ show: true, message: result.message });
    } else {
      setModal({ show: true, message: "Failed to update password." });
    }

  } catch (err) {
    console.error("Update failed", err);
    setModal({
      show: true,
      message: err.message || "An error occurred while updating the password.",
    });
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
              name="currentpassword"
              placeholder="Enter Current Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={userInput.currentpassword}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">New Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter New Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={userInput.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm New Password"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              value={userInput.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Modal */}
      {modal.show && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
          onClick={hideModal}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full mx-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="mx-auto -mt-20 w-24 h-24 rounded-full bg-[#0d0d0c] flex items-center justify-center border-4 border-black shadow-lg">
                <img src="/favicon.webp" className="w-full p-4" alt="Logo" />
              </div>
              <div className="mt-6">
                <p className="text-xl text-black">{modal.message}</p>
              </div>
              <div className="mt-6">
                <button
                  className="bg-[#663399] text-white px-8 py-2 rounded-md w-56 mx-auto"
                  onClick={hideModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
