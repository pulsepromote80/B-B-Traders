"use client"
import Link from "next/link";

export default function Footer() {
    return (
      <footer className="w-full px-6 py-4 bg-white border-t border-gray-200 mt-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-700">
          <p>Copyright © 2025. All Rights Reserved By <span className="font-semibold">B&B Traders</span></p>
          <Link href="/user-crm/dashboard/ticket-form" >Help Center</Link>
        </div>
      </footer>
    );
  }
  