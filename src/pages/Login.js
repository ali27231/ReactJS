import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // ارسال درخواست به Django API برای لاگین
      const response = await axios.post('http://your-api-url.com/api/login/', {
        username: username,
        password: password
      });
      
      if (response.data.token) {
        // فرض می‌کنیم که در صورت موفقیت، یک توکن دریافت می‌کنید
        localStorage.setItem('authToken', response.data.token);
        setError('');
        navigate('/shifts');
      } else {
        setError('نام کاربری یا رمز عبور نادرست است.');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور.');
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
