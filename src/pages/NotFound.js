import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>❌ صفحه مورد نظر یافت نشد!</h2>
      <p>مسیر وارد شده اشتباه است.</p>
      <Link to="/">بازگشت به صفحه ورود</Link>
    </div>
  );
};

export default NotFound;
