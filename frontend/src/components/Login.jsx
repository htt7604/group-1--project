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


import React, { useState } from 'react';
import axios from 'axios'; // Dùng axios trực tiếp cho login
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
            // ✅ LƯU CẢ HAI LOẠI TOKEN VÀ THÔNG TIN USER
            const { accessToken, refreshToken, user } = res.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (user?.role) {
                localStorage.setItem('userRole', user.role);
            }

            navigate('/profile');
        } catch (err) {
            const msg = err?.response?.data?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="form-card">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="form-title">Đăng Nhập</h2>

                {error && <div className="error-text">{error}</div>}

                <input
                    className="input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                />

                <input
                    className="input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Mật khẩu"
                    required
                />

                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                </button>

                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                    <Link to="/signup" style={{ color: '#6b7280' }}>Chưa có tài khoản?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;