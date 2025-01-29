import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">داشبورد</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/register-shift" className="dashboard-card">
            ثبت شیفت جدید
          </Link>
          <Link to="/my-shifts" className="dashboard-card">
            برنامه شیفت‌های من
          </Link>
          <Link to="/feedback" className="dashboard-card">
            ارسال بازخورد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
