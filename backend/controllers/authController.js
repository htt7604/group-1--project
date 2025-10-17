// // controllers/authController.js
// const User = require('../models/User'); // Import User model từ Hoạt động 5 của SV3
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // Biến cho JWT
// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";




// // Đăng ký
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // 1. Kiểm tra email đã tồn tại chưa
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'Email đã tồn tại' });
//         }

//         // 2. Tạo user mới
//         user = new User({ name, email, password });

//         // 3. Mã hóa mật khẩu
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // 4. Lưu user vào DB
//         await user.save();

//         // 5. Tạo và trả về token (tương tự login)
//         const payload = { user: { id: user.id, role: user.role } };
//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.status(201).json({ token });
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// // Đăng nhập
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // 1. Kiểm tra email có tồn tại không
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
//         }

//         // 2. So sánh mật khẩu
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
//         }

//         // 3. Tạo và trả về JWT token
//         const payload = { user: { id: user.id, role: user.role } };
//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };






// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Biến cho JWT
const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

// --- Đăng ký tài khoản ---
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    // Sơ lược kiểm tra đầu vào
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    try {
        // 1. Kiểm tra email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email này đã được sử dụng.' });
        }

        // 2. Tạo người dùng mới
        user = new User({ name, email, password });

        // 3. Mã hóa mật khẩu trước khi lưu
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Lưu người dùng vào cơ sở dữ liệu
        await user.save();

        // 5. Tạo và trả về JWT token để người dùng có thể đăng nhập ngay
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });

    } catch (err) {
        console.error("Lỗi khi đăng ký:", err);
        res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
    }
};

// --- Đăng nhập ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    }

    try {
        // 1. Tìm người dùng bằng email và LẤY CẢ MẬT KHẨU
        // 🐞 Thêm .select('+password') là cực kỳ quan trọng!
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        // 3. Nếu thông tin chính xác, tạo và gửi lại JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error("Lỗi khi đăng nhập:", err);
        res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
    }
};