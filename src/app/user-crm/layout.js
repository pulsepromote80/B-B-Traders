"use client"
import Sidebar from "./sidebar/page";
import Topbar from "./top-bar/page";
import Footer from "./dashboard/Footer/page";

export default function UserCrmLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar />
        <main className="flex-1 ">
          <div className="bg-gradient-to-r from-[#020b22] to-[#17316f] p-3 rounded-xl m-4">
            <div className="text-white font-sm">
              <span className="font-bold">Bank</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-gray-300">Bank Kyc</span>
            </div>
          </div>
          {children}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
