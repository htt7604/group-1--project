// // backend/middleware/isAdmin.js
// module.exports = function(req, res, next) {
//     // req.user được tạo từ middleware 'auth' trước đó
//     if (req.user && req.user.role === 'admin') {
//         next(); // Nếu là admin, cho phép đi tiếp
//     } else {
//         // Nếu không phải admin, trả về lỗi 403 Forbidden
//         res.status(403).json({ message: 'Truy cập bị từ chối. Yêu cầu quyền Admin.' });
//     }
// };


//b6 hd2
// backend/middleware/isAdmin.js

const isAdmin = (req, res, next) => {
    // Middleware này phải được dùng SAU middleware `auth`
    console.log('Đang kiểm tra quyền admin cho user:', req.user);

    if (req.user && req.user.role === 'admin') {
        // Nếu đúng là admin, cho phép đi tiếp
        next();
    } else {
        // Nếu không phải admin, trả về lỗi 403 Forbidden
        return res.status(403).json({ message: 'Truy cập bị từ chối. Yêu cầu quyền Admin.' });
    }
};

module.exports = isAdmin;