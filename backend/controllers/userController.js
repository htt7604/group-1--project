// // controllers/userController.js

// // Mảng tạm người dùng
// let users = [
//   { id: 1, name: "Nguyen Van A", email: "a@example.com" },
//   { id: 2, name: "Tran Thi B", email: "b@example.com" }
// ];

// // GET /users - Lấy danh sách người dùng
// exports.getUsers = (req, res) => {
//   res.status(200).json(users);
// };

// // POST /users - Thêm người dùng mới
// exports.createUser = (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "Thiếu thông tin name hoặc email" });
//   }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email
//   };

//   users.push(newUser);
//   res.status(201).json(newUser);
// };






// let users = []; // mảng tạm nếu chưa dùng MongoDB 
// // PUT: sửa user 
// exports.updateUser = (req, res) => { 
// const { id } = req.params; 
// const index = users.findIndex(u => u.id == id); 
// if (index !== -1) { 
// users[index] = { ...users[index], ...req.body }; 
// res.json(users[index]); 
// } else { 
// res.status(404).json({ message: "User not found" }); 
// } 
// }; 
// // DELETE: xóa user 
// exports.deleteUser = (req, res) => { 
// const { id } = req.params; 
// users = users.filter(u => u.id != id); 
// res.json({ message: "User deleted" }); 
// };





// // backend/controllers/userController.js
// const User = require('../models/User');

// exports.getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// exports.createUser = async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ message: 'Email exists' });
//   const newUser = await User.create({ name, email });
//   res.status(201).json(newUser);
// };
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   const user = await User.findByIdAndUpdate(id, updates, { new: true });
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json(user);
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json({ message: "User deleted" });
// };




// // backend/controllers/userController.js
// const User = require('../models/User');

// // --- CÁC HÀM MỚI CHO PROFILE CÁ NHÂN (Yêu cầu đăng nhập) ---

// // [GET] /api/users/profile - Lấy thông tin của người dùng đang đăng nhập
// exports.getProfile = async (req, res) => {
//     try {
//         // req.user.id được lấy từ middleware 'auth' sau khi giải mã token
//         const user = await User.findById(req.user.id).select('-password'); // Bỏ qua trường password
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [PUT] /api/users/profile - Cập nhật thông tin của người dùng đang đăng nhập
// exports.updateProfile = async (req, res) => {
//     const { name, avatar } = req.body;
//     try {
//         let user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }

//         // Cập nhật các trường được phép
//         user.name = name || user.name;
//         user.avatar = avatar || user.avatar;

//         await user.save();
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };


// // --- CÁC HÀM CRUD CŨ (Dành cho Admin quản lý) ---

// // [GET] /api/users - Lấy danh sách tất cả người dùng
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [POST] /api/users - (Thường không dùng, vì đã có signup)
// exports.createUser = async (req, res) => {
//     // ... code createUser của bạn ...
//     const { name, email } = req.body; // Cần thêm password và mã hóa nếu muốn dùng
//     if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email exists' });
//     const newUser = await User.create({ name, email });
//     res.status(201).json(newUser);
// };

// // [PUT] /api/users/:id - Cập nhật một người dùng bất kỳ theo ID
// exports.updateUser = async (req, res) => {
//     // ... code updateUser của bạn ...
//     const { id } = req.params;
//     const updates = req.body;
//     const user = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
// };

// // [DELETE] /api/users/:id - Xóa một người dùng bất kỳ theo ID
// exports.deleteUser = async (req, res) => {
//     // ... code deleteUser của bạn ...
//     const { id } = req.params;
// const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted" });
// };





// //4 update anh
// // backend/controllers/userController.js
// const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;
// // --- CÁC HÀM MỚI CHO PROFILE CÁ NHÂN (Yêu cầu đăng nhập) ---

// // [GET] /api/users/profile - Lấy thông tin của người dùng đang đăng nhập
// exports.getProfile = async (req, res) => {
//     try {
//         // req.user.id được lấy từ middleware 'auth' sau khi giải mã token
//         const user = await User.findById(req.user.id).select('-password'); // Bỏ qua trường password
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [PUT] /api/users/profile - Cập nhật thông tin của người dùng đang đăng nhập
// exports.updateProfile = async (req, res) => {
//     const { name, avatar } = req.body;
//     try {
//         let user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }

//         // Cập nhật các trường được phép
//         user.name = name || user.name;
//         user.avatar = avatar || user.avatar;

//         await user.save();
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };


// // --- CÁC HÀM CRUD CŨ (Dành cho Admin quản lý) ---

// // [GET] /api/users - Lấy danh sách tất cả người dùng
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [POST] /api/users - (Thường không dùng, vì đã có signup)
// exports.createUser = async (req, res) => {
//     // ... code createUser của bạn ...
//     const { name, email } = req.body; // Cần thêm password và mã hóa nếu muốn dùng
//     if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email exists' });
//     const newUser = await User.create({ name, email });
//     res.status(201).json(newUser);
// };

// // [PUT] /api/users/:id - Cập nhật một người dùng bất kỳ theo ID
// exports.updateUser = async (req, res) => {
//     // ... code updateUser của bạn ...
//     const { id } = req.params;
//     const updates = req.body;
//     const user = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
// };

// // [DELETE] /api/users/:id - Xóa một người dùng bất kỳ theo ID
// exports.deleteUser = async (req, res) => {// ... code deleteUser của bạn ...
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted" });
// };

// // Cấu hình Cloudinary (nên đặt ở đầu file hoặc trong file config riêng)
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // [PUT] /api/users/profile/avatar - Cập nhật ảnh đại diện
// exports.updateAvatar = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
//         }

//         // Chuyển buffer của file ảnh thành chuỗi base64 để upload
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//         // Tải ảnh lên Cloudinary
//         const result = await cloudinary.uploader.upload(dataURI, {
//             folder: "avatars", // Tạo một thư mục tên là 'avatars' trên Cloudinary
//             resource_type: "image",
//         });

//         // Cập nhật lại đường dẫn avatar cho user trong DB
//         const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url }, { new: true });

//         res.status(200).json({
//             message: 'Upload avatar thành công!',
//             avatarUrl: user.avatar,
//         });
//     } catch (err) {
//         console.error("Lỗi upload avatar:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// //4 update anh
// // backend/controllers/userController.js
// const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;
// // --- CÁC HÀM MỚI CHO PROFILE CÁ NHÂN (Yêu cầu đăng nhập) ---

// // [GET] /api/users/profile - Lấy thông tin của người dùng đang đăng nhập
// exports.getProfile = async (req, res) => {
//     try {
//         // req.user.id được lấy từ middleware 'auth' sau khi giải mã token
//         const user = await User.findById(req.user.id).select('-password'); // Bỏ qua trường password
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [PUT] /api/users/profile - Cập nhật thông tin của người dùng đang đăng nhập
// exports.updateProfile = async (req, res) => {
//     const { name, avatar } = req.body;
//     try {
//         let user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }

//         // Cập nhật các trường được phép
//         user.name = name || user.name;
//         user.avatar = avatar || user.avatar;

//         await user.save();
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };


// // --- CÁC HÀM CRUD CŨ (Dành cho Admin quản lý) ---

// // [GET] /api/users - Lấy danh sách tất cả người dùng
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [POST] /api/users - (Thường không dùng, vì đã có signup)
// exports.createUser = async (req, res) => {
//     // ... code createUser của bạn ...
//     const { name, email } = req.body; // Cần thêm password và mã hóa nếu muốn dùng
//     if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email exists' });
//     const newUser = await User.create({ name, email });
//     res.status(201).json(newUser);
// };

// // [PUT] /api/users/:id - Cập nhật một người dùng bất kỳ theo ID
// exports.updateUser = async (req, res) => {
//     // ... code updateUser của bạn ...
//     const { id } = req.params;
//     const updates = req.body;
//     const user = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
// };

// // [DELETE] /api/users/:id - Xóa một người dùng bất kỳ theo ID
// exports.deleteUser = async (req, res) => {// ... code deleteUser của bạn ...
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted" });
// };

// // Cấu hình Cloudinary (nên đặt ở đầu file hoặc trong file config riêng)
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // [PUT] /api/users/profile/avatar - Cập nhật ảnh đại diện
// exports.updateAvatar = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
//         }

//         // Chuyển buffer của file ảnh thành chuỗi base64 để upload
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//         // Tải ảnh lên Cloudinary
//         const result = await cloudinary.uploader.upload(dataURI, {
//             folder: "avatars", // Tạo một thư mục tên là 'avatars' trên Cloudinary
//             resource_type: "image",
//         });

//         // Cập nhật lại đường dẫn avatar cho user trong DB
//         const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url }, { new: true });

//         res.status(200).json({
//             message: 'Upload avatar thành công!',
//             avatarUrl: user.avatar,
//         });
//     } catch (err) {
//         console.error("Lỗi upload avatar:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };




















// //b6 hd2
// // backend/controllers/userController.js
// const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;

// // [GET] /api/users/profile - Lấy thông tin của người dùng đang đăng nhập
// exports.getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [PUT] /api/users/profile - Cập nhật thông tin của người dùng đang đăng nhập
// exports.updateProfile = async (req, res) => {
//     const { name } = req.body; // Chỉ cho phép cập nhật tên ở đây
//     try {
//         const user = await User.findByIdAndUpdate(req.user.id, { name }, { new: true, runValidators: true }).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [GET] /api/users - Lấy danh sách tất cả người dùng
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // ✅ SỬA LẠI HOÀN TOÀN HÀM NÀY
// // [DELETE] /api/users/:id - Xóa một người dùng bất kỳ theo ID
// exports.deleteUser = async (req, res) => {
//     try {
//         // Tìm người dùng mục tiêu (người sắp bị xóa)
//         const userToDelete = await User.findById(req.params.id);

//         if (!userToDelete) {
//             return res.status(404).json({ message: "Không tìm thấy người dùng để xóa." });
//         }

//         // Lấy thông tin người thực hiện yêu cầu (từ token đã giải mã)
//         const requestingUser = req.user;

//         // --- QUY TẮC PHÂN QUYỀN ---
//         // 1. Moderator không được phép xóa Admin
//         if (userToDelete.role === 'admin' && requestingUser.role === 'moderator') {
//             return res.status(403).json({ message: 'Bạn không có quyền xóa tài khoản Admin.' });
//         }
        
//         // 2. Không ai được tự xóa chính mình qua API này
//         if (userToDelete.id === requestingUser.id) {
//             return res.status(400).json({ message: 'Bạn không thể tự xóa chính mình.' });
//         }
        
//         // Nếu vượt qua các kiểm tra, tiến hành xóa
//         await User.findByIdAndDelete(req.params.id);//         res.json({ message: "Người dùng đã được xóa thành công." });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // Cấu hình Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // [POST] /api/users/avatar - Cập nhật ảnh đại diện
// exports.updateAvatar = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
//         }
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//         const result = await cloudinary.uploader.upload(dataURI, {
//             folder: "avatars",
//             resource_type: "image",
//         });
//         const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url }, { new: true });
//         res.status(200).json({
//             message: 'Upload avatar thành công!',
//             avatar: user.avatar, // Trả về key `avatar` để khớp với frontend
//         });
//     } catch (err) {
//         console.error("Lỗi upload avatar:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

















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