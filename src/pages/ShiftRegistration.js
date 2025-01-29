import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./ShiftRegistration.css"

const ShiftRegistration = () => {
  const daysInMonth = 30; // تعداد روزهای ماه (مثال)
  const [shifts, setShifts] = useState(Array(daysInMonth).fill(null));

  const handleSelectShift = (index, shiftType) => {
    const newShifts = [...shifts];
    newShifts[index] = shiftType;
    setShifts(newShifts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">ثبت شیفت‌های ماهانه</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md text-center">
              <p className="font-bold text-gray-700">روز {i + 1}</p>
              <div className="mt-2 flex flex-col gap-1">
                {["صبح", "ظهر", "شب", "مرخصی"].map((shift) => (
                  <button
                    key={shift}
                    className={`p-2 rounded-md text-white transition-all ${
                      shifts[i] === shift ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => handleSelectShift(i, shift)}
                  >
                    {shift}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all">
          ذخیره شیفت‌ها
        </button>
      </div>
    </div>
  );
};

export default ShiftRegistration;
