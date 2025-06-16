"use client"
import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function DashboardContent() {
  const [stats] = useState([
    {
      title: "Total Investment",
      value: "$12,500",
      change: "+12%",
      isIncrease: true,
      icon: <DollarSign className="w-6 h-6 text-green-600" />
    },
    {
      title: "Active Members",
      value: "2,300",
      change: "+5%",
      isIncrease: true,
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Total Earnings",
      value: "$45,000",
      change: "-3%",
      isIncrease: false,
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />
    },
    {
      title: "Daily Profit",
      value: "$890",
      change: "+8%",
      isIncrease: true,
      icon: <Activity className="w-6 h-6 text-orange-600" />
    }
  ]);

  const recentActivities = [
    { id: 1, activity: "Investment Package Purchased", time: "2 hours ago", amount: "+$1,000" },
    { id: 2, activity: "Withdrawal Processed", time: "5 hours ago", amount: "-$500" },
    { id: 3, activity: "Referral Bonus Received", time: "1 day ago", amount: "+$100" },
    { id: 4, activity: "ROI Credit", time: "2 days ago", amount: "+$250" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold">Welcome back, Trader!</h1>
        <p className="mt-2 text-sm sm:text-base opacity-90">Here's what's happening with your investments today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">{stat.icon}</div>
              <div className={`flex items-center ${stat.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isIncrease ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span className="ml-1 text-xs sm:text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-xs sm:text-sm font-medium">{stat.title}</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3 sm:space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 sm:pb-4 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-sm sm:text-base text-gray-900">{activity.activity}</p>
                <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
              </div>
              <span className={`font-medium text-sm sm:text-base mt-1 sm:mt-0 ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {activity.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}