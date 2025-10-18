// // backend/models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Vui lòng nhập tên'], // Thêm thông báo lỗi
//     },
//     email: {
//         type: String,
//         required: [true, 'Vui lòng nhập email'],
//         unique: true, // Đảm bảo email là duy nhất
//         match: [ // Kiểm tra định dạng email hợp lệ
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             'Vui lòng nhập một địa chỉ email hợp lệ'
//         ]
//     },
//     password: {
//         type: String,
//         required: [true, 'Vui lòng nhập mật khẩu'],
//         minlength: 6, // Mật khẩu cần có ít nhất 6 ký tự
//         select: false // Không trả về trường password trong các câu truy vấn mặc định
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'], // Vai trò chỉ có thể là 'user' hoặc 'admin'
//         default: 'user' // Vai trò mặc định khi tạo mới là 'user'
//     },
//     avatar: {
//         type: String, // Sẽ lưu URL của ảnh đại diện
//         default: 'no-photo.jpg' // Một ảnh mặc định
//     }
// }, {
//     timestamps: true // Tự động thêm 2 trường createdAt và updatedAt
// });

// module.exports = mongoose.model('User', UserSchema);








//4
// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Bắt buộc phải import thư viện này

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên'],
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Vui lòng nhập một địa chỉ email hợp lệ'
        ]
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minlength: 6,
        select: false // Không trả về trường password trong các câu truy vấn mặc định
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'no-photo.jpg'
    },
    // Các trường mới cho chức năng quên mật khẩu
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});


// Thêm hook (middleware) của Mongoose để tự động mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function (next) {
    // Chỉ chạy hàm này nếu mật khẩu đã được thay đổi (hoặc mới)
    if (!this.isModified('password')) {
        return next();
    }
    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model('User', UserSchema);