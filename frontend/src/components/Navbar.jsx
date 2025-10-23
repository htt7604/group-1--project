// // src/components/Navbar.jsx

// import React from 'react';
// // 1. Import Link và useNavigate để điều hướng theo chuẩn React
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();

//     // 2. Lấy cả token và vai trò của người dùng từ localStorage
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('userRole');
//     const isLoggedIn = !!token; // Biến boolean để kiểm tra đăng nhập

//     // 3. Cập nhật hàm đăng xuất
//     const handleLogout = () => {
//         // Xóa cả token và vai trò người dùng
//         localStorage.removeItem('token');
//         localStorage.removeItem('userRole'); // Quan trọng!

//         alert('Bạn đã đăng xuất thành công!');
        
//         // Dùng navigate để chuyển trang mà không cần tải lại
//         navigate('/login');
//     };

//     return (
//         <nav style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '1rem 2rem',
//             backgroundColor: '#333',
//             color: 'white'
//         }}>
//             <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
//                 MyApp
//             </Link>

//             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
//                 {/* 4. Sử dụng Link thay cho thẻ <a> */}
//                 {isLoggedIn ? (
//                     // Nếu đã đăng nhập
//                     <>
//                         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
//                             Hồ sơ
//                         </Link>

//                         {/* 🚀 CHỈ HIỂN THỊ LINK NÀY NẾU USER LÀ ADMIN */}
//                         {userRole === 'admin' && (
//                             <Link to="/admin/users" style={{ color: 'yellow', textDecoration: 'none' }}>
//                                 Quản lý Users
//                             </Link>
//                         )}

//                         <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                             Đăng xuất
//                         </button>
//                     </>
//                 ) : (
//                     // Nếu chưa đăng nhập
//                     <>
//                         <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
//                             Đăng nhập
//                         </Link>
//                         <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//                             Đăng ký
//                         </Link>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // Import api instance

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken'); // Kiểm tra accessToken
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = !!token;

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            // Gọi API logout của backend để vô hiệu hóa refresh token
            if (refreshToken) {
                await api.post('/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
        } finally {
            // Dù API có lỗi hay không, vẫn xóa thông tin ở client
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
            alert('Bạn đã đăng xuất thành công!');
            navigate('/login');
        }
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: 'white'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
                MyApp
            </Link>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                            Hồ sơ
                        </Link>

                        {userRole === 'admin' && (
                            <Link to="/admin/users" style={{ color: 'yellow', textDecoration: 'none' }}>
                                Quản lý Users
                            </Link>
                        )}

                        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                            Đăng nhập
                        </Link>
                        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;