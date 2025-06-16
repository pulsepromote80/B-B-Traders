"use client"

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

    export default function WelcomeLetter() {
    const router = useRouter();

    const data = useSelector((state) => state.auth.userData);
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-4 px-4" style={{
            backgroundImage: "url('/login-banner1.webp')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
            <div className="bg-white rounded-2xl shadow-lg  max-w-[530px] mr-8  w-full text-center p-7">
                {/* Logo */}
                <div className="text-4xl font-extrabold mb-4 text-left">
                    <a href="#">
                        <img src="/logo.webp" alt="Logo" className="h-22" />
                    </a>
                </div>

                
                <h2 className="text-xl font-semibold mb-2">Welcome to B&B Traders</h2>
                <p className="text-gray-700 mb-6 text-sm">
                    We're excited to have you join our community. Earn rewards and bonuses by referring friends and family.
                    Share the opportunity and watch your network grow. Our team is here to support you every step of the way.
                    Let's grow together.
                </p>

               
                <div className="text-left mb-6">
                    <h3 className="text-lg font-semibold mb-2">Sign Into Your Account</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="font-bold">Name</div>
                        <div className="col-span-2">Ajay</div>
                        <div className="font-bold">User Id</div>
                        <div className="col-span-2">BB5359547</div>
                        <div className="font-bold">Password</div>
                        <div className="col-span-2">7178924</div>
                    </div>
                </div>

                
                <p className="text-gray-700 text-sm mb-6">
                    Congratulations! Your account has been successfully created. Check your inbox for an email that includes your login details. Make sure to store this email in a secure place. We appreciate your registration!
                </p>

               
                <button className="bg-green-600 text-white py-2 px-6 w-full hover:bg-[#c9332f] underline decoration-transparent hover:decoration-black transition cursor-pointer rounded  font-bold tracking-wide" onClick={() => router.push('/login')}>
                    SIGN IN
                </button>

               
                <p className="mt-4 text-black font-semibold">B&B TRADERS AFTER RESET PASSWORD!</p>
            </div>
        </div>
    );
}
