"use client"
import Notification from "../../../../public/notification.jpg";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import Cookies from "js-cookie";

export default function Topbar() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [loginId, setLoginId] = useState('');
    const [name, setName] = useState('');
    const profileRef = useRef(null);

    useEffect(() => {
        const storedLoginId = Cookies.get("data")
        const data = JSON.parse(storedLoginId)
        setLoginId(data.LoginID || '');
        setName(data.Name || '');
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-between bg-white p-4 md:p-7 shadow-sm sticky top-0 z-10">
            {/* User ID - hidden below 985px */}
            <div className="text-sm font-medium border border-black rounded-md p-2 hidden min-[985px]:block">
                User ID: <span className="font-bold">{loginId}</span>
            </div>
            
            {/* Right-aligned items */}
            <div className="ml-auto flex items-center space-x-4">
                <Image 
                    src={Notification} 
                    alt="Notification" 
                    width={36} 
                    height={36} 
                    className="h-9 w-auto cursor-pointer" 
                />
                <div ref={profileRef} className="relative">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                            <Image 
                                src="/avatar.webp" 
                                alt="User Avatar" 
                                width={48} 
                                height={48} 
                                className="w-auto rounded-full" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-medium">{loginId}</div>
                            <div className="font-medium">{name}</div>
                        </div>
                    </div>
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 z-50">
                            <ProfileMenu onClose={() => setShowProfileMenu(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}