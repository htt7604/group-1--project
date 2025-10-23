// // components/Signup.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './styles.css'; // thêm import CSS

// const Signup = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//     const { name, email, password, confirmPassword } = formData;
//     const [error, setError] = useState('');

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         setError('');
//         if (password !== confirmPassword) {
//             setError('Mật khẩu không khớp');
//             return;
//         }
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password });
//             console.log('Đăng ký thành công!', res.data);
//             // chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
//             window.location.href = '/login';
//         } catch (err) {
//             const msg = err?.response?.data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.';
//             console.error('Lỗi đăng ký:', err);
//             setError(msg);
//             alert(`Đăng ký thất bại: ${msg}`);
//         }
//     };

//     return (
//         <div className="form-card">
//             <form className="auth-form" onSubmit={onSubmit}>
//                 <h2 className="form-title">Đăng Ký</h2>
//                 <input className="input" type="text" name="name" value={name} onChange={onChange} placeholder="Tên" required />
//                 <input className="input" type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//                 <input
//                     className={`input ${password && confirmPassword && password !== confirmPassword ? 'invalid' : ''}`}
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                     placeholder="Mật khẩu"
//                     required
//                 />
//                 <input
//                     className={`input ${password && confirmPassword && password !== confirmPassword ? 'invalid' : ''}`}
//                     type="password"
//                     name="confirmPassword"
//                     value={confirmPassword}
//                     onChange={onChange}
//                     placeholder="Nhập lại mật khẩu"
//                     required
//                 />
//                 {error && <div className="error-text">{error}</div>}
//                 <button className="btn btn-primary" type="submit" disabled={password !== confirmPassword || !password}>Đăng Ký</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import './styles.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const { name, email, password, confirmPassword } = formData;
    const [error, setError] = useState('');
    const navigate = useNavigate(); // ✅ Khởi tạo

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/auth/signup', { name, email, password });
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login'); // ✅ Sửa ở đây
        } catch (err) {
            const msg = err?.response?.data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.';
            setError(msg);
        }
    };
    
    return (
        <div className="form-card">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="form-title">Đăng Ký</h2>
                <input className="input" type="text" name="name" value={name} onChange={onChange} placeholder="Tên" required />
                <input className="input" type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input
                    className={`input ${password && confirmPassword && password !== confirmPassword ? 'invalid' : ''}`}
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Mật khẩu"
                    required
                />
                <input
                    className={`input ${password && confirmPassword && password !== confirmPassword ? 'invalid' : ''}`}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="Nhập lại mật khẩu"
                    required
                />
                {error && <div className="error-text">{error}</div>}
                <button className="btn btn-primary" type="submit" disabled={password !== confirmPassword || !password}>Đăng Ký</button>
            </form>
        </div>
    );
};

export default Signup;