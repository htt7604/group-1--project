1) Tổng quan thay đổi

Backend:

Thêm model RefreshToken.

Thêm route POST /auth/refresh, POST /auth/logout (xóa refresh token), sửa POST /auth/login để trả về accessToken + refreshToken.

Thêm middleware xác thực JWT (authMiddleware.js).

Thêm logging (morgan/winston) & rate limiting (express-rate-limit).

Frontend:

Lưu accessToken + refreshToken vào localStorage.

Tạo axios instance với interceptor xử lý 401 -> gọi /auth/refresh để lấy accessToken mới, retry request cũ.

Tạo Redux slice (hoặc context) để lưu trạng thái auth, logout khi refresh fail.

ProtectedRoute component cho React Router.

Database:

Schema RefreshToken lưu token, userId, expiresAt.

Test:

Hướng dẫn Postman: login -> nhận tokens, refresh -> nhận accessToken mới, logout -> token bị revoke.

Git:

Branch feature/refresh-token, commit message ví dụ, PR link.

2) Backend — code đầy đủ (Node + Express + Mongoose)

Chèn các file dưới đây vào backend/ của project. Nếu project của bạn đã có server.js, routes/auth.js, models/User.js thì sao chép / sửa chỗ tương ứng.

2.1 Cài thêm dependencies

Mở terminal trong folder backend và chạy:

npm install jsonwebtoken bcryptjs express-rate-limit morgan dotenv


(nếu dùng winston thay morgan, bạn có thể thêm winston nhưng morgan đủ để bắt đầu)

2.2 backend/models/RefreshToken.js

Tạo file: backend/models/RefreshToken.js

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);

2.3 Sửa/Thêm route auth: backend/routes/auth.js

Nếu repo đã có file auth, hãy merge logic này; nếu không, tạo mới backend/routes/auth.js:

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // đảm bảo đường dẫn chính xác
const RefreshToken = require('../models/RefreshToken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_example';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_example';
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m'; // short lived
const REFRESH_TOKEN_EXPIRES_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || '7'); // days

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: `${REFRESH_TOKEN_EXPIRES_DAYS}d` });
}

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // lưu refresh token vào DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt
    });

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// REFRESH
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

    // tìm token trong DB
    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored) return res.status(403).json({ message: 'Refresh token not found or expired' });

    // verify token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        // token không hợp lệ -> xóa trong DB nếu có
        await RefreshToken.deleteOne({ token: refreshToken }).catch(()=>{});
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // optional: check if token expired by comparing expiresAt
      if (new Date() > stored.expiresAt) {
        await RefreshToken.deleteOne({ token: refreshToken }).catch(()=>{});
        return res.status(403).json({ message: 'Refresh token expired' });
      }

      // tạo access token mới
      const user = { _id: payload.id, email: payload.email };
      const newAccessToken = jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });

      return res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGOUT - revoke refresh token
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

    await RefreshToken.deleteOne({ token: refreshToken });
    res.json({ message: 'Logged out (refresh token revoked)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


Ghi chú: nếu User model của bạn lưu mật khẩu dưới dạng khác, đảm bảo bcrypt.compare khớp. Nếu bạn dùng social login, cơ chế có thể khác.

2.4 Middleware xác thực Access Token: backend/middleware/authMiddleware.js

Tạo file:

const jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_example';

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Malformed token' });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // token invalid or expired
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // chứa id, email
    next();
  });
};

2.5 Sửa server.js (hoặc file khởi tạo Express)

Mở backend/server.js (hoặc file tương tự) và:

import morgan, express-rate-limit

mount route /auth từ routes/auth.js

mount middleware rate limiter, bodyParser, etc.

Ví dụ backend/server.js (mẫu):

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));

// rate limiter (ví dụ 100 requests / 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use(limiter);

// routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ví dụ protected route
const authMiddleware = require('./middleware/authMiddleware');
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Bạn đã truy cập route được bảo vệ', user: req.user });
});

// kết nối DB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/group1project';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connect error', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

2.6 .env (ví dụ)

Tạo .env ở backend/:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/group1project
ACCESS_TOKEN_SECRET=your_access_secret_long_random_string
REFRESH_TOKEN_SECRET=your_refresh_secret_long_random_string
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES_DAYS=7


Lưu ý: dùng secrets đủ dài, không commit .env lên git.

3) Frontend — React + Redux + axios interceptor

Chèn vào thư mục frontend/. Mình đưa code dạng file để dán vào project.

3.1 Cài dependencies (frontend)

Trong frontend:

npm install axios @reduxjs/toolkit react-redux

3.2 Tạo axios instance: frontend/src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor: gắn access token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// response interceptor: handle 401 -> try refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  })
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // nếu 401 và chưa retry
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // đang refresh => queue request
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // không có refresh token -> logout flow
        isRefreshing = false;
        // optional: dispatch logout event
        window.dispatchEvent(new Event('auth-logout'));
        return Promise.reject(error);
      }

      try {
        const resp = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
        const newAccessToken = resp.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);
        isRefreshing = false;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        // refresh fail -> logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth-logout'));
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;


Giải thích: interceptor sẽ tự động gọi /auth/refresh nếu gặp 401. Các request trong lúc refresh sẽ queue lại.

3.3 Redux slice (ví dụ) frontend/src/store/authSlice.js

Nếu bạn dùng Redux Toolkit:

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setAccessToken(state, action) {
      localStorage.setItem('accessToken', action.payload);
    }
  }
});

export const { loginSuccess, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;

3.4 ProtectedRoute component frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

3.5 Login flow (ví dụ)

Trong component login khi gọi API /auth/login:

import api from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

async function handleLogin(email, password) {
  try {
    const res = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = res.data;
    dispatch(loginSuccess({ accessToken, refreshToken, user }));
    // redirect to protected page
  } catch (err) {
    console.error(err);
  }
}

3.6 Xử lý logout (frontend)

Khi user logout:

// gọi API /auth/logout (optionally)
await api.post('/auth/logout', { refreshToken: localStorage.getItem('refreshToken') }).catch(()=>{});
dispatch(logout());


Ghi chú: luôn gửi refreshToken để server xóa token đó.

4) Postman test steps (Ảnh chụp / screenshot cần nộp)

Tạo collection Postman với 3 request chính:

POST /auth/login

URL: http://localhost:5000/auth/login

Body (JSON): { "email": "test@example.com", "password": "password123" }

Response: { accessToken, refreshToken, user }

Lưu accessToken & refreshToken từ response.

GET /protected (ví dụ route cần authorization)

URL: http://localhost:5000/protected

Header: Authorization: Bearer <accessToken>

Nếu accessToken còn hạn -> 200.

Nếu accessToken hết hạn -> server trả 401.

POST /auth/refresh

URL: http://localhost:5000/auth/refresh

Body: { "refreshToken": "<refreshToken>" }

Response: { accessToken: "..." }

Dùng accessToken mới để gọi lại /protected -> confirm success.

POST /auth/logout

URL: http://localhost:5000/auth/logout

Body: { "refreshToken": "<refreshToken>" }

Sau logout, gọi /auth/refresh với cùng refreshToken => 403.

Chụp ảnh Postman (Requests/Responses) để nộp: chụp màn hình responses của login, refresh, logout.

5) Hướng dẫn chạy & kiểm tra
Backend

Tạo .env như phần trên.

cd backend

npm install

node server.js hoặc npm start (tùy script)

Tạo user test (nếu chưa có): tạo bằng script seed hoặc đăng ký qua API /auth/register (nếu bạn đã có route register). Nếu không có register, bạn có thể tạo user trực tiếp trong Mongo shell hoặc thêm route tạm để tạo user (mình có thể gửi mẫu nhanh nếu cần).

Frontend

cd frontend

npm install

Tạo file .env nếu cần: REACT_APP_API_URL=http://localhost:5000

npm start

Kiểm tra:

Login từ frontend -> localStorage có accessToken & refreshToken.

Tắt server hoặc chờ accessToken hết hạn (hoặc giảm thời gian ACCESS_TOKEN_EXPIRES < 1m để test nhanh), gọi request cần auth -> frontend interceptor tự gọi /auth/refresh và retry request.

Logout -> refresh token bị xóa DB -> gọi /auth/refresh với token cũ sẽ fail.

6) Git flow & PR

Tạo nhánh feature, commit, push:

# backend
cd backend
git checkout -b feature/refresh-token
git add .
git commit -m "Thêm tính năng Refresh Token, middleware xác thực, logging, rate limit"
git push origin feature/refresh-token


Tương tự cho frontend (nếu bạn tách repo hoặc mono-repo):

cd frontend
git checkout -b feature/refresh-token-frontend
git add .
git commit -m "Frontend: axios interceptor + redux auth để tự refresh token"
git push origin feature/refresh-token-frontend


Tạo Pull Request trên GitHub từ branch đó -> merge.

Sản phẩm nộp:

Ảnh Postman test /auth/refresh (login -> refresh -> protected).

Ảnh/clip frontend tự refresh token (ghi màn hình khi accessToken hết hạn).

Link PR GitHub (branch feature/refresh-token).

7) Những điểm cần lưu ý & bảo mật

Refresh tokens cần bảo vệ: lưu trữ an toàn (DB, không trong localStorage nếu security policy yêu cầu). Ở demo dùng localStorage vì dễ test; production nên cân nhắc HttpOnly cookie.

Xóa token khi logout: luôn xóa refresh token ở DB.

Token rotation (nâng cao): để an toàn hơn, khi refresh ban nên issue cũng một refreshToken mới và xoá token cũ (rotate). Mình có thể bổ sung logic rotation nếu bạn muốn.

Blacklist / revoke: nếu user bị ban, xóa tất cả refresh token liên quan.

Rate limit / brute force: giữ express-rate-limit cho route login & refresh.

HTTPS: phải dùng HTTPS khi deploy.

8) Nếu bạn muốn — mình tiếp tục làm giúp (tự động hơn)

Mình có thể tiếp tục (miễn là bạn cho phép):

Tạo patch (diff) sẵn sàng để bạn git apply — mình có thể sinh nội dung patch/zip các file được chỉnh sửa để bạn tải về và apply.

Hoặc mình có thể viết thêm unit tests / Postman collection file (.json) để bạn import trực tiếp.

Hoặc bổ sung token rotation (một lớp bảo mật nữa), hoặc chuyển refresh token sang HttpOnly cookie.

Bạn muốn mình sinh luôn:

Patch / ZIP các file để bạn download (mình sẽ tạo nội dung sẵn để bạn copy).

Hoặc Postman collection JSON để import (mình xuất JSON mẫu)?

Chỉ chọn 1 trong 2 — mình sẽ cung cấp ngay trong tin nhắn tiếp theo toàn bộ file/JSON hoặc patch. (Mình sẽ không hỏi lại chi tiết kỹ hơn — mình đã giả định backend Express + Mongoose và frontend React + Redux như repo của bạn hiển thị.)

Bạn muốn mình tiếp tục và:

A: Tạo patch / zip các file backend + frontend (để bạn download và áp dụng), hoặc

B: Tạo Postman collection .json (bạn import trực tiếp) ?

Chọn A hoặc B — mình sẽ đính kèm nội dung tương ứng ngay.