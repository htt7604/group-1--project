// src/components/Navbar.jsx

import React from 'react';
import './styles.css'; // thêm import CSS

const Navbar = () => {
  // Lấy token từ localStorage để kiểm tra trạng thái đăng nhập
  const token = localStorage.getItem('token');

  // Đây chính là hàm đăng xuất của bạn
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Đã đăng xuất!');
    // Chuyển hướng người dùng về trang đăng nhập
    window.location.href = '/login'; 
  };

  return (
    <nav className="navbar">
      <a className="nav-brand" href="/">Trang chủ</a>
      
      {/* Sử dụng toán tử 3 ngôi để hiển thị nút bấm tùy theo trạng thái đăng nhập */}
      {token ? (
        // Nếu đã có token (đã đăng nhập)
        <>
          <a className="nav-link" href="/profile">Hồ sơ</a>
          <button className="btn btn-ghost" onClick={handleLogout}>Đăng xuất</button>
        </>
      ) : (
        // Nếu chưa có token (chưa đăng nhập)
        <>
          <a className="nav-link" href="/login">Đăng nhập</a>
          <a className="btn btn-primary" href="/signup">Đăng ký</a>
        </>
      )}
    </nav>
  );
};

export default Navbar;