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
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
			const token = res.data.token;
			localStorage.setItem('token', token);

			// Giải mã token để lấy role nếu có
			try {
				const decoded = jwtDecode(token);
				const user = decoded.user ?? decoded;
				if (user?.role) localStorage.setItem('userRole', user.role);
			} catch (decodeErr) {
				console.warn('Không thể giải mã token:', decodeErr);
			}

			navigate('/profile');
		} catch (err) {
			const msg = err?.response?.data?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
			setError(msg);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="form-card">
			<form className="auth-form" onSubmit={onSubmit}>
				<h2 className="form-title">Đăng Nhập</h2>

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

				{error && <div className="error-text">{error}</div>}

				<button className="btn btn-primary" type="submit" disabled={loading}>
					{loading ? 'Đang xử lý...' : 'Đăng Nhập'}
				</button>
			</form>
		</div>
	);
};

export default Login;