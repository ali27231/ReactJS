import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // استفاده از کانتکست احراز هویت
import "./Login.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // استفاده از تابع ورود از کانتکست

  // اطلاعات پیش‌فرض ورود (برای تست)
  const defaultUser = { username: "testuser", password: "123456" };
  const adminUser = { username: "admin", password: "admin27231" };

  // ثبت نام کاربر
  const handleSignup = async () => {
    if (!username || !email || !password) {
      setMessage("❌ لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ ثبت‌نام موفقیت‌آمیز بود! شما به صفحه ورود هدایت می‌شوید...");
        setTimeout(() => setIsLogin(true), 1000);
      } else {
        setMessage(data.error || "❌ مشکلی پیش آمده است.");
      }
    } catch (error) {
      setMessage("❌ سرور در دسترس نیست. لطفاً بعداً امتحان کنید.");
    }
  };

  // ورود کاربر
  const handleLogin = async () => {
    if (username === defaultUser.username && password === defaultUser.password) {
      loginSuccess("✅ ورود موفقیت‌آمیز با اطلاعات پیش‌فرض کاربر!", "dummy_token");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        loginSuccess("✅ ورود موفقیت‌آمیز بود! شما به داشبورد هدایت می‌شوید...", data.access);
      } else {
        setMessage(data.error || "❌ نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      if (username === adminUser.username && password === adminUser.password) {
        loginSuccess("✅ ورود موفقیت‌آمیز با اطلاعات ادمین!", "admin_token");
      } else {
        setMessage("❌ سرور در دسترس نیست و اطلاعات ورودی اشتباه است.");
      }
    }
  };

  const loginSuccess = (msg, token) => {
    setMessage(msg);
    login(token); // ذخیره توکن و تغییر وضعیت احراز هویت
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="container">
      <div className="auth-box">
        {isLogin ? (
          <>
            <h2>ورود به حساب کاربری</h2>
            <input type="text" placeholder="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>ورود</button>
            <p onClick={() => setIsLogin(false)}>حساب کاربری ندارید؟ ثبت‌نام کنید</p>
          </>
        ) : (
          <>
            <h2>ثبت نام</h2>
            <input type="email" placeholder="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>ثبت نام</button>
            <p onClick={() => setIsLogin(true)}>حساب کاربری دارید؟ وارد شوید</p>
          </>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Auth;
