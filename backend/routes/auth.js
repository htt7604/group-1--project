// // // routes/auth.js
// // const express = require('express');
// // const router = express.Router();
// // const { signup, login } = require('../controllers/authController');

// // // @route   POST api/auth/signup
// // // @desc    Đăng ký user
// // router.post('/signup', signup);

// // // @route   POST api/auth/login
// // // @desc    Đăng nhập user
// // router.post('/login', login);

// // module.exports = router;

// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   login,
//   forgotPassword,
//   resetPassword,
//   refreshToken,
//   logout,
// } = require('../controllers/authController');

// // @route   POST api/auth/signup
// // @desc    Đăng ký user
// router.post('/signup', signup);

// // @route   POST api/auth/login
// // @desc    Đăng nhập user
// router.post('/login', login);
// // Quên mật khẩu & reset
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:token', resetPassword);

// // 🔁 Làm mới Access Token
// router.post('/refresh', refreshToken);

// // 🚪 Đăng xuất (xóa refresh token)
// router.post('/logout', logout);

// module.exports = router;

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




// // routes/auth.js
// const authController = require('../controllers/authController');
// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   login,
//   forgotPassword,
//   resetPassword,
//   refreshToken,
//   logout,
// } = require('../controllers/authController');

// // @route   POST api/auth/signup
// // @desc    Đăng ký user
// router.post('/signup', signup);

// // @route   POST api/auth/login
// // @desc    Đăng nhập user
// router.post('/login', login);
// // Quên mật khẩu & reset
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:token', resetPassword);

// // 🔁 Làm mới Access Token
// router.post('/refresh', refreshToken);

// // 🚪 Đăng xuất (xóa refresh token)
// router.post('/logout', logout);

// router.post('/refresh', authController.refreshToken);
// module.exports = router;






//b6 hd1
// routes/auth.js
const express = require('express');
const router = express.Router();

// ✅ SỬA ĐỔI: Import thêm refreshToken và logout từ controller
const { 
    signup, 
    login, 
    refreshToken, // MỚI
    logout,       // MỚI
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');
// @route   POST api/auth/signup
// @desc    Đăng ký user mới
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Đăng nhập và nhận về cả access token và refresh token
router.post('/login', login);

// @route   POST api/auth/refresh
// @desc    Làm mới access token bằng refresh token (Endpoint mới cho Hoạt động 1)
router.post('/refresh', refreshToken); // ⬅️ THÊM ROUTE MỚI

// @route   POST api/auth/logout
// @desc    Đăng xuất user (xóa refresh token khỏi DB) (Endpoint mới cho Hoạt động 1)
router.post('/logout', logout); // ⬅️ THÊM ROUTE MỚI

// @route   POST api/auth/forgot-password
// @desc    Yêu cầu link đặt lại mật khẩu
router.post('/forgot-password', forgotPassword);

// @route   PUT api/auth/reset-password/:token
// @desc    Đặt lại mật khẩu bằng token nhận được qua email
router.put('/reset-password/:token', resetPassword);

module.exports = router;