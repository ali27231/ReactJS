import React from "react";
import Navbar from "../components/Navbar";
import "./MyShifts.css"

const MyShifts = () => {
  const sampleShifts = [
    { date: "۱۴۰۳/۱۱/۰۵", shift: "صبح" },
    { date: "۱۴۰۳/۱۱/۱۰", shift: "شب" },
    { date: "۱۴۰۳/۱۱/۱۵", shift: "مرخصی" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">برنامه شیفت‌های من</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {sampleShifts.length === 0 ? (
            <p className="text-gray-600">اطلاعات شیفت‌های شما ثبت نشده است</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3">تاریخ</th>
                  <th className="p-3">شیفت</th>
                </tr>
              </thead>
              <tbody>
                {sampleShifts.map((shift, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-3">{shift.date}</td>
                    <td className="p-3">{shift.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyShifts;
