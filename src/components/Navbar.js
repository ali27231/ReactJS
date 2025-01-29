import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-600 text-white flex justify-between p-4">
      <div>
        <button className="text-white text-xl">☰</button>
      </div>
      <div>
        امروز {new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" }).format(time)} - {time.toLocaleTimeString("fa-IR")}
      </div>
      <div className="flex items-center">
        <img src="profile.jpg" alt="User" className="w-8 h-8 rounded-full" />
        <span className="ml-2">نام کاربر</span>
      </div>
    </div>
  );
};

export default Navbar;
