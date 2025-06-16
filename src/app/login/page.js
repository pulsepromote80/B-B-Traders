"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { appLogin } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState({
    userid: "",
    password: "",
    captchaInput: "",
    rememberMe: false,
  });
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });

  // Only run after component mounts on client
  useEffect(() => {
    setMounted(true);
    // Generate random captcha code
    const a = Math.ceil(Math.random() * 9) + "";
    const b = Math.ceil(Math.random() * 9) + "";
    const c = Math.ceil(Math.random() * 9) + "";
    const d = Math.ceil(Math.random() * 9) + "";
    const e = Math.ceil(Math.random() * 9) + "";
    const code = a + b + c + d + e;
    setCaptcha(code);
  }, []);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

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

  const validCaptcha = () => {
    return userInput.captchaInput === captcha;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = "";

    if (!userInput.userid) {
      errors = "Please Enter User Id";
    } else if (!userInput.password) {
      errors = "Please Enter Password.";
    } else if (!userInput.captchaInput) {
      errors = "Please Enter Captcha Code.";
    } else if (!validCaptcha()) {
      errors = "The CAPTCHA Code Does Not Match.";
    }

    if (errors) {
      setModal({
        show: true,
        message: errors,
      });
      return false;
    }

    const data = {
      username: userInput.userid,
      password: userInput.password,
    };
    
    const result = await dispatch(appLogin(data)).unwrap();
    if (result.statusCode === 200) {
      router.push("/user-crm")
    }else if(result.statusCode === 409){
       setModal({
        show: true,
        message: result.message,
      });
    }
  };

  const hideModal = () => {
    setModal({
      show: false,
      message: "",
    });
  };

  return (
    <>
      {/* Modal */}
      {modal.show && (
        <div
          className="fixed inset-0 flex items-center z-50 justify-center cursor-pointer bg-opcaity-modal"
          onClick={hideModal}
        >
          <div className="bg-white rounded-lg max-w-sm w-full mx-4 mb-70">
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
        className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage: "url('/login-banner1.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-[530px] mx-4 bg-white rounded-3xl shadow-lg px-10 py-10">
          <form onSubmit={handleSubmit} className="space-y-[22px]">
            <div className="flex justify-start">
              <a href="#">
                <img src="/logo.webp" alt="Logo" className="h-22" />
              </a>
            </div>

            <div>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="userid"
                placeholder="Enter UserId"
                type="text"
                value={userInput.userid}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                value={userInput.password}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-end">
              <div className="md:col-span-4">
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="captchaInput"
                  value={userInput.captchaInput}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-3">
                <div
                  className="font-bold py-2  px-4 flex items-center justify-center text-xl rounded border border-gray-300 bg-transparent text-black select-none"
                >
                  {captcha}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="w-6 h-6 mr-2"
                  type="checkbox"
                  name="rememberMe"
                  checked={userInput.rememberMe}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-black whitespace-nowrap"
                >
                  Remember me
                </label>
              </div>
              <a href="/home/forgot-password" className="text-black ">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b9a41] text-white py-2 cursor-pointer rounded-md hover:bg-[#c9332f] transition duration-200"
            >
              Sign In
            </button>

            <div className="text-black text-center">
              Don't have an account yet? <br></br>
              <a
                href="/home/register"
                className="font-bold text-black hover:underline"
              >
                Register Now
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
