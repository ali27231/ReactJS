import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const AdditionalInfo = () => {
  const [nationalCode, setNationalCode] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nationalCode || !hospitalName || !medicalLicense || !verificationCode || !phoneNumber) {
      setMessage("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/doctor-info/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: location.state?.username,
          email: location.state?.email,
          national_code: nationalCode,
          hospital_name: hospitalName,
          medical_license: medicalLicense,
          verification_code: verificationCode,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ اطلاعات با موفقیت ذخیره شد! در حال هدایت...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(data.error || "❌ مشکلی پیش آمده است.");
      }
    } catch (error) {
      setMessage("❌ سرور در دسترس نیست. لطفاً بعداً امتحان کنید.");
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>اطلاعات تکمیلی</h2>
        <input type="text" placeholder="کد ملی" value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} />
        <input type="text" placeholder="نام بیمارستان" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
        <input type="text" placeholder="کد نظام پزشکی" value={medicalLicense} onChange={(e) => setMedicalLicense(e.target.value)} />
        <input type="text" placeholder="کد ارسال شده به ایمیل" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        <input type="text" placeholder="شماره تلفن همراه" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button onClick={handleSubmit}>ارسال اطلاعات</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AdditionalInfo;
