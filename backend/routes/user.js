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



// // backend/routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const auth = require('../middleware/auth'); // <-- Import middleware xác thực

// // --- ROUTE MỚI: QUẢN LÝ PROFILE CÁ NHÂN ---
// // Các route này yêu cầu người dùng phải đăng nhập (có token hợp lệ)
// // Middleware 'auth' sẽ được chạy trước các hàm controller

// // @route   GET api/users/profile
// // @desc    Lấy thông tin profile của người dùng đang đăng nhập
// // @access  Private
// router.get('/profile', auth, userController.getProfile);

// // @route   PUT api/users/profile
// // @desc    Cập nhật thông tin profile của người dùng đang đăng nhập
// // @access  Private
// router.put('/profile', auth, userController.updateProfile);


// // --- CÁC ROUTE CŨ: CRUD USERS (SAU NÀY SẼ DÀNH CHO ADMIN) ---
// // Hiện tại các route này chưa được bảo vệ, bất kỳ ai cũng có thể gọi
// // Trong Hoạt động 3, chúng ta sẽ thêm middleware để chỉ Admin mới có quyền

// router.get('/', userController.getUsers); // Thay '/users' thành '/' vì tiền tố /api/users đã có ở server.js
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;



// // backend/routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Import các middleware
// const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin');

// // ... (các route /profile vẫn giữ nguyên)
// router.get('/profile', auth, userController.getProfile);
// router.put('/profile', auth, userController.updateProfile);

// // --- CÁC ROUTE DÀNH CHO ADMIN ---
// // Áp dụng cả 2 middleware: phải đăng nhập VÀ phải là admin
// // [auth, isAdmin] -> Express sẽ chạy tuần tự từ trái qua phải

// // Lấy danh sách tất cả người dùng
// router.get('/', [auth, isAdmin], userController.getUsers);

// // Xóa một người dùng theo ID
// router.delete('/:id', [auth, isAdmin], userController.deleteUser);

// // (Các route POST và PUT/:id có thể giữ lại hoặc bảo vệ tương tự nếu cần)

// module.exports = router;


// //4 update avatar
// // backend/routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Import các middleware
// const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin');
// const upload = require('../middleware/upload'); // Import middleware upload

// // ... (các route /profile vẫn giữ nguyên)
// router.get('/profile', auth, userController.getProfile);
// router.put('/profile', auth, userController.updateProfile);

// // @route   PUT api/users/profile/avatar
// // @desc    Cập nhật ảnh đại diện
// // @access  Private
// router.put('/profile/avatar', auth, upload.single('avatar'), userController.updateAvatar);

// // --- CÁC ROUTE DÀNH CHO ADMIN ---
// // Áp dụng cả 2 middleware: phải đăng nhập VÀ phải là admin
// // [auth, isAdmin] -> Express sẽ chạy tuần tự từ trái qua phải

// // Lấy danh sách tất cả người dùng
// router.get('/', [auth, isAdmin], userController.getUsers);

// // Xóa một người dùng theo ID
// router.delete('/:id', [auth, isAdmin], userController.deleteUser);

// // (Các route POST và PUT/:id có thể giữ lại hoặc bảo vệ tương tự nếu cần)

// // module.exports = router;
// //4 update avatar
// // backend/routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Import các middleware
// const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin');
// const upload = require('../middleware/upload'); // Import middleware upload

// // ... (các route /profile vẫn giữ nguyên)
// router.get('/profile', auth, userController.getProfile);
// router.put('/profile', auth, userController.updateProfile);

// // @route   PUT api/users/profile/avatar
// // @desc    Cập nhật ảnh đại diện
// // @access  Private
// router.put('/profile/avatar', auth, upload.single('avatar'), userController.updateAvatar);

// // --- CÁC ROUTE DÀNH CHO ADMIN ---
// // Áp dụng cả 2 middleware: phải đăng nhập VÀ phải là admin
// // [auth, isAdmin] -> Express sẽ chạy tuần tự từ trái qua phải

// // Lấy danh sách tất cả người dùng
// router.get('/', [auth, isAdmin], userController.getUsers);

// // Xóa một người dùng theo ID
// router.delete('/:id', [auth, isAdmin], userController.deleteUser);

// // (Các route POST và PUT/:id có thể giữ lại hoặc bảo vệ tương tự nếu cần)

// module.exports = router;




// //b6 hd1
// // backend/routes/user.js

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // 1. Import đầy đủ các middleware cần thiết
// const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin');
// const upload = require('../middleware/upload');

// // ==========================================================
// // --- CÁC ROUTE DÀNH CHO USER ĐÃ ĐĂNG NHẬP (Bất kể vai trò) ---
// // ==========================================================

// // Lấy thông tin profile của chính mình
// router.get('/profile', auth, userController.getProfile);

// // Cập nhật thông tin profile của chính mình
// router.put('/profile', auth, userController.updateProfile);

// // Cập nhật avatar của chính mình
// // Lưu ý: Route này nên là POST /users/avatar để nhất quán với frontend
// router.post('/avatar', auth, upload.single('avatar'), userController.updateAvatar);


// // ==========================================================
// // --- CÁC ROUTE CHỈ DÀNH CHO ADMIN ---
// // ==========================================================

// // ✅ 2. BẢO VỆ ROUTE LẤY DANH SÁCH USER
// // Express sẽ chạy middleware theo thứ tự: `auth` trước, `isAdmin` sau.
// // @route   GET /api/users
// // @access  Private (Admin)
// router.get('/', [auth, isAdmin], userController.getUsers);

// // ✅ 3. BẢO VỆ ROUTE XÓA USER
// // @route   DELETE /api/users/:id
// // @access  Private (Admin)
// router.delete('/:id', [auth, isAdmin], userController.deleteUser);

// module.exports = router;













// b6 hd2
// backend/routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 1. Import middleware mới và bỏ isAdmin
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole'); 
const upload = require('../middleware/upload');

// --- CÁC ROUTE CỦA USER CÁ NHÂN ---
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.post('/avatar', auth, upload.single('avatar'), userController.updateAvatar);

// --- CÁC ROUTE QUẢN LÝ (DÀNH CHO ADMIN & MODERATOR) ---

// 2. Cấp quyền cho cả admin và moderator để xem danh sách user
router.get('/', [auth, checkRole(['admin', 'moderator'])], userController.getUsers);

// 3. Cấp quyền cho cả admin và moderator để gọi API xóa
// Logic chi tiết "ai được xóa ai" sẽ nằm trong controller.
router.delete('/:id', [auth, checkRole(['admin', 'moderator'])], userController.deleteUser);

module.exports = router;