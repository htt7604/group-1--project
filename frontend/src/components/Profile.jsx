// //4 update avatar
// // frontend/src/components/Profile.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     // State cho chức năng upload avatar
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const token = localStorage.getItem('token');
            
//             if (!token) {
//                 alert('Vui lòng đăng nhập để truy cập trang này.');
//                 navigate('/login');
//                 return;
//             }

//             try {
//                 const res = await axios.get('http://localhost:3000/api/users/profile', {
//                     headers: { 'x-auth-token': token }
//                 });
//                 setUser(res.data);
//                 setName(res.data.name);
//             } catch (err) {
//                 console.error('Lỗi lấy profile:', err);
//                 setError('Không thể tải thông tin. Vui lòng đăng nhập lại.');
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('userRole');
//                 navigate('/login');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, [navigate]);

//     // Hàm xử lý cập nhật tên
//     const handleNameUpdate = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         try {
//             const res = await axios.put('http://localhost:3000/api/users/profile', { name }, {
//                 headers: { 'x-auth-token': token }
//             });
//             setUser(res.data);
//             alert('Cập nhật tên thành công!');
//         } catch (err) {
//             console.error('Lỗi cập nhật tên:', err);
//             alert('Cập nhật tên thất bại.');
//         }
//     };

//     // Hàm xử lý upload avatar
//     const handleAvatarUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert('Vui lòng chọn một file ảnh!');
//             return;
//         }
//         setUploading(true);

//         const formData = new FormData();
//         formData.append('avatar', file);

//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.put('http://localhost:3000/api/users/profile/avatar', formData, {
//                 headers: {
//                     'x-auth-token': token,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(res.data.message);
//             // Cập nhật lại state user để hiển thị avatar mới
// setUser(prevUser => ({ ...prevUser, avatar: res.data.avatarUrl }));
//         } catch (err) {
//             alert(err.response?.data?.message || 'Upload thất bại.');
//         } finally {
//             setUploading(false);
//             setFile(null); // Reset file input
//         }
//     };


//     if (loading) return <div>Đang tải...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;
//     if (!user) return <div>Không có thông tin người dùng.</div>;

//     return (
//         <div>
//             <h2>Trang cá nhân</h2>
            
//             {/* Phần hiển thị và upload avatar */}
//             <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//                 <img 
//                     src={user.avatar} 
//                     alt="Avatar" 
//                     width="150" 
//                     height="150"
//                     style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #ddd' }} 
//                 />
//                 <form onSubmit={handleAvatarUpload} style={{ marginTop: '10px' }}>
//                     <label>Thay đổi ảnh đại diện:</label>
//                     <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
//                     <button type="submit" disabled={uploading}>
//                         {uploading ? 'Đang tải lên...' : 'Tải lên'}
//                     </button>
//                 </form>
//             </div>
            
//             <hr />

//             {/* Phần thông tin và cập nhật tên */}
//             <p><strong>Email:</strong> {user.email}</p>
//             <form onSubmit={handleNameUpdate}>
//                 <label><strong>Tên:</strong></label>
//                 <input type="text" value={name} onChange={e => setName(e.target.value)} required />
//                 <button type="submit">Cập nhật tên</button>
//             </form>
//         </div>
//     );
// };

// export default Profile;


// // ### **Cách sử dụng instance `api` mới này**

// // Bây giờ, thay vì import `axios` trực tiếp trong các component của bạn, bạn sẽ import instance `api` này.

// // **Ví dụ trong `Profile.jsx`:**

// // ```jsx
// // // frontend/src/components/Profile.jsx
// // import React, { useState, useEffect } from 'react';
// // // ✅ Import instance 'api' thay vì 'axios'
// // import api from '../api'; 
// // import { useNavigate } from 'react-router-dom';

// // const Profile = () => {
// //     // ... (state và các hàm khác)

// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             // ... (kiểm tra token không cần thiết nữa vì interceptor làm rồi)
// //             try {
// //                 // ✅ Sử dụng 'api.get' thay vì 'axios.get'
// //                 // Interceptor sẽ tự động đính kèm token
// //                 const res = await api.get('/users/profile'); 
// //                 setUser(res.data);
// //                 setName(res.data.name);
// //             } catch (err) {
// //                  // Interceptor cũng sẽ tự động xử lý lỗi 401 và refresh token
// //                  // Nếu refresh thất bại, nó sẽ tự chuyển hướng về login
// //                  // Chỉ cần xử lý các lỗi khác ở đây nếu cần
// //                  console.error('Lỗi không phải 401 khi lấy profile:', err);
// //                  setError('Không thể tải thông tin.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchProfile();
// //     }, [navigate]);

// //     // ✅ Tương tự khi cập nhật profile
// //     const handleNameUpdate = async (e) => {
// //         e.preventDefault();
// //         try {
// //             // ✅ Dùng 'api.put'
// //             const res = await api.put('/users/profile', { name });
// //             setUser(res.data);
// //             alert('Cập nhật tên thành công!');
// //         } catch (err) {
// //             console.error('Lỗi cập nhật tên:', err);
// //             alert('Cập nhật tên thất bại.');
// //         }
// //     };
    
// //     // ✅ Tương tự khi upload avatar
// //     const handleAvatarUpload = async (e) => {
// //         // ... (xử lý formData)
// //         try {
// //             // ✅ Dùng 'api.put'
// //             const res = await api.put('/users/profile/avatar', formData, {
// //                  headers: { 'Content-Type': 'multipart/form-data' }, // Chỉ cần set Content-Type ở đây
// //             });
// //             // ...
// //         } catch (err) {
// //            // ...
// //         } // ...
// //     };


// //     // ... (phần return JSX)
// // };

// import React, { useState, useEffect } from 'react';
// // ✅ 1. Import 'api' instance đã được cấu hình
// import api from '../api'; 
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 // ✅ 2. Dùng 'api.get'. Interceptor sẽ tự động đính kèm 'accessToken'
//                 const res = await api.get('/users/profile'); 
                
//                 setUser(res.data);
//                 setName(res.data.name);
//             } catch (err) {
//                 // Interceptor đã tự xử lý lỗi 401 và chuyển hướng nếu cần
//                 console.error('Lỗi khi tải profile:', err);
//                 setError('Không thể tải thông tin người dùng.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []); // Bỏ 'navigate' khỏi dependency array vì nó không được dùng trong logic này

//     // Hàm cập nhật tên
//     const handleNameUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             // ✅ 3. Dùng 'api.put'
//             const res = await api.put('/users/profile', { name });
//             setUser(res.data);
//             alert('Cập nhật tên thành công!');
//         } catch (err) {
//             alert(err.response?.data?.message || 'Cập nhật tên thất bại.');
//         }
//     };

//     // Hàm upload avatar
//     const handleAvatarUpload = async (e) => {
//         e.preventDefault();
//         if (!file) return alert('Vui lòng chọn ảnh!');
//         setUploading(true);
//         const formData = new FormData();
//         formData.append('avatar', file);

//         try {
//             // ✅ 4. Dùng 'api.put' và chỉ cần set Content-Type
//             const res = await api.put('/users/profile/avatar', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setUser(prev => ({ ...prev, avatar: res.data.avatarUrl }));
//             alert(res.data.message);
//         } catch (err) {
//             alert(err.response?.data?.message || 'Upload thất bại.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     if (loading) return <div>Đang tải...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;
//     if (!user) return <div>Không có thông tin người dùng.</div>;

//     // ... (Phần JSX return giữ nguyên như cũ)
//     return (
//         <div>
//             <h2>Trang cá nhân</h2>
//             <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//                 <img 
//                     src={user.avatar}alt="Avatar" 
//                     width="150" 
//                     height="150"
//                     style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #ddd' }} 
//                 />
//                 <form onSubmit={handleAvatarUpload} style={{ marginTop: '10px' }}>
//                     <label>Thay đổi ảnh đại diện:</label>
//                     <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
//                     <button type="submit" disabled={uploading}>
//                         {uploading ? 'Đang tải lên...' : 'Tải lên'}
//                     </button>
//                 </form>
//             </div>
//             <hr />
//             <p><strong>Email:</strong> {user.email}</p>
//             <form onSubmit={handleNameUpdate}>
//                 <label><strong>Tên:</strong></label>
//                 <input type="text" value={name} onChange={e => setName(e.target.value)} required />
//                 <button type="submit">Cập nhật tên</button>
//             </form>
//         </div>
//     );
// };

// export default Profile;
























// //b6 hd1
// // frontend/src/components/Profile.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // ✅ 1. Import axiosInstance thay vì axios thường
// import axiosInstance from '../api/axiosInstance';

// const Profile = () => {
//     // ✅ 2. Lấy thông tin user ban đầu từ localStorage để UI hiển thị ngay lập tức
//     const initialUser = JSON.parse(localStorage.getItem('user'));
    
//     const [user, setUser] = useState(initialUser);
//     const [name, setName] = useState(initialUser?.name || '');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Nếu không có user ban đầu, chuyển hướng luôn
//         if (!initialUser) {
//             alert('Vui lòng đăng nhập để truy cập trang này.');
//             navigate('/login');
//             return;
//         }

//         const fetchProfile = async () => {
//             try {
//                 // ✅ 3. Dùng axiosInstance, không cần get token hay set header thủ công
//                 const res = await axiosInstance.get('/users/profile');
//                 setUser(res.data);
//                 setName(res.data.name);
//                 // Cập nhật lại user trong localStorage nếu có thay đổi từ server
//                 localStorage.setItem('user', JSON.stringify(res.data));
//             } catch (err) {
//                 console.error('Lỗi lấy profile:', err);
//                 // axiosInstance sẽ tự động xử lý việc logout nếu refresh token thất bại
//                 setError('Không thể tải thông tin mới nhất.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, [navigate]);

//     const handleNameUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             // ✅ 4. Dùng axiosInstance, code gọn gàng hơn rất nhiều
//             const res = await axiosInstance.put('/users/profile', { name });
//             setUser(res.data);
//             localStorage.setItem('user', JSON.stringify(res.data)); // Cập nhật lại localStorage
//             alert('Cập nhật tên thành công!');
//         } catch (err) {
//             console.error('Lỗi cập nhật tên:', err);
//             alert('Cập nhật tên thất bại.');
//         }
//     };

//     const handleAvatarUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert('Vui lòng chọn một file ảnh!');
//             return;
//         }
//         setUploading(true);

//         const formData = new FormData();
//         formData.append('avatar', file);

//         try {//             // ✅ 5. Dùng axiosInstance cho cả việc upload file
//             const res = await axiosInstance.post('/users/avatar', formData, {
//                 // Header 'Content-Type' vẫn cần thiết cho việc upload file
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             alert('Upload avatar thành công!');
            
//             // ✅ 6. Cập nhật lại state và localStorage với avatar URL mới
//             const updatedUser = { ...user, avatar: res.data.avatar };
//             setUser(updatedUser);
//             localStorage.setItem('user', JSON.stringify(updatedUser));
            
//         } catch (err) {
//             alert(err.response?.data?.message || 'Upload thất bại.');
//         } finally {
//             setUploading(false);
//             setFile(null);
//         }
//     };

//     if (loading && !user) return <div>Đang tải...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;
//     if (!user) return <div>Không có thông tin người dùng. Vui lòng đăng nhập.</div>;

//     return (
//         <div>
//             <h2>Trang cá nhân</h2>
            
//             <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//                 <img 
//                     src={user.avatar} 
//                     alt="Avatar" 
//                     width="150" 
//                     height="150"
//                     style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #ddd' }} 
//                 />
//                 <form onSubmit={handleAvatarUpload} style={{ marginTop: '10px' }}>
//                     <label>Thay đổi ảnh đại diện:</label>
//                     <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
//                     <button type="submit" disabled={uploading}>
//                         {uploading ? 'Đang tải lên...' : 'Tải lên'}
//                     </button>
//                 </form>
//             </div>
            
//             <hr />

//             <p><strong>Email:</strong> {user.email}</p>
//             <form onSubmit={handleNameUpdate}>
//                 <label><strong>Tên:</strong></label>
//                 <input type="text" value={name} onChange={e => setName(e.target.value)} required />
//                 <button type="submit">Cập nhật tên</button>
//             </form>
//         </div>
//     );
// };

// export default Profile;


































//b6 hd3
// backend/controllers/userController.js
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp'); // ✅ 1. Import thư viện sharp

// --- CÁC HÀM MỚI CHO PROFILE CÁ NHÂN ---

// [GET] /api/users/profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// [PUT] /api/users/profile
exports.updateProfile = async (req, res) => {
    const { name } = req.body; // Chỉ cho phép cập nhật tên ở đây
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { name }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// --- CÁC HÀM DÀNH CHO ADMIN ---

// [GET] /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// [DELETE] /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ message: "Không tìm thấy người dùng để xóa." });
        }
        const requestingUser = req.user;
        if (userToDelete.role === 'admin' && requestingUser.role === 'moderator') {
            return res.status(403).json({ message: 'Bạn không có quyền xóa tài khoản Admin.' });
        }
        if (userToDelete.id === requestingUser.id) {
            return res.status(400).json({ message: 'Bạn không thể tự xóa chính mình.' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Người dùng đã được xóa thành công." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});// // ✅ 2. SỬA LẠI HÀM NÀY ĐỂ THÊM SHARP
// [POST] /api/users/avatar - Cập nhật ảnh đại diện
exports.updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
        }

        // Dùng sharp để xử lý ảnh: resize thành hình vuông 250x250 và chuyển sang PNG
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(250, 250)
            .png()
            .toBuffer();

        // Chuyển buffer đã xử lý thành dạng mà Cloudinary có thể đọc
        const base64Image = processedImageBuffer.toString('base64');
        const dataUri = `data:image/png;base64,${base64Image}`;

        // Tải ảnh đã xử lý lên Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: 'avatars' // Lưu vào thư mục 'avatars' trên Cloudinary
        });

        // Cập nhật lại đường dẫn avatar cho user trong DB
        const user = await User.findByIdAndUpdate(
            req.user.id, 
            { avatar: result.secure_url }, 
            { new: true }
        ).select('-password');

        res.status(200).json({
            message: 'Upload avatar thành công!',
            avatar: user.avatar, // ✅ 3. Trả về key `avatar` để khớp với frontend
        });
    } catch (err) {
        console.error("Lỗi upload avatar:", err);
        res.status(500).json({ message: 'Lỗi máy chủ khi upload ảnh.' });
    }
};








