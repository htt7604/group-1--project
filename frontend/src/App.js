// //4
// // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; // <-- Import Navbar
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Profile from './components/Profile';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// // frontend/src/App.js
// import AdminDashboard from './components/AdminDashboard';

// // ... import các component khác

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/admin/users" element={<AdminDashboard />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           {/* Các Route khác */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// export default App;














// //b6 hd1
// // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Profile from './components/Profile';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="container" style={{ padding: '20px' }}>
//         <Routes>
//           {/* Các Route công khai */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />

//           {/* Các Route cho người dùng đã đăng nhập */}
//           <Route path="/profile" element={<Profile />} />
          
//           {/* ✅ SỬA LỖI: Đổi path từ "/admin/users" thành "/admin" để khớp với Navbar */}
//           <Route path="/admin" element={<AdminDashboard />} />

//           {/* Route mặc định cho trang chủ và trang không tìm thấy */}
//           <Route path="/" element={<h2>Chào mừng đến Trang Chủ</h2>} />
//           <Route path="*" element={<h2>404 - Không tìm thấy trang</h2>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



//b6 hd5
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import ActivityLogs from './components/ActivityLogs'; // ✅ 1. Import component mới

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ✅ 2. THÊM ROUTE MỚI CHO TRANG LOGS */}
          <Route path="/admin/logs" element={<ActivityLogs />} />

          <Route path="/" element={<h2>Chào mừng đến Trang Chủ</h2>} />
          <Route path="*" element={<h2>404 - Không tìm thấy trang</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;