// import axios from 'axios';
// import { store } from '../redux/store';
// import { setAccessToken, logout } from '../redux/authSlice';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // sửa nếu backend URL khác
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor: gắn access token nếu có
// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.auth.accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// // Response interceptor: nếu nhận 401 hoặc 403 vì token hết hạn, thử refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = store.getState().auth.refreshToken;
//       if (refreshToken) {
//         try {
//           const response = await axios.post(`${api.defaults.baseURL}/api/auth/refresh`, { refreshToken });
//           const newAccessToken = response.data.accessToken;
//           store.dispatch(setAccessToken(newAccessToken));
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         } catch (err) {
//           store.dispatch(logout());
//           window.location.href = '/login';
//           return Promise.reject(err);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;




// //b6 hd1
// // frontend/src/api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api', // URL backend của bạn
// });

// // Interceptor để thêm Access Token vào header mỗi request
// axiosInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         config.headers['x-auth-token'] = token;
//     }
//     return config;
// }, error => Promise.reject(error));

// // Interceptor để xử lý khi Access Token hết hạn (lỗi 401)
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 const res = await axios.post('http://localhost:3000/api/auth/refresh', { token: refreshToken });
//                 const { accessToken } = res.data;
//                 localStorage.setItem('accessToken', accessToken);
//                 axiosInstance.defaults.headers.common['x-auth-token'] = accessToken;
//                 originalRequest.headers['x-auth-token'] = accessToken;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 // Xử lý khi refresh token cũng thất bại (hết hạn, không hợp lệ)
//                 // -> Đăng xuất người dùng
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 localStorage.removeItem('user');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;











// frontend/src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // URL backend của bạn
});

// Interceptor để thêm Access Token vào header mỗi request
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => Promise.reject(error));

// Interceptor để xử lý khi Access Token hết hạn (lỗi 401)
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // ✅ SỬA LỖI: Thêm 2 dòng này
        // Kiểm tra xem lỗi có phải từ trang login hay refresh không
        const isAuthRoute = originalRequest.url.endsWith('/auth/login') || originalRequest.url.endsWith('/auth/refresh');

        // ✅ SỬA LỖI: Thêm điều kiện "!isAuthRoute" vào đây
        // Chỉ refresh token nếu đây là lỗi 401, CHƯA thử lại, VÀ KHÔNG PHẢI là trang login/refresh
        if (error.response.status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // Phải dùng axios gốc để gọi refresh, tránh vòng lặp vô tận
                const res = await axios.post('http://localhost:3000/api/auth/refresh', { token: refreshToken });
                
                const { accessToken } = res.data;
                localStorage.setItem('accessToken', accessToken);
                
                // Cập nhật token cho các request sau này
                axiosInstance.defaults.headers.common['x-auth-token'] = accessToken;
                // Cập nhật token cho request hiện tại
                originalRequest.headers['x-auth-token'] = accessToken;
                
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Xử lý khi refresh token cũng thất bại (hết hạn, không hợp lệ)
                // -> Đăng xuất người dùng
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        // Trả lỗi về (ví dụ: lỗi 401 từ trang login) để Redux/component có thể bắt
        return Promise.reject(error);
    }
);

export default axiosInstance;