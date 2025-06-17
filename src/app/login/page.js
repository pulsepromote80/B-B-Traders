"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaKey } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { appLogin } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { numberWords } from "@/app/utils/clientUtils";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    userid: "",
    password: "",
    rememberMe: false,
    captcha: "",
  });
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });
  const [captchaValue, setCaptchaValue] = useState("");
  const [audioCaptcha, setAudioCaptcha] = useState(null);

  const generateCaptcha = () => {
    const chars = "0123456789";
    let captcha = "";
    for (let i = 0; i < 4; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(captcha);
    generateAudioCaptcha(captcha);
  };

  const generateAudioCaptcha = (captcha) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    const spokenText = captcha.split("").map((d) => numberWords[d]).join(" ");
    utterance.text = spokenText;
    utterance.rate = 0.8;
    utterance.pitch = 1;

    setAudioCaptcha({ utterance, speechSynthesis });
  };

  const playAudioCaptcha = () => {
    if (!audioCaptcha) return;
    const { utterance, speechSynthesis } = audioCaptcha;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setMounted(true);
    generateCaptcha();
  }, []);

  if (!mounted) return null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = "";

    if (!userInput.userid) {
      errors = "Please Enter User Id";
    } else if (!userInput.password) {
      errors = "Please Enter Password.";
    } else if (userInput.captcha !== captchaValue) {
      errors = "Please enter correct captcha.";
    }

    if (errors) {
      setModal({ show: true, message: errors });
      return false;
    }

    try {
      const data = {
        username: userInput.userid,
        password: userInput.password,
      };
      const result = await dispatch(appLogin(data)).unwrap();
      if (result.statusCode === 200) {
        router.push("/user-crm");
      } else if (result.statusCode === 409) {
        setModal({ show: true, message: result.message });
      }
    } catch {
      setModal({ show: true, message: "Login failed. Please try again." });
    }
  };

  const hideModal = () => {
    setModal({ show: false, message: "" });
  };

  return (
    <>
      {/* Modal */}
      {modal.show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer bg-opcaity-modal"
          onClick={hideModal}
        >
          <div className="w-full max-w-sm mx-4 bg-white rounded-lg mb-70 sm:max-w-md md:max-w-lg">
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

      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login-banner1.webp')" }}
      >

        <div className="w-full max-w-[530px] mx-4 bg-white rounded-3xl shadow-lg px-6 sm:px-8 md:px-10 py-8 sm:py-10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-[22px]">
            <div className="flex justify-start">
              <Link href="/">
                <Image src="/logo.webp" alt="Logo" width={150} height={150} />
              </Link>
            </div>

            <div className="relative">
              <FaEnvelope className="absolute text-blue-500 -translate-y-1/2 left-3 top-1/2" />
              <input
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="userid"
                placeholder="EMAIL or USERNAME"
                type="text"
                value={userInput.userid}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <FaKey className="absolute text-blue-500 -translate-y-1/2 left-3 top-1/2" />
              <input
                className="w-full px-4 py-3 pl-10 pr-10 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={userInput.password}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <FaEyeSlash
                    className="text-blue-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-blue-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <input
                className="flex-1 min-w-[140px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="captcha"
                placeholder="Enter Captcha"
                type="text"
                value={userInput.captcha}
                onChange={handleInputChange}
              />
              <div className="relative flex items-center justify-center w-28 h-10 sm:w-32 sm:h-12 bg-gray-100 rounded-md">
                <div className="absolute inset-0 bg-[url('/cross-pattern.svg')] opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-20"></div>
                <span className="text-2xl font-bold tracking-wider text-gray-800 relative z-10">
                  {captchaValue}
                </span>
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={playAudioCaptcha}
                className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                title="Play Audio Captcha"
              >
                🔊
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center">
                <input
                  className="w-6 h-6 mr-2"
                  type="checkbox"
                  name="rememberMe"
                  checked={userInput.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe" className="text-black whitespace-nowrap text-sm sm:text-base">
                  Remember me
                </label>
              </div>
              <Link href="/home/forgot-password" className="text-black text-sm sm:text-base">
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b9a41] text-white py-2 cursor-pointer rounded-md hover:bg-[#c9332f] transition duration-200"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-black sm:text-base">
              Don't have an account yet?
              <br />
              <Link
                href="/home/register"
                className="font-bold text-black hover:underline"
              >
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
