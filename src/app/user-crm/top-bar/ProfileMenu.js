"use client";
import { FaUserCircle, FaLifeRing, FaKey, FaSignOutAlt } from "react-icons/fa";
import { doLogout } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileMenu({ onClose }) {
  const router = useRouter();
  const handleLogout = () => {  
    doLogout();
    router.push("/login");
  };
  return (
    <div className="bg-gray-900 text-white w-56 rounded-lg p-4 space-y-4 shadow-lg">
      <h2 className="text-md  font-semibold">Welcome BB Traders</h2>

      <div className="flex items-center gap-3 cursor-pointer ">
        <FaUserCircle />
        <span>Trade Package</span>
      </div>

      <Link href="/user-crm/dashboard/ticket-form" className="flex items-center gap-3 cursor-pointer ">
        <FaLifeRing />
        <span>Support</span>
      </Link>

      <Link 
        href="/user-crm/dashboard/update-password" 
        className="flex items-center gap-3 cursor-pointer"
        onClick={onClose}
      >
        <FaKey />
        <span>Change Password</span>
      </Link>

      <div className="flex items-center gap-3 cursor-pointer " onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
} 