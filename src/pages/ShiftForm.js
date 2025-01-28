import React, { useState } from "react";
import "./ShiftForm.css";

const ShiftForm = () => {
  const [fullName, setFullName] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [availability, setAvailability] = useState(
    Array(30).fill(0).map(() => Array(24).fill(0))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, medicalLicense, hospitalName, availability });
  };

  const handleAvailabilityChange = (day, hour, value) => {
    const newAvailability = [...availability];
    newAvailability[day][hour] = value;
    setAvailability(newAvailability);
  };

  return (
    <div className="shift-form-container">
      <div className="form-box">
        <h2>فرم اطلاعات پزشک</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="نام و نام خانوادگی"
            required
          />
          <input
            type="text"
            value={medicalLicense}
            onChange={(e) => setMedicalLicense(e.target.value)}
            placeholder="کد نظام پزشکی"
            required
          />
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="نام بیمارستان"
            required
          />
          <button type="submit">ذخیره اطلاعات</button>
        </form>
      </div>

      <h2 className="table-title">جدول شیفت‌ها</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>روز / ساعت</th>
              {[...Array(24)].map((_, hour) => (
                <th key={hour}>{hour}:00</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(30)].map((_, day) => (
              <tr key={day}>
                <td>{day + 1}</td>
                {[...Array(24)].map((_, hour) => (
                  <td key={hour}>
                    <input
                      className="availability-input"
                      type="number"
                      min="0"
                      max="1"
                      value={availability[day][hour]}
                      onChange={(e) =>
                        handleAvailabilityChange(day, hour, Number(e.target.value))
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftForm;
