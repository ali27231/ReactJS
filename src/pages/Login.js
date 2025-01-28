import React, { useState } from 'react';
import './Login.css'; // فایل CSS صفحه لاگین
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // افزودن axios

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      // ارسال درخواست به API Django
      const response = await axios.post('https://djangoapi.liara.run/api/posts/', loginData);

      // اگر لاگین موفقیت‌آمیز بود، ریدایرکت به صفحه شِیفت‌ها
      if (response.status === 200) {
        setError('');
        navigate('/shifts');
      }
    } catch (err) {
      // در صورت بروز خطا (مثل اطلاعات نادرست)
      setError('نام کاربری یا رمز عبور نادرست است.');
      alert('ارسال اطلاعات ناموفق بود. دوباره تلاش کنید.'); // اضافه کردن alert
    }
  };

  return (
    <div className="login-container">
      <h2>ورود به سیستم</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="نام کاربری" 
            required 
          />
        </div>
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="رمز عبور" 
            required 
          />
        </div>
        <button type="submit">ورود</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
