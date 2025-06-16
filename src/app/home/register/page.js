"use client";
import { useState, useEffect } from "react";
import { getRefreralIdByUserEmail } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { countries } from "@/app/constants/constant";
import { sendOtp } from "@/app/redux/slices/authSlice";
import { userRegistration } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Registration() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    ReferralId: "",
    SponserName: "",
    CountryId: "",
    CountryCode: "",
    Name: "",
    Mobile: "",
    EmailId: "",
    OTP: "",
    checkbox1: true,
  });

  useEffect(() => {
    setMounted(true);
    const urlParams = new URLSearchParams(window.location.search);
    let ref = urlParams.get("REF") || "";

    if (ref.includes("~")) {
      const myArray = ref.split("~");
      ref = myArray[0];
    }

    if (ref) {
      setFormData((prev) => ({ ...prev, ReferralId: ref }));
      fnCheckSponserName(ref);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "ReferralId") {
      try {
        const response = await dispatch(
          getRefreralIdByUserEmail(value)
        ).unwrap();

        if (
          response.statusCode === 200 &&
          response.data &&
          response.data.length > 0
        ) {
          setFormData((prev) => ({
            ...prev,
            SponserName: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Error fetching referral data:", error);
      }
    }
  };
  const fnHideModelPopup = () => {
    setShowModal(false);
  };

  const fnSendOtpRegistration = async () => {
    if (!formData.EmailId) {
      setModalMessage("Please Enter Email.");
      setShowModal(true);
      return;
    }

    try {
      const data = {
        email: formData.EmailId,
      };

      const response = await dispatch(sendOtp(data)).unwrap();

      if (response.statusCode === 200) {
        setFormData((prev) => ({
          ...prev,
          OTP: response.data.otp,
        }));
        setModalMessage(response.message);
        setShowModal(true);
      } else {
        setModalMessage(response.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ReferralId, CountryId, Name, Mobile, EmailId, checkbox1 } =
      formData;
    const reEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!ReferralId) {
      setModalMessage("Enter referral ID.");
      setShowModal(true);
      return false;
    }

    if (!CountryId) {
      setModalMessage("Please Select Country.");
      setShowModal(true);
      return false;
    }

    if (!Name) {
      setModalMessage("Please Enter Name.");
      setShowModal(true);
      return false;
    }

    if (!Mobile) {
      setModalMessage("Please Enter Mobile.");
      setShowModal(true);
      return false;
    }

    if (!EmailId) {
      setModalMessage("Please Enter Email.");
      setShowModal(true);
      return false;
    }

    if (!reEmail.test(EmailId)) {
      setModalMessage("Please Enter a valid Email.");
      setShowModal(true);
      return false;
    }

    if (!checkbox1) {
      setModalMessage("Please Accept the Terms and Conditions.");
      setShowModal(true);
      return false;
    }

    const data = {
      username: formData.Name,
      password: formData.password,
      name: formData.Name,
      email: formData.EmailId,
      phoneNumber: formData.Mobile,
      dob: "2025-06-09T09:38:14.584Z",
      address: "Noida",
      countryId: 0,
      stateId: 0,
      cityId: 0,
      promocode: "",
      introRegNo: 0,
      introSide: "",
      otp: "",
      image: "",
      kycStatus: 0,
      cityName: "",
      countryName: "India",
      stateName: "Uttar pradesh",
      authToken: "",
      walletAdressBep20: "",
    };

    const response = await dispatch(userRegistration(data)).unwrap();
    if (response.statusCode === 200) {
      router.push("/home/welcome-letter");
      setFormData({
        ReferralId: "",
        SponserName: "",
        CountryId: "",
        CountryCode: "",
        Name: "",
        Mobile: "",
        EmailId: "",
        OTP: "",
        checkbox1: true,
      });
    } else {
      setModalMessage(
        response.message || "Registration failed. Please try again."
      );
      setShowModal(true);
    }
  };
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: "url('/login-banner1.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center z-1 justify-center cursor-pointer  bg-opcaity-modal"
            onClick={fnHideModelPopup}
          >
            <div className="bg-white rounded-lg max-w-sm w-full mx-4 mb-70">
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

        <div className="w-full max-w-[530px] mx-4 p-4">
          <form
            className="bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="text-start mb-6">
              <img src="/logo.webp" alt="B&B Traders" className=" h-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="ReferralId"
                  maxLength={12}
                  value={formData.ReferralId}
                  onChange={handleChange}
                  placeholder="Enter Referral Id"
                />
              </div>
              <div>
                <input
                  className="w-full p-3 rounded-md bg-gray-100 focus:outline-none "
                  name="SponserName"
                  value={formData.SponserName}
                  readOnly
                  placeholder="Sponsor Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <select
                  className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="CountryId"
                  value={formData.CountryId}
                  onChange={(e) => {
                    handleChange(e);
                    const selectedCountry = countries.find(
                      (country) => country.value === e.target.value
                    );
                    setFormData((prev) => ({
                      ...prev,
                      CountryId: e.target.value,
                      CountryCode: selectedCountry ? selectedCountry.code : "",
                    }));
                  }}
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="w-full p-3 rounded-md bg-gray-100 focus:outline-none"
                  name="CountryCode"
                  value={formData.CountryCode}
                  readOnly
                  placeholder="Country Code"
                />
              </div>
            </div>

            <div className="mt-3">
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Name"
                maxLength={100}
                value={formData.Name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Mobile"
                  maxLength={10}
                  value={formData.Mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, Mobile: value }));
                  }}
                  placeholder="Enter Mobile No."
                />
              </div>
              <div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="EmailId"
                  maxLength={100}
                  value={formData.EmailId}
                  onChange={handleChange}
                  placeholder="Enter Email Id."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="OTP"
                  maxLength={6}
                  value={formData.OTP}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={fnSendOtpRegistration}
                  className="w-full p-3 rounded-md cursor-pointer  border-1"
                >
                  Send OTP
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkbox1}
                onChange={handleChange}
                className="w-5 h-5 mr-2"
              />
              <label htmlFor="checkbox1" className="text-gray-800">
                I agree to B&B Traders Website Terms of Use & Privacy Policy.
              </label>
            </div>
            <button
              type="submit"
              className="w-full mt-3 p-3 bg-[#3b9a41] cursor-pointer hover:bg-[#c9332f] text-white rounded-md"
            >
              Register
            </button>

            <p className="text-center mt-3 text-gray-800">
              Already a member? <br></br>
              <a href="/" className=" font-semibold hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
