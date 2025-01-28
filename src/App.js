import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ShiftForm from './pages/ShiftForm';
import ShiftTable from './pages/ShiftTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shifts" element={<ShiftForm />} />
        <Route path="/table" element={<ShiftTable />} />
      </Routes>
    </Router>
  );
};

export default App;