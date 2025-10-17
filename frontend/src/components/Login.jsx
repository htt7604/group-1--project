// // components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './styles.css'; // thêm import CSS

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
//             localStorage.setItem('token', res.data.token);
//             alert('Đăng nhập thành công!');
//             window.location.href = '/profile';
//         } catch (err) {
//             // In ra toàn bộ đối tượng lỗi để kiểm tra
//             console.error("CHI TIẾT LỖI:", err); 

//             // Kiểm tra và hiển thị thông báo lỗi một cách an toàn
//             const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
//             alert(`Đăng nhập thất bại: ${errorMessage}`);
//         }
//     };

//     return (
//         <div className="form-card">
//             <form className="auth-form" onSubmit={onSubmit}>
//                 <h2 className="form-title">Đăng Nhập</h2>
//                 <input className="input" type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//                 <input className="input" type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
//                 <button className="btn btn-primary" type="submit">Đăng Nhập</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import hook để điều hướng
import { jwtDecode } from 'jwt-decode';      // 2. Import thư viện giải mã token

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate(); // Khởi tạo hook

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
            // 3. Lưu token vào localStorage
            const token = res.data.token;
            localStorage.setItem('token', token);

            // 4. 🚀 GIẢI MÃ TOKEN VÀ LƯU VAI TRÒ (ROLE)
            const decodedUser = jwtDecode(token).user; // Giải mã để lấy payload { user: { id, role } }
            localStorage.setItem('userRole', decodedUser.role); // Lưu role vào localStorage

            alert('Đăng nhập thành công!');
            
            // 5. Điều hướng bằng navigate thay vì window.location.href
            navigate('/profile'); 
            
        } catch (err) {
            console.error("CHI TIẾT LỖI:", err);
            const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
            alert(`Đăng nhập thất bại: ${errorMessage}`);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Đăng Nhập</h2>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
            <button type="submit">Đăng Nhập</button>
        </form>
    );
};

export default Login;