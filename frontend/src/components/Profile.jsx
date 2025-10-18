// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Nếu không có token, chuyển về trang đăng nhập
                navigate('/login');
                return;
            }

            setError('');
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:3000/api/users/profile', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
                setName(res.data.name);
            } catch (err) {
                console.error('Lỗi lấy profile:', err);
                setError(err?.response?.data?.message ?? 'Không thể tải thông tin người dùng.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const res = await axios.put('http://localhost:3000/api/users/profile', { name }, {
                headers: { 'x-auth-token': token }
            });
            setUser(res.data);
            setSuccess('Cập nhật thành công!');
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            setError(err?.response?.data?.message ?? 'Cập nhật thất bại. Vui lòng thử lại.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Đang tải...</div>;

    return (
        <div className="form-card" style={{ maxWidth: 520 }}>
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="form-title">Trang cá nhân</h2>

                {error && <div className="error-text" style={{ marginBottom: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', fontWeight: 600, marginBottom: 8 }}>{success}</div>}

                <label style={{ fontWeight: 700, fontSize: 14 }}>Email</label>
                <input
                    className="input"
                    type="email"
                    value={user?.email ?? ''}
                    readOnly
                    style={{ backgroundColor: '#f3f4f6' }}
                />

                <label style={{ fontWeight: 700, fontSize: 14 }}>Tên</label>
                <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                    <button className="btn btn-primary" type="submit">Cập nhật</button>
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={handleLogout}
                        style={{ alignSelf: 'center' }}
                    >
                        Đăng xuất
                    </button>
                </div>

                {user?.role && (
                    <div style={{ marginTop: 10, color: '#6b7280', fontSize: 13 }}>
                        Vai trò: <strong style={{ color: '#0f172a' }}>{user.role}</strong>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;