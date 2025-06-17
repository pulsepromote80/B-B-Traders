"use client"
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-[#1b3671] text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white w-64 h-screen flex flex-col fixed md:relative z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        <div className="p-3 text-green-700 text-2xl font-bold ml-10">
          <Link href="/user-crm">
            <Image src="/logo.webp" width={140} height={140} alt="Logo" />
          </Link>
        </div>
        <div className="flex-1 p-4 space-y-5 overflow-y-auto scrollbar-blue">
          <Link href="/user-crm" className="flex items-center space-x-2 text-gray-700 bg-[#1b3671] rounded-3xl p-3 font-medium">
            <Image src="/dashboard_icon.webp" width={16} height={16} alt="Logo" />
            <span className='text-white'>Dashboard</span>
          </Link>
          <div className='ml-3 space-y-5'>
            <Link href="/user-crm/dashboard/buy-package" className="flex items-center space-x-2 text-gray-700 font-medium">
              <Image src="/Wallet-Report.webp" width={16} height={16} alt="Logo" />
              <span className='text-green-700 hover:text-[#1b3671]'>Buy Package</span>
            </Link>

            <button
              onClick={() => toggleDropdown('fundManager')}
              className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium w-full mb-5"
            >
              <Image
                src="/Fund-Manager.webp"
                width={16}
                height={16}
                alt="Logo"
              />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left ">
                Fund Manager
              </span>
              {activeDropdown === 'fundManager' ? (
                <ChevronUp size={20} className="text-[#051330] text-xl transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'fundManager' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-5">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/auto-deposit"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Auto Deposit
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/fund-request"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Fund Request
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/fund-transfer"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Income Transfer
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/p2p-transfer"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        P2P Transfer
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/withdrawal-request"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Income Withdrawal
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('community')}
              className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium w-full mb-5"
            >
              <Image
                src="/Community.png"
                width={16}
                height={16}
                alt="Logo"
              />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left ">
                Community
              </span>
              {activeDropdown === 'community' ? (
                <ChevronUp size={20} className="text-[#051330] text-xl transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'community' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-5">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/affilate-user-table"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Direct User
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/personal-down-team"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Downline Team
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/business-history"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] hover:text-[#1b3671]">
                        Business History
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => toggleDropdown('payout')}
              className="flex items-center space-x-2 text-gray-700 font-medium w-full cursor-pointer"
            >
              <Image src="/Payout.webp" width={16} height={16} alt="Logo" />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left">
                Payout
              </span>
              {activeDropdown === 'payout' ? (
                <ChevronUp size={20} className="text-[#051330] transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'payout' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-3 ">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/trading-profit"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Trading Profit
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/level-income"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Level Income
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => toggleDropdown('walletReport')}
              className="flex items-center space-x-2 text-gray-700 font-medium w-full cursor-pointer"
            >
              <Image src="/Wallet-report.webp" width={16} height={16} alt="Logo" />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left">
                Wallet Report
              </span>
              {activeDropdown === 'walletReport' ? (
                <ChevronUp size={20} className="text-[#051330] transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'walletReport' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-3 ">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/income-wallet"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Income Wallet
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/topup-wallet"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Topup  Wallet
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/withdrawal-history"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Withdraw History
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => toggleDropdown('settings')}
              className="flex items-center space-x-2 text-gray-700 font-medium w-full cursor-pointer"
            >
              <Image src="/Settings.webp" width={16} height={16} alt="Logo" />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left">
                Settings
              </span>
              {activeDropdown === 'settings' ? (
                <ChevronUp size={20} className="text-[#051330] transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'settings' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-3 ">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/update-profile"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        View/Edit Profile
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/update-password"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Reset Password
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/kyc"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        KYC
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => toggleDropdown('helpDesk')}
              className="flex items-center space-x-2 text-gray-700 font-medium w-full cursor-pointer"
            >
              <Image src="/Help-desk.webp" width={16} height={16} alt="Logo" />
              <span className="text-green-700 hover:text-[#1b3671] flex-1 text-left">
                Help Desk
              </span>
              {activeDropdown === 'helpDesk' ? (
                <ChevronUp size={20} className="text-[#051330] transition-transform duration-300" />
              ) : (
                <ChevronDown size={20} className="text-[#051330] transition-transform duration-300" />
              )}
            </button>

            {activeDropdown === 'helpDesk' && (
              <div className="ml-2 space-y-3">
                <ul className="list-none space-y-3">
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/ticket-form"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Create Ticket
                      </span>
                    </Link>
                  </li>
                  <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-green-700 before:rounded-full">
                    <Link
                      href="/user-crm/dashboard/ticket-history"
                      className="flex items-center space-x-2 text-gray-700 font-semibold"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <span className="text-[#051330] text-[15px] hover:text-[#1b3671]">
                        Ticket History
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )} 

            <Link 
              href="/login" 
              className="flex items-center space-x-2 text-gray-700 font-medium"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <Image src="/Logout.webp" width={16} height={16} alt="Logo" />
              <span className='text-green-700 hover:text-[#1b3671]'>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}