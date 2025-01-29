import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ShiftRegistration from "./pages/ShiftRegistration";
import MyShifts from "./pages/MyShifts";
import Feedback from "./pages/Feedback";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Private route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/register-shift" element={<PrivateRoute><ShiftRegistration /></PrivateRoute>} />
          <Route path="/my-shifts" element={<PrivateRoute><MyShifts /></PrivateRoute>} />
          <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      
    </AuthProvider>
    </Router>
  );
};

export default App;
