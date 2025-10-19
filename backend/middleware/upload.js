// backend/middleware/upload.js
const multer = require('multer');

// Cấu hình lưu trữ file trong bộ nhớ tạm (thay vì lưu vào đĩa server)
const storage = multer.memoryStorage();

// Lọc để chỉ chấp nhận các file là ảnh
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb({ message: 'Chỉ chấp nhận file ảnh!' }, false);
    }
};

// Giới hạn kích thước file (ví dụ: 5MB)
const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter, 
    limits: { fileSize: 1024 * 1024 * 5 } 
});

module.exports = upload;