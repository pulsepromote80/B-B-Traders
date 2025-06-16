"use client"

import { useState, useEffect } from 'react';
import { updateUserProfile } from '@/app/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { sendOtp } from '@/app/redux/slices/authSlice';
import Cookies from 'js-cookie';

export default function UpdateProfileForm() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    country: '',
    email: '',
    contactNumber: '',
    bep20Wallet: '',
    trc20Wallet: '',
    otp: ''
  });
 
  useEffect(() => {
    const storedData = Cookies.get("data")
    const data = JSON.parse(storedData)

    setFormData(prev => ({
      ...prev,
      username: data.LoginID,
      fullName: data.Name,
      country: data.CountryName,
      email: data.Email,
      contactNumber: data.Mobile,
      bep20Wallet: formData.bep20Wallet,
      trc20Wallet: formData.trc20Wallet,
    }));
  }, []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await dispatch(sendOtp({ email: formData.email })).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        setModalMessage(response.message)
        setShowModal(true)
      }
      setFormData(prev => ({
        ...prev,
        otp: response.data.otp
      }));
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        loginID: formData.username,
        name: formData.fullName,
        mobile: formData.contactNumber,
        cityName: formData.country,
        walletAdressBep20: formData.bep20Wallet,
      }

      console.log(data)
      const result = await dispatch(updateUserProfile(data)).unwrap();
      if (result.statusCode === 200) {
        setModalMessage(result.message)
        setShowModal(true)
      }
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fnHideModelPopup = () => {
    setShowModal(false);
  };

  return (
    <>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center z-1 justify-center cursor-pointer"
          onClick={fnHideModelPopup}
        >
          <div className="bg-white rounded-lg max-w-sm w-full mx-4">
            <div className="p-6 text-center">
              <div className="mx-auto -mt-16 w-24 h-24 rounded-full bg-[#0d0d0c] flex items-center justify-center border-4 border-black shadow-lg">
                <img src="/favicon.webp" className="w-full p-4" alt="Logo" />
              </div>
              <div className="mt-6">
                <p className="text-xl text-black">{modalMessage}</p>
              </div>
              <div className="mt-6">
                <button
                  className="bg-[#663399] text-white px-8 py-2  cursor-pointer rounded-md w-56 mx-auto"
                  onClick={fnHideModelPopup}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className=" mx-4 bg-white shadow rounded-lg py-6 border ">
        <h2 className="text-lg font-semibold mb-6 border-b pb-2 px-6">Update Correct Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-3"
              required
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">BEP20 USDT Wallet (Binance Smart Chain)</label>
            <input
              type="text"
              name="bep20Wallet"
              value={formData.bep20Wallet}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">TRC20 USDT Wallet</label>
            <input
              type="text"
              name="trc20Wallet"
              value={formData.trc20Wallet}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">OTP (Sent on Email)</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="flex mt-6 gap-3 px-4">
          <button
            type="submit"
            className={`bg-[#e6a114] text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600 cursor-pointer`}
          >
            UPDATE
          </button>
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || formData.otp}
            className={`bg-[#e6a114] text-black border-1 cursor-pointer px-4 py-2 rounded  hover:bg-yellow-200`}
          >
            Send OTP
          </button>
        </div>
      </form>
    </>
  );
}
