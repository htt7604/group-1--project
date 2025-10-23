// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');

// // @route   POST api/auth/signup
// // @desc    Đăng ký user
// router.post('/signup', signup);

// // @route   POST api/auth/login
// // @desc    Đăng nhập user
// router.post('/login', login);

// module.exports = router;

// routes/auth.js
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
} = require('../controllers/authController');

// @route   POST api/auth/signup
// @desc    Đăng ký user
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Đăng nhập user
router.post('/login', login);
// Quên mật khẩu & reset
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// 🔁 Làm mới Access Token
router.post('/refresh', refreshToken);

// 🚪 Đăng xuất (xóa refresh token)
router.post('/logout', logout);

module.exports = router;