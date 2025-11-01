// //4
// //frontend/src/components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import './styles.css';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { email, password } = formData;
//     const navigate = useNavigate();

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
//             const token = res.data.token;
//             localStorage.setItem('token', token);

//             // Giải mã token an toàn để lưu role nếu có
//             try {
//                 const decoded = jwtDecode(token);
//                 const user = decoded.user ?? decoded;
//                 if (user?.role) localStorage.setItem('userRole', user.role);
//             } catch (decodeErr) {
//                 console.warn('Không thể giải mã token:', decodeErr);
//             }

//             navigate('/profile');
//         } catch (err) {
//             const msg = err?.response?.data?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
//             setError(msg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="form-card">
//             <form className="auth-form" onSubmit={onSubmit}>
//                 <h2 className="form-title">Đăng Nhập</h2>

//                 {error && <div className="error-text">{error}</div>}

//                 <input
//                     className="input"
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={onChange}
//                     placeholder="Email"
//                     required
//                 />

//                 <input
//                     className="input"
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                     placeholder="Mật khẩu"
//                     required
//                 />

//                 <button className="btn btn-primary" type="submit" disabled={loading}>
//                     {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
//                 </button>

//                 <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Link to="/forgot-password">Quên mật khẩu?</Link>
//                     <Link to="/signup" style={{ color: '#6b7280' }}>Chưa có tài khoản?</Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios'; // Dùng axios trực tiếp cho login
// import { useNavigate, Link } from 'react-router-dom';
// import './styles.css';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { email, password } = formData;
//     const navigate = useNavigate();

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
//             // ✅ LƯU CẢ HAI LOẠI TOKEN VÀ THÔNG TIN USER
//             const { accessToken, refreshToken, user } = res.data;
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             if (user?.role) {
//                 localStorage.setItem('userRole', user.role);
//             }

//             navigate('/profile');
//         } catch (err) {
//             const msg = err?.response?.data?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
//             setError(msg);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     return (
//         <div className="form-card">
//             <form className="auth-form" onSubmit={onSubmit}>
//                 <h2 className="form-title">Đăng Nhập</h2>

//                 {error && <div className="error-text">{error}</div>}

//                 <input
//                     className="input"
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={onChange}
//                     placeholder="Email"
//                     required
//                 />

//                 <input
//                     className="input"
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                     placeholder="Mật khẩu"
//                     required
//                 />

//                 <button className="btn btn-primary" type="submit" disabled={loading}>
//                     {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
//                 </button>

//                 <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Link to="/forgot-password">Quên mật khẩu?</Link>
//                     <Link to="/signup" style={{ color: '#6b7280' }}>Chưa có tài khoản?</Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;


















// //b6 hd1
// // frontend/src/components/Login.jsx

// import React, { useState } from 'react';
// import axios from 'axios'; // Vẫn có thể dùng axios thường cho login/signup
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;
//     const navigate = useNavigate();

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             // ✅ SỬA ĐỔI: API trả về accessToken, refreshToken, và user
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
//             // ✅ SỬA ĐỔI: Lưu đúng tên token
//             localStorage.setItem('accessToken', res.data.accessToken);
//             localStorage.setItem('refreshToken', res.data.refreshToken);

//             // Lưu thông tin user để dễ sử dụng (tên, role, avatar...)
//             // Thay vì decode JWT ở frontend, hãy dùng trực tiếp object user trả về từ API
//             localStorage.setItem('user', JSON.stringify(res.data.user));

//             alert('Đăng nhập thành công!');
            
//             // Reload lại trang để Navbar cập nhật trạng thái login
//             // Hoặc sử dụng Redux để quản lý state tốt hơn
//             window.location.href = '/profile';
            
//         } catch (err) {
//             console.error("CHI TIẾT LỖI:", err);
//             const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
//             alert(`Đăng nhập thất bại: ${errorMessage}`);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2>Đăng Nhập</h2>
//             <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
//             <button type="submit">Đăng Nhập</button>
//             <div style={{ marginTop: '15px', textAlign: 'center' }}>
//                 <Link to="/forgot-password">Quên mật khẩu?</Link>
//             </div>
//         </form>
//     );
// };

// export default Login;




//b6 hd2
// frontend/src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
            // Lưu các thông tin xác thực vào localStorage
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            alert('Đăng nhập thành công!');
            
            // Dùng window.location.href để buộc tải lại toàn bộ trang,
            // giúp Navbar và các component khác đọc lại dữ liệu mới từ localStorage.
            window.location.href = '/profile';
            
        } catch (err) {
            console.error("CHI TIẾT LỖI:", err);
            const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra, vui lòng thử lại.";
            alert(`Đăng nhập thất bại: ${errorMessage}`);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Đăng Nhập</h2>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
            <button type="submit">Đăng Nhập</button>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
        </form>
    );
};

export default Login;