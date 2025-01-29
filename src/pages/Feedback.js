import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("بازخورد شما ارسال شد!");
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">ارسال بازخورد</h1>
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="نظر خود را اینجا بنویسید..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
            ارسال بازخورد
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
