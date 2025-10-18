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
// const { signup, login } = require('../controllers/authController');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');

// @route   POST api/auth/signup
// @desc    Đăng ký user
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Đăng nhập user
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;