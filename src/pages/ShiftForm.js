import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-jalaali"; // برای تاریخ شمسی
import { motion } from "framer-motion";

const ShiftForm = () => {
  const [fullName, setFullName] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [availability, setAvailability] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    const currentMoment = moment();
    const currentDay = currentMoment.jDate();
    const daysLeftInMonth = currentMoment.daysInMonth() - currentDay + 1;
    const days = Array.from({ length: daysLeftInMonth }, (_, i) => currentDay + i);

    setDaysInMonth(days);
    setMonthName(currentMoment.format("jMMMM"));

    const initialAvailability = days.map(() => ({ morning: false, noon: false, night: false }));
    setAvailability(initialAvailability);
  }, []);

  const handleShiftChange = (dayIndex, shiftType) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex][shiftType] = !newAvailability[dayIndex][shiftType];
    setAvailability(newAvailability);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shiftData = {
      full_name: fullName,
      medical_license: medicalLicense,
      hospital_name: hospitalName,
      availability,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/shift/", shiftData);
      if (response.status === 201) alert("اطلاعات با موفقیت ذخیره شد");
    } catch (error) {
      console.error(error);
      alert("خطا در ذخیره اطلاعات");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white py-10 px-5 flex flex-col items-center">
      <motion.div
        className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">فرم اطلاعات پزشک</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="نام و نام خانوادگی"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={medicalLicense}
            onChange={(e) => setMedicalLicense(e.target.value)}
            placeholder="کد نظام پزشکی"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="نام بیمارستان"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
          >
            ذخیره اطلاعات
          </button>
        </form>
      </motion.div>

      <motion.div
        className="mt-10 w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">جدول شیفت‌ها - {monthName}</h2>
        <div className="grid grid-cols-7 gap-4">
          {daysInMonth.map((day, index) => (
            <motion.div
              key={index}
              className="bg-blue-100 rounded-xl p-4 text-center text-gray-800 shadow-md hover:scale-105 transition-transform"
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="font-bold mb-2">{moment().jDate(day).format("jYYYY/jMM/jDD")}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleShiftChange(index, "morning")}
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    availability[index]?.morning ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  شیفت صبح
                </button>
                <button
                  onClick={() => handleShiftChange(index, "noon")}
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    availability[index]?.noon ? "bg-yellow-500 text-white" : "bg-gray-200"
                  }`}
                >
                  شیفت ظهر
                </button>
                <button
                  onClick={() => handleShiftChange(index, "night")}
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    availability[index]?.night ? "bg-purple-500 text-white" : "bg-gray-200"
                  }`}
                >
                  شیفت شب
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShiftForm;
