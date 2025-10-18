//4
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // <-- Import Navbar
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
// frontend/src/App.js
import AdminDashboard from './components/AdminDashboard';

// ... import các component khác

function App() {
  return (
    <Router>
      <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Các Route khác */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;