// frontend/src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
            setSuccess(res.data.message || 'Vui lòng kiểm tra email để lấy hướng dẫn đặt lại mật khẩu.');
            // Tự chuyển về login sau 3 giây
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Quên Mật khẩu</h2>
                <p style={{ margin: 0, color: '#6b7280' }}>Nhập email của bạn để đặt lại mật khẩu.</p>

                {error && <div className="error-text" style={{ marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', fontWeight: 700, marginTop: 8 }}>{success}</div>}

                <input
                    className="input"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginTop: 8 }}
                />

                <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 6 }}>
                    {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </button>

                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <Link to="/login">Quay về Đăng nhập</Link>
                    <Link to="/signup" style={{ color: '#6b7280' }}>Đăng ký</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;