// // routes/user.js
// // const express = require('express');
// // const router = express.Router();
// // const userController = require('../controllers/userController');

// // // Định nghĩa route
// // router.get('/', userController.getUsers);
// // router.post('/', userController.createUser);

// // module.exports = router;


// // const mongoose = require('mongoose');


// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: [true, 'Tên là bắt buộc']
// //   },
// //   email: {
// //     type: String,
// //     required: [true, 'Email là bắt buộc'],
// //     unique: true
// //   }
// // });

// // module.exports = mongoose.model('User', userSchema);

// const express = require('express'); 
// const router = express.Router(); 
// const userController = require('../controllers/userController'); 
// router.get('/users', userController.getUsers); 
// router.post('/users', userController.createUser); 
// router.put('/users/:id', userController.updateUser);   // PUT 
// router.delete('/users/:id', userController.deleteUser); // DELETE 
// module.exports = router;







// // backend/routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.get('/users', userController.getUsers);
// router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

// module.exports = router;



// backend/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // <-- Import middleware xác thực

// --- ROUTE MỚI: QUẢN LÝ PROFILE CÁ NHÂN ---
// Các route này yêu cầu người dùng phải đăng nhập (có token hợp lệ)
// Middleware 'auth' sẽ được chạy trước các hàm controller

// @route   GET api/users/profile
// @desc    Lấy thông tin profile của người dùng đang đăng nhập
// @access  Private
router.get('/profile', auth, userController.getProfile);

// @route   PUT api/users/profile
// @desc    Cập nhật thông tin profile của người dùng đang đăng nhập
// @access  Private
router.put('/profile', auth, userController.updateProfile);


// --- CÁC ROUTE CŨ: CRUD USERS (SAU NÀY SẼ DÀNH CHO ADMIN) ---
// Hiện tại các route này chưa được bảo vệ, bất kỳ ai cũng có thể gọi
// Trong Hoạt động 3, chúng ta sẽ thêm middleware để chỉ Admin mới có quyền

router.get('/', userController.getUsers); // Thay '/users' thành '/' vì tiền tố /api/users đã có ở server.js
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;