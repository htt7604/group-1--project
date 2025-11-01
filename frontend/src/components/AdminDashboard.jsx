// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // ✅ 1. Import 'api' instance đã được cấu hình, thay vì 'axios'
// import api from '../api';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // ✅ 2. Thêm kiểm tra quyền Admin ngay khi component được tải
//         const userRole = localStorage.getItem('userRole');
//         if (userRole !== 'admin') {
//             alert('Bạn không có quyền truy cập trang này.');
//             navigate('/profile'); // Chuyển hướng về trang profile nếu không phải admin
//         } else {
//             fetchUsers();
//         }
//     }, [navigate]);

//     const fetchUsers = async () => {
//         try {
//             // ✅ 3. Dùng 'api.get' và không cần tự thêm header
//             // Interceptor trong 'api.js' sẽ tự động đính kèm 'accessToken'
//             const res = await api.get('/users');
//             setUsers(res.data);
//         } catch (err) {
//             // Interceptor đã xử lý lỗi 401, chỉ hiển thị các lỗi khác
//             alert(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
//         }
//     };

//     const handleDelete = async (userId) => {
//         if (window.confirm('Bạn có chắc chắn muốn XÓA người dùng này không?')) {
//             try {
//                 // ✅ 4. Dùng 'api.delete' và không cần tự thêm header
//                 await api.delete(`/users/${userId}`);
//                 alert('Xóa thành công!');
//                 fetchUsers(); // Tải lại danh sách
//             } catch (err) {
//                 alert(err.response?.data?.message || 'Xóa thất bại.');
//             }
//         }
//     };

//     const handleResetPassword = async (email) => {
//         if (window.confirm(`Bạn có chắc chắn muốn gửi email RESET MẬT KHẨU đến ${email} không?`)) {
//             try {
//                 // ✅ 5. Dùng 'api.post'
//                 const res = await api.post('/auth/forgot-password', { email });
//                 alert(res.data.message);
//             } catch (err) {
//                 alert(err.response?.data?.message || 'Gửi email thất bại.');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Quản lý người dùng</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Tên</th>
//                         <th>Email</th>
//                         <th>Vai trò</th>
//                         <th>Hành động</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td><button onClick={() => handleDelete(user._id)} style={{marginRight: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}>Xóa</button>
//                                 <button onClick={() => handleResetPassword(user.email)} style={{backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer'}}>Reset Mật khẩu</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;





// //b6 hd1
// // frontend/src/components/AdminDashboard.jsx

// import React, { useState, useEffect } from 'react';
// // ✅ 1. Import axiosInstance
// import axiosInstance from '../api/axiosInstance';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchUsers = async () => {
//         try {
//             // ✅ 2. Dùng axiosInstance, không cần header
//             const res = await axiosInstance.get('/users');
//             setUsers(res.data);
//         } catch (err) {
//             alert(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleDelete = async (userId) => {
//         if (window.confirm('Bạn có chắc chắn muốn XÓA người dùng này không?')) {
//             try {
//                 // ✅ 3. Dùng axiosInstance để xóa
//                 await axiosInstance.delete(`/users/${userId}`);
//                 alert('Xóa thành công!');
//                 fetchUsers(); // Tải lại danh sách
//             } catch (err) {
//                 alert(err.response?.data?.message || 'Xóa thất bại.');
//             }
//         }
//     };

//     const handleResetPassword = async (email) => {
//         if (window.confirm(`Bạn có chắc chắn muốn gửi email RESET MẬT KHẨU đến ${email} không?`)) {
//             try {
//                 // ✅ 4. Dùng axiosInstance cho cả các API không cần xác thực để code được nhất quán
//                 const res = await axiosInstance.post('/auth/forgot-password', { email });
//                 alert(res.data.message);
//             } catch (err) {
//                 alert(err.response?.data?.message || 'Gửi email thất bại.');
//             }
//         }
//     };
    
//     if (loading) return <div>Đang tải danh sách người dùng...</div>;

//     return (
//         <div>
//             <h2>Quản lý người dùng</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Tên</th>
//                         <th>Email</th>
//                         <th>Vai trò</th>
//                         <th>Hành động</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <button onClick={() => handleDelete(user._id)} style={{marginRight: '5px', backgroundColor: '#dc3545'}}>Xóa</button>//                                 <button onClick={() => handleResetPassword(user.email)} style={{backgroundColor: '#ffc107'}}>Reset Mật khẩu</button>
//                              </td>
//                          </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;




















//b6 hd2
// frontend/src/components/AdminDashboard.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Lấy thông tin của người dùng đang đăng nhập để kiểm tra quyền
    const currentUserString = localStorage.getItem('user');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    const fetchUsers = useCallback(async () => {
        try {
            const res = await axiosInstance.get('/users');
            setUsers(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn XÓA người dùng này không?')) {
            try {
                await axiosInstance.delete(`/users/${userId}`);
                alert('Xóa thành công!');
                fetchUsers(); // Tải lại danh sách sau khi xóa
            } catch (err) {
                alert(err.response?.data?.message || 'Xóa thất bại.');
            }
        }
    };

    const handleResetPassword = async (email) => {
        if (window.confirm(`Bạn có chắc muốn gửi email RESET MẬT KHẨU đến ${email} không?`)) {
            try {
                const res = await axiosInstance.post('/auth/forgot-password', { email });
                alert(res.data.message);
            } catch (err) {
                alert(err.response?.data?.message || 'Gửi email thất bại.');
            }
        }
    };
    
    if (loading) return <div>Đang tải danh sách người dùng...</div>;

    return (
        <div>
            <h2>Quản lý người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        // ✅ SỬA LỖI: So sánh user._id với currentUser.id
                        const isDeleteDisabled = 
                            (user.role === 'admin' && currentUser?.role === 'moderator') || 
                            (user._id === currentUser?.id);

                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    < button onClick={() => handleDelete(user._id)} 
                                        style={{ 
                                            marginRight: '5px', 
                                            backgroundColor: isDeleteDisabled ? '#6c757d' : '#dc3545',
                                            cursor: isDeleteDisabled ? 'not-allowed' : 'pointer'
                                        }}
                                        disabled={isDeleteDisabled}
                                    >
                                        Xóa
                                    </button>
                                    <button onClick={() => handleResetPassword(user.email)} style={{backgroundColor: '#ffc107'}}>Reset Mật khẩu</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;