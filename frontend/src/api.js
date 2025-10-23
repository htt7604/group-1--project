// // src/services/api.js
// import axios from "axios";

// const API_URL = "http://localhost:3000"; // ⚙️ Backend server URL

// // 🧩 Lấy danh sách người dùng
// export async function getUsers() {
//   const res = await axios.get(`${API_URL}/users`);
//   return res.data;
// }

// // 🧩 Thêm người dùng mới
// export async function addUser(user) {
//   const res = await axios.post(`${API_URL}/users`, user);
//   return res.data;
// }

// // 🧩 Xóa người dùng theo ID
// export async function deleteUser(id) {
//   const res = await axios.delete(`${API_URL}/users/${id}`);
//   return res.data;
// }

// import axios from 'axios';

// // 1. Tạo một instance axios với cấu hình cơ bản
// const api = axios.create({
//     baseURL: 'http://localhost:3000/api', // URL gốc cho tất cả API backend
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // 2. Interceptor cho Request: Tự động đính kèm Access Token vào header
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers['x-auth-token'] = token; // Gắn token vào header 'x-auth-token'
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // 3. Interceptor cho Response: Xử lý khi Access Token hết hạn (lỗi 401)
// api.interceptors.response.use(
//     (response) => {
//         // Nếu response thành công, trả về response đó
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // Kiểm tra xem có phải lỗi 401 (Unauthorized) và chưa thử lại request này chưa
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Đánh dấu là đã thử lại

//             try {
//                 // Lấy Refresh Token từ localStorage
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 if (!refreshToken) {
//                     // Nếu không có refresh token, chuyển hướng về login
//                     console.error("Không tìm thấy Refresh Token, đang chuyển hướng về login...");
//                     // Nên có logic logout ở đây nếu dùng Redux/Context
//                     localStorage.removeItem('accessToken');
//                     localStorage.removeItem('userRole');
//                     window.location.href = '/login';
//                     return Promise.reject(error);
//                 }

//                 // Gọi API /auth/refresh để lấy Access Token mới
//                 const response = await axios.post('http://localhost:3000/api/auth/refresh', { refreshToken });
//                 const { accessToken: newAccessToken } = response.data;

//                 // Lưu Access Token mới vào localStorage
//                 localStorage.setItem('accessToken', newAccessToken);

//                 // Cập nhật header của request gốc với token mới
//                 originalRequest.headers['x-auth-token'] = newAccessToken;

//                 // Thực hiện lại request gốc đã bị lỗi 401
//                 return api(originalRequest);

//             } catch (refreshError) {
//                 // Nếu gọi API refresh cũng thất bại (ví dụ: Refresh Token hết hạn)
//                 console.error("Lỗi khi refresh token:", refreshError);
//                 // Xóa token cũ và chuyển hướng về login
//                 localStorage.removeItem('accessToken');
// localStorage.removeItem('refreshToken');
//                 localStorage.removeItem('userRole');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         // Nếu không phải lỗi 401 hoặc đã thử lại rồi, trả về lỗi ban đầu
//         return Promise.reject(error);
//     }
// );

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Interceptor cho Request: Tự động đính kèm Access Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // ✅ SỬA LẠI Ở ĐÂY: Gửi token theo chuẩn "Bearer"
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho Response: Tự động làm mới token khi hết hạn
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const res = await axios.post('http://localhost:3000/api/auth/refresh', { refreshToken });
                const { accessToken: newAccessToken } = res.data;
                localStorage.setItem('accessToken', newAccessToken);
                // Thử lại request gốc với token mới
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token không hợp lệ:", refreshError);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;