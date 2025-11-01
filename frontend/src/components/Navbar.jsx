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

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api'; // Import api instance

// const Navbar = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('accessToken'); // Kiểm tra accessToken
//     const userRole = localStorage.getItem('userRole');
//     const isLoggedIn = !!token;

//     const handleLogout = async () => {
//         const refreshToken = localStorage.getItem('refreshToken');
//         try {
//             // Gọi API logout của backend để vô hiệu hóa refresh token
//             if (refreshToken) {
//                 await api.post('/auth/logout', { refreshToken });
//             }
//         } catch (error) {
//             console.error("Lỗi khi gọi API logout:", error);
//         } finally {
//             // Dù API có lỗi hay không, vẫn xóa thông tin ở client
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             localStorage.removeItem('userRole');
//             alert('Bạn đã đăng xuất thành công!');
//             navigate('/login');
//         }
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
//                 {isLoggedIn ? (
//                     <>
//                         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
//                             Hồ sơ
//                         </Link>

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



















// // b6 hd1
// // frontend/src/components/Navbar.jsx

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance'; // Import axiosInstance để gọi API logout

// const Navbar = () => {
//     const navigate = useNavigate();

//     // ✅ SỬA LỖI 1: Lấy đúng key 'accessToken' để kiểm tra trạng thái đăng nhập
//     const isLoggedIn = !!localStorage.getItem('accessToken');

//     // ✅ SỬA LỖI 2: Lấy thông tin user từ key 'user'
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null; // Chuyển chuỗi JSON thành object

//     // ✅ SỬA LỖI 3: Cập nhật hàm đăng xuất cho hoàn chỉnh
//     const handleLogout = async () => {
//         const refreshToken = localStorage.getItem('refreshToken');
//         try {
//             // Gọi API để server xóa refresh token (tăng cường bảo mật)
//             if (refreshToken) {
//                 await axiosInstance.post('/auth/logout', { token: refreshToken });
//             }
//         } catch (error) {
//             console.error('Lỗi khi gọi API logout:', error);
//         } finally {
//             // Dù API có lỗi hay không, vẫn xóa thông tin ở client
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             localStorage.removeItem('user');

//             alert('Bạn đã đăng xuất thành công!');
            
//             // Tải lại trang để đảm bảo mọi state được reset sạch sẽ
//             window.location.href = '/login';
//         }
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
//                 {isLoggedIn && user ? (
//                     // Nếu đã đăng nhập và có thông tin user
//                     <>
//                         {/* Chào mừng người dùng */}
//                         <span style={{ color: '#ddd' }}>Chào, {user.name}</span>

//                         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
//                             Hồ sơ
//                         </Link>

//                         {/* ✅ SỬA LỖI 4: Kiểm tra vai trò từ object user */}
//                         {user.role === 'admin' && (
//                             <Link to="/admin" style={{ color: 'yellow', textDecoration: 'none' }}>
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
















// // b6 hd2
// // frontend/src/components/Navbar.jsx

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = !!localStorage.getItem('accessToken');
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     const handleLogout = async () => {
//         const refreshToken = localStorage.getItem('refreshToken');
//         try {
//             if (refreshToken) {
//                 await axiosInstance.post('/auth/logout', { token: refreshToken });
//             }
//         } catch (error) {
//             console.error('Lỗi khi gọi API logout:', error);
//         } finally {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             localStorage.removeItem('user');
//             alert('Bạn đã đăng xuất thành công!');
//             window.location.href = '/login';
//         }
//     };

//     return (
//         <nav style={{
//             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//             padding: '1rem 2rem', backgroundColor: '#333', color: 'white'
//         }}>
//             <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
//                 MyApp
//             </Link>
//             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
//                 {isLoggedIn && user ? (
//                     <>
//                         <span style={{ color: '#ddd' }}>Chào, {user.name}</span>
//                         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Hồ sơ</Link>
                        
//                         {/* ✅ SỬA ĐIỀU KIỆN: Cả admin và moderator đều thấy link này */}
//                         {['admin', 'moderator'].includes(user.role) && (
//                             <Link to="/admin" style={{ color: 'yellow', textDecoration: 'none' }}>
//                                 Quản lý Users
//                             </Link>
//                         )}

//                         <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng xuất</button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Đăng nhập</Link>
//                         <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Đăng ký</Link>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



// // b6 hd5
// // frontend/src/components/Navbar.jsx

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = !!localStorage.getItem('accessToken');
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     const handleLogout = async () => {
//         const refreshToken = localStorage.getItem('refreshToken');
//         try {
//             if (refreshToken) {
//                 await axiosInstance.post('/auth/logout', { token: refreshToken });
//             }
//         } catch (error) {
//             console.error('Lỗi khi gọi API logout:', error);
//         } finally {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             localStorage.removeItem('user');
//             alert('Bạn đã đăng xuất thành công!');
//             window.location.href = '/login';
//         }
//     };

//     return (
//         <nav style={{
//             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//             padding: '1rem 2rem', backgroundColor: '#333', color: 'white'
//         }}>
//             <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
//                 MyApp
//             </Link>
//             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
//                 {isLoggedIn && user ? (
//                     <>
//                         <span style={{ color: '#ddd' }}>Chào, {user.name}</span>
//                         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Hồ sơ</Link>
                        
//                         {['admin', 'moderator'].includes(user.role) && (
//                             <Link to="/admin" style={{ color: 'yellow', textDecoration: 'none' }}>
//                                 Quản lý Users
//                             </Link>
//                         )}
                        
//                         {/* ✅ THÊM LINK MỚI: Chỉ admin thấy */}
//                         {user.role === 'admin' && (
//                              <Link to="/admin/logs" style={{ color: 'cyan', textDecoration: 'none' }}>
//                                 Nhật ký
//                             </Link>
//                         )}

//                         <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng xuất</button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Đăng nhập</Link>
//                         <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Đăng ký</Link>
//                     </>
                            
//                             )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


//b6 hd6
// frontend/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // 1. Import action `logout`
import axiosInstance from '../api/axiosInstance'; // Vẫn cần để gọi API logout

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // 2. Lấy hàm dispatch
    
    // 3. Lấy trạng thái trực tiếp từ Redux store
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken'); // Vẫn cần refreshToken để vô hiệu hóa
        try {
            if (refreshToken) {
                await axiosInstance.post('/auth/logout', { token: refreshToken });
            }
        } catch (error) {
            console.error('Lỗi khi gọi API logout:', error);
        } finally {
            // 4. Gửi action `logout`
            // Redux sẽ lo việc xóa state và localStorage
            dispatch(logout()); 
            
            // 5. Điều hướng về trang login (không cần reload)
            navigate('/login');
        }
    };

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 2rem', backgroundColor: '#333', color: 'white'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
                MyApp
            </Link>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* 6. Dùng state từ Redux để quyết định giao diện */}
                {isAuthenticated && user ? (
                    <>
                        <span style={{ color: '#ddd' }}>Chào, {user.name}</span>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Hồ sơ</Link>
                        
                        {['admin', 'moderator'].includes(user.role) && (
                            <Link to="/admin" style={{ color: 'yellow', textDecoration: 'none' }}>
                                Quản lý Users
                            </Link>
                        )}
                        
                        {user.role === 'admin' && (
                             <Link to="/admin/logs" style={{ color: 'cyan', textDecoration: 'none' }}>
                                Nhật ký
                            </Link>
                        )}

                        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Đăng nhập</Link><Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Đăng ký</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;