// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Không tìm thấy token. Vui lòng đăng nhập lại.');
            const res = await axios.get('http://localhost:3000/api/users', {
                headers: { 'x-auth-token': token }
            });
            setUsers(res.data);
        } catch (err) {
            const msg = err?.response?.data?.message ?? err.message ?? 'Lỗi khi tải danh sách người dùng.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Không tìm thấy token. Vui lòng đăng nhập lại.');
            await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                headers: { 'x-auth-token': token }
            });
            // Remove user locally for snappy UI
            setUsers(prev => prev.filter(u => u._id !== userId));
        } catch (err) {
            const msg = err?.response?.data?.message ?? err.message ?? 'Không thể xóa người dùng.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // filter theo tên hoặc email
    const filteredUsers = users.filter(u => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (u.name ?? '').toLowerCase().includes(q) || (u.email ?? '').toLowerCase().includes(q);
    });

    // style nhẹ inline để không cần thay đổi file CSS
    const styles = {
        card: {
            background: '#fff',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 6px 20px rgba(2,6,23,0.06)',
            maxWidth: 900,
            margin: '24px auto',
        },
        headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
        controls: { display: 'flex', gap: 8, alignItems: 'center' },
        search: { padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb', minWidth: 240 },
        btn: (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }),
        table: { width: '100%', borderCollapse: 'collapse', marginTop: 12 },
        th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #eef2f7', color: '#374151' },
        td: { padding: '10px 12px', borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle' },
        roleBadge: (role) => ({
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            background: role === 'admin' ? '#ecfdf5' : '#f3f4f6',
            color: role === 'admin' ? '#047857' : '#374151'
        }),
        actionBtn: { border: 'none', padding: '6px 10px', borderRadius: 8, cursor: 'pointer', marginLeft: 8 }
    };

    return (
        <div style={styles.card}>
            <div style={styles.headerRow}>
                <h2 style={{ margin: 0, color: '#0f172a' }}>Quản lý người dùng</h2>
                <div style={styles.controls}>
                    <input
                        placeholder="Tìm theo tên hoặc email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={styles.search}
                    />
                    <button style={styles.btn('#0ea5a0')} onClick={fetchUsers} disabled={loading}>
                        Làm mới
                    </button>
                </div>
            </div>

            {error && <div style={{ color: '#b91c1c', marginBottom: 8 }}>{error}</div>}
            {loading && <div style={{ color: '#374151' }}>Đang tải...</div>}

            {!loading && filteredUsers.length === 0 ? (
                <div style={{ color: '#6b7280', padding: '16px 0' }}>Không tìm thấy người dùng.</div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Tên</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Vai trò</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td style={styles.td}><strong>{user.name}</strong></td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    <span style={styles.roleBadge(user.role)}>{user.role ?? 'user'}</span>
                                </td>
                                <td style={styles.td}>
                                    {/* Chỉ hiển thị nút Xóa */}
                                    <button
                                        style={{ ...styles.actionBtn, background: '#ef4444', color: '#fff' }}
                                        onClick={() => handleDelete(user._id)}
                                        disabled={loading}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;