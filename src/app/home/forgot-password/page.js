"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/app/redux/slices/authSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [loginId, setLoginId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginId) {
      setModalMessage("Please Enter UserId.");
      setShowModal(true);
      return false;
    }

    const data = {
      loginId: loginId
    }
    const result = await dispatch(forgotPassword(data)).unwrap();
    if(result.statusCode === 200){
      setModalMessage("Password sent on your registered Email ID.");
      setShowModal(true);
    }else{
      setModalMessage("Email not sent.");
      setShowModal(true);
    }
  };

  return (
    <>
      <div onContextMenu={(e) => e.preventDefault()}>
        {/* Modal 1 */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer bg-opcaity-modal" 
            onClick={() => setShowModal(false)}
          >
            <div className="w-full max-w-sm p-6 mx-4 bg-white rounded-lg mb-70">
              <div className="flex justify-center mb-4">
                 <div className="mx-auto -mt-16 w-24 h-24 rounded-full bg-[#0d0d0c] flex items-center justify-center border-4 border-black shadow-lg">
                  <img src="/favicon.webp" className="w-full p-4" alt="Logo" />
                </div>
              </div>
              <div className="mt-8 mb-6 text-center">
                <p className="text-xl text-black">{modalMessage}</p>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-[#223078] text-white px-8 py-2 rounded w-56 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2 */}
        {showModal2 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
            onClick={() => setShowModal2(false)}
          >
            <div className="w-full max-w-sm p-6 mx-4 bg-white rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-24 h-24 bg-black border-4 border-black rounded-full shadow-sm">
                  <img src="/logo.webp" alt="Logo" className="w-3/4" />
                </div>
              </div>
              <div className="mt-8 mb-6 text-center">
                <p id="jhbvjv" className="text-xl text-black"></p>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-[#06976d] text-white px-8 py-2 rounded w-56"
                  onClick={() => setShowModal2(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className="flex items-center justify-center min-h-screen p-4 bg-gray-100"
          style={{
            backgroundImage: "url('/login-banner1.webp')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-start mb-6">
                <img src="/logo.webp" alt="Logo" className="h-20" />
              </div>

              <div className="space-y-2">
                <label className="block text-black">Username</label>
                <input
                  type="text"
                  id="loginid"
                  name="loginid"
                  placeholder="Enter Userid"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3b9a41] text-white py-2 px-4 rounded hover:bg-[#c9332f] cursor-pointer  transition"
              >
                Send Me Email
              </button>

              <p className="text-center ">
                Don't have an account?{" "}
                <a href="/home/register" className="ml-2  hover:underline">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
