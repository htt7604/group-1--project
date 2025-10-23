// // backend/middleware/auth.js
// const jwt = require('jsonwebtoken');

// // Biến cho JWT
// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

// module.exports = function(req, res, next) {
//     // Lấy token từ header của request
//     const token = req.header('x-auth-token');

//     // 1. Kiểm tra xem có token không
//     if (!token) {
//         return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
//     }

//     // 2. Xác thực token
//     try {
//         // Giải mã token bằng chuỗi bí mật
//         const decoded = jwt.verify(token, JWT_SECRET);
        
//         // Gắn thông tin người dùng (payload) từ token vào đối tượng request
//         // để các hàm controller sau có thể sử dụng (ví dụ: req.user.id)
//         req.user = decoded.user; 
        
//         // Chuyển sang middleware hoặc controller tiếp theo
//         next();
//     } catch (err) {
//         // Nếu token không hợp lệ (hết hạn, giả mạo...)
//         res.status(401).json({ message: 'Token không hợp lệ.' });
//     }
// };

// const jwt = require('jsonwebtoken');
// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

// module.exports = function (req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
//   }
// };


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    const authHeader = req.header('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token hoặc định dạng token sai, truy cập bị từ chối.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        
        // ✅ SỬA LẠI Ở ĐÂY: Gán thẳng kết quả giải mã vào req.user
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Bây giờ req.user sẽ là { id: "...", role: "..." }
        
        next();
    } catch (err) {
        // Trả về lỗi 401 để frontend có thể kích hoạt refresh token
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};