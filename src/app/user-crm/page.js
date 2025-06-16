"use client"
import Image from 'next/image';
import { FaCopy, FaWhatsapp, FaFilePdf } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaMoneyBill, FaHourglassHalf, FaWallet, FaMoneyBills, FaMoneyBillTransfer } from "react-icons/fa6";

import {
  FaHourglassStart,
  FaCircleNotch,
  FaSync,
  FaIdCard,
  FaFileSignature,
  FaEnvelope,
  FaAddressCard,
  FaCalendar,
  FaUserCircle,
  FaBriefcase,
  FaUserPlus,
  FaHandshake,
  FaBusinessTime,
} from 'react-icons/fa';

const iconClass = 'w-5 h-5';

export default function UserCRM() {
  const [data, setData] = useState(null)
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const notification = document.createElement('div');
      notification.className = 'fixed z-50 px-4 py-2 text-white bg-green-500 rounded shadow-lg top-4 right-4';
      notification.textContent = 'Copied to clipboard!';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    });
  };


  useEffect(() => {
    const storedData = Cookies.get("data")
    const data = JSON.parse(storedData)
    setData(data)
  }, []);

  const referLink = 'https://bnbtraders.io/home/Register?REF=BB100000';
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-6 overflow-hidden lg:flex-row">
        {/* Trading package card */}
        <div className='flex flex-col gap-6'>
          <div className="relative max-w-lg p-4 overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0f626a] to-[#0f626a]"></div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center justify-center bg-[#0f626a] rounded-md p-3">
                  <span className="font-medium text-white">Trading package</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden lg:block min-h-[40px] w-[100px]">
                    {/* Insert ApexCharts component here if using ApexCharts */}
                    <svg
                      width="100"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      className="bg-transparent"
                    >
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="1" x2="1" y2="1">
                          <stop offset="0" stopColor="rgba(var(--tw-color-primary),0.4)" />
                          <stop offset="1" stopColor="rgba(var(--tw-color-primary),0.1)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 35C 5.83 35 10.83 28 16.67 28C 22.5 28 27.5 20 33.33 20C 39.17 20 44.17 25 50 25C 55.83 25 60.83 10 66.67 10C 72.5 10 77.5 12 83.33 12C 89.17 12 94.17 21 100 21"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="bg-[#0f626a] text-white rounded-full px-3 py-1 text-sm font-semibold">
                    $100100.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Income and profit cards */}
          <div className="relative max-w-lg overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-green-500 to-green-600"></div>
            <div className="p-4">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
                <div className="flex flex-col flex-1 gap-1">
                  <p className="font-medium text-gray-800 truncate">Level Income</p>
                  <h6 className="text-lg text-green-600">$0.00</h6>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <p className="font-medium text-gray-800 truncate">Tranding Profit</p>
                  <h6 className="text-lg text-green-600">$0.00</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-w-lg overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-red-500 to-red-600"></div>
            <div className="p-4">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
                <div className="flex flex-col flex-1 gap-1">
                  <p className="font-medium text-gray-800 truncate">Team Trading profit</p>
                  <h6 className="text-lg text-red-600">$0.00</h6>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <p className="font-medium text-gray-800 truncate">Royalty income</p>
                  <h6 className="text-lg text-red-600">$0.00</h6>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Referral card */}
        <div className="relative bg-[#cfe0e1] rounded-lg p-4 max-h-[300px] max-w-sm overflow-hidden">

          <Image
            alt="Background Vector"
            src="/bg-round.png"
            width={200}
            height={200}
            className="absolute top-0 left-0 opacity-20"
          />
          <Image
            alt="Background Vector 2"
            src="/bg-round2.webp"
            width={200}
            height={200}
            className="absolute bottom-0 right-0 opacity-20"
          />

          <Image
            alt="Avatar"
            src="/meeting-avtar.webp"
            width={150}
            height={150}
            className="relative z-10 mx-auto"
          />

          <div className="mt-4 flex flex-col items-center bg-[#ebf2f3] p-3 rounded-lg text-black font-bold">
            <p className="mb-2 text-sm break-words text-start">
              <a href={referLink} target="_blank" rel="noopener noreferrer" className="underline">
                {referLink}
              </a>
            </p>

            <div className="flex w-full gap-2 mt-2">
              <button
                className="flex items-center justify-center flex-1 p-2 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700"
                onClick={() => copyToClipboard(referLink)}
              >
                <FaCopy />
              </button>
              <button
                href={`https://wa.me/?text=${encodeURIComponent(referLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 p-2 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700 animate-pulse-slow"
              >
                <FaWhatsapp />
              </button>
              <button
                href="/B-B Traders-PPT.pdf"
                target="_blank"
                className="flex items-center justify-center flex-1 p-2 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700 animate-pulse-slow"
              >
                <FaFilePdf />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Profit card */}
      <div className="order-1 w-full mt-4 lg:order-1">
        <div className="grid grid-cols-12 gap-4">
          {/* Card 1 */}
          <div className="col-span-12 sm:col-span-3">
            <div className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div className="bg-[#0f626a] text-white w-11 h-11 flex items-center justify-center rounded-full">
                  <FaMoneyBill />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-lg font-bold text-dark">$300300.00</h4>
                <p className="font-medium text-black truncate">Income limit</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 sm:col-span-2">
            <div className="bg-[#0f626a] text-black rounded shadow p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-primary">
                <FaHourglassHalf />
              </div>
              <div className="mt-3 text-center">
                <h4 className="text-lg font-bold text-white">$0.00</h4>
                <p className="font-medium text-white truncate">Pending limit</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-span-12 sm:col-span-2">
            <div className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div className="bg-[#0f626a] text-white w-11 h-11 flex items-center justify-center rounded-full">
                  <FaWallet />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-lg font-bold text-dark">$0.00</h4>
                <p className="font-medium text-black truncate">Income Wallet Balance</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-span-12 sm:col-span-3">
            <div className="bg-[#0f626a] text-white rounded shadow p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-primary">
                <FaMoneyBills className='text-black' />
              </div>
              <div className="mt-3 text-center">
                <h4 className="text-lg font-bold text-white">$400000.00</h4>
                <p className="font-medium truncate">Topup Wallet Balance</p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-span-12 sm:col-span-2">
            <div className="bg-[#0f626a] text-white rounded shadow p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-primary">
                <FaMoneyBillTransfer className='text-black' />
              </div>
              <div className="mt-3 text-center">
                <h4 className="text-lg font-bold text-white">$0.00</h4>
                <p className="font-medium truncate">Withdrawal Fund</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info  */}
      <div className="flex justify-between gap-6 mt-8">
        {/* Personal Info */}
        <div className="w-full md:w-1/2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h6 className="mb-4 text-lg font-semibold text-gray-800">Personal Info</h6>

            {/* Status cards */}
            <div className="flex gap-4 mb-6">
              {[
                { label: 'Running', icon: <FaHourglassStart className="text-blue-500" />, bg: 'bg-[#0f626a]', count: '0' },
                { label: 'Completed', icon: <FaCircleNotch className="text-green-500" />, bg: 'bg-[#0ab964]', count: '0' },
                { label: 'Pending', icon: <FaSync className="text-red-500" />, bg: 'bg-[#e14e5a]', count: '0' },
              ].map((item, i) => (
                <div key={i} className={`flex-1 ${item.bg} text-white text-center p-4 rounded shadow`}>
                  <div className="flex items-center justify-center mx-auto mb-2 bg-white rounded-full w-11 h-11">
                    {item.icon}
                  </div>
                  <p className="truncate">{item.label}</p>
                  <p className="mt-1 text-sm">{item.count}</p>
                </div>
              ))}
            </div>

            {/* Personal Details */}
            <ul className="space-y-4">
              {[
                { icon: <FaIdCard className={`${iconClass} text-red-500`} />, label: 'User Id', value: data?.LoginID },
                { icon: <FaFileSignature className={`${iconClass} text-green-500`} />, label: 'Name', value: data?.Name },
                { icon: <FaEnvelope className={`${iconClass} text-blue-900`} />, label: 'Email Id', value: data?.Email },
                { icon: <FaAddressCard className={`${iconClass} text-blue-900`} />, label: 'Registration Date', value: data?.RegDate },
                { icon: <FaCalendar className={`${iconClass} text-blue-900`} />, label: 'Activaiton Date', value: data?.ActivationDate },
                { icon: <FaUserCircle className={`${iconClass} text-blue-900`} />, label: 'Sponsor Name', value: data?.SponsorName },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  </div>
                  <b>{item.value || '-'}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business Info */}
        <div className="w-full md:w-1/2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h6 className="mb-4 text-lg font-semibold text-gray-800">Business Info</h6>

            {/* Status cards */}
            <div className="flex gap-4 mb-6">
              {[
                { label: 'Running', icon: <FaHourglassStart className="text-blue-500" />, bg: 'bg-[#0f626a]', count: '0' },
                { label: 'Completed', icon: <FaCircleNotch className="text-green-500" />, bg: 'bg-[#0ab964]', count: '0' },
                { label: 'Pending', icon: <FaSync className="text-red-500" />, bg: 'bg-[#e14e5a]', count: '0' },
              ].map((item, i) => (
                <div key={i} className={`flex-1 ${item.bg} text-white text-center p-4 rounded shadow`}>
                  <div className="flex items-center justify-center mx-auto mb-2 bg-white rounded-full w-11 h-11">
                    {item.icon}
                  </div>
                  <p className="truncate">{item.label}</p>
                  <p className="mt-1 text-sm">{item.count}</p>
                </div>
              ))}
            </div>

            {/* Business Details */}
            <ul className="space-y-4 ">
              {[
                { icon: <FaBriefcase className={`${iconClass} text-red-500`} />, label: 'Direct ID/Business', value: '0/0' },
                { icon: <FaUserPlus className={`${iconClass} text-green-500`} />, label: 'Team Business', value: '0' },
                { icon: <FaHandshake className={`${iconClass} text-blue-900`} />, label: 'Strong Leg Id/Bus', value: '/0.00' },
                { icon: <FaBusinessTime className={`${iconClass} text-blue-900`} />, label: 'Other Leg Business', value: '0.00' },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  </div>
                  <b>{item.value}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Marketing Tools  */}
      <div className="grid grid-cols-1 gap-4 my-4 xl:grid-cols-2">
        {/* FX Pricing Widget */}
        <div className="overflow-hidden bg-white shadow-md rounded-2xl">
          <div className="p-4">
            <iframe
              src="https://fxpricing.com/fx-widget/market-currency-rates-widget.php?id=1,2,3,5,14,20&amp;click_target=blank&amp;theme=light&amp;tm-cr=FFFFFF&amp;hr-cr=00000013&amp;by-cr=28A745&amp;sl-cr=DC3545&amp;flags=circle&amp;value_alignment=center&amp;column=price,ask,bid,chg,chg_per,spread,time&amp;lang=en&amp;font=Arial, sans-serif"
              width="100%"
              height="290"
              style={{ border: "1px solid #eee" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* TradingView Widget */}
        <div className="overflow-hidden bg-white shadow-md rounded-2xl">
          <div className="p-4 h-[300px]">
            <iframe
              scrolling="no"
              allowtransparency="true"
              frameBorder="0"
              src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22light%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A300%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(240%2C%20243%2C%20250%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(15%2C%2015%2C%2015%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%2C%22d%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%2C%22d%22%3A%22GBP%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%2C%22d%22%3A%22USD%20to%20JPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%2C%22d%22%3A%22USD%20to%20CHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%2C%22d%22%3A%22AUD%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%2C%22d%22%3A%22USD%20to%20CAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%2C%7B%22title%22%3A%22Futures%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22BMFBOVESPA%3AISP1!%22%2C%22d%22%3A%22S%26P%20500%20Index%20Futures%22%7D%2C%7B%22s%22%3A%22BMFBOVESPA%3AEUR1!%22%2C%22d%22%3A%22Euro%20Futures%22%7D%2C%7B%22s%22%3A%22PYTH%3AWTI3!%22%2C%22d%22%3A%22WTI%20CRUDE%20OIL%22%7D%2C%7B%22s%22%3A%22BMFBOVESPA%3AETH1!%22%2C%22d%22%3A%22Hydrous%20ethanol%22%7D%2C%7B%22s%22%3A%22BMFBOVESPA%3ACCM1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Futures%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%5D%2C%22utm_source%22%3A%22bnbtraders.io%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22bnbtraders.io%2FUserCRM%2FIndex%22%7D"
              title="Market Overview TradingView Widget"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
} 