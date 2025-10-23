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






// // controllers/authController.js
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Biến cho JWT
// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

// // --- Đăng ký tài khoản ---
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     // Sơ lược kiểm tra đầu vào
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
//     }

//     try {
//         // 1. Kiểm tra email đã tồn tại chưa
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'Email này đã được sử dụng.' });
//         }

//         // 2. Tạo người dùng mới
//         user = new User({ name, email, password });

//         // 3. Mã hóa mật khẩu trước khi lưu
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // 4. Lưu người dùng vào cơ sở dữ liệu
//         await user.save();

//         // 5. Tạo và trả về JWT token để người dùng có thể đăng nhập ngay
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.status(201).json({ token });
//         });

//     } catch (err) {
//         console.error("Lỗi khi đăng ký:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };

// // --- Đăng nhập ---
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
//     }

//     try {
//         // 1. Tìm người dùng bằng email và LẤY CẢ MẬT KHẨU
//         // 🐞 Thêm .select('+password') là cực kỳ quan trọng!
//         const user = await User.findOne({ email }).select('+password');
//         if (!user) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
//         }

//         // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
//         }

//         // 3. Nếu thông tin chính xác, tạo và gửi lại JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });

//     } catch (err) {
//         console.error("Lỗi khi đăng nhập:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };







//hd4
//npm install nodemailer
// // backend/controllers/authController.js
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // ... (các import khác và code cũ)

// //(các hàm signup, login giữ nguyên)
// // Biến cho JWT
// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

// // --- Đăng ký tài khoản ---
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     // Sơ lược kiểm tra đầu vào
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
//     }

//     try {
//         // 1. Kiểm tra email đã tồn tại chưa
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'Email này đã được sử dụng.' });
//         }

//         // 2. Tạo người dùng mới
//         user = new User({ name, email, password });

//         // 3. Mã hóa mật khẩu trước khi lưu
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // 4. Lưu người dùng vào cơ sở dữ liệu
//         await user.save();

//         // 5. Tạo và trả về JWT token để người dùng có thể đăng nhập ngay
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.status(201).json({ token });
//         });

//     } catch (err) {
//         console.error("Lỗi khi đăng ký:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };

// // --- Đăng nhập ---
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
//     }

//     try {
//         // 1. Tìm người dùng bằng email và LẤY CẢ MẬT KHẨU
//         // 🐞 Thêm .select('+password') là cực kỳ quan trọng!
//         const user = await User.findOne({ email }).select('+password');
//         if (!user) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
//         }

//         // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
//         }

//         // 3. Nếu thông tin chính xác, tạo và gửi lại JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }};

//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });

//     } catch (err) {
//         console.error("Lỗi khi đăng nhập:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };
// // [POST] /api/auth/forgot-password
// exports.forgotPassword = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });

//         // Luôn trả về thông báo thành công để tránh kẻ xấu dò xem email nào đã đăng ký
//         if (!user) {
//             return res.status(200).json({ message: 'Email hướng dẫn đã được gửi (nếu email tồn tại trong hệ thống).' });
//         }

//         // 1. Tạo một token ngẫu nhiên
//         const resetToken = crypto.randomBytes(20).toString('hex');

//         // 2. Mã hóa token này và lưu vào DB cùng thời gian hết hạn (10 phút)
//         user.resetPasswordToken = crypto
//             .createHash('sha256')
//             .update(resetToken)
//             .digest('hex');
//         user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút sau

//         await user.save({ validateBeforeSave: false });

//         // 3. Tạo URL reset và gửi email (URL chứa token chưa mã hóa)
//         const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        
//         // Cấu hình để gửi email (dùng Mailtrap, SendGrid, hoặc Gmail App Password)
//         // Đây là ví dụ, bạn cần cấu hình transporter của riêng mình
//         const transporter = nodemailer.createTransport({
//             service: 'gmail', // Ví dụ
//             auth: {
//                 user: process.env.EMAIL_USER, // Lưu trong file .env
//                 pass: process.env.EMAIL_PASS, // Lưu trong file .env
//             },
//         });

//         await transporter.sendMail({
//             to: user.email,
//             subject: 'Yêu cầu đặt lại mật khẩu',
//             html: `Chào bạn, <br><br> Vui lòng nhấn vào liên kết sau để đặt lại mật khẩu (link có hiệu lực trong 10 phút): <a href="${resetUrl}">${resetUrl}</a>`
//         });

//         res.status(200).json({ message: 'Email hướng dẫn đã được gửi.' });
//     } catch (err) {
//         // Dọn dẹp token nếu có lỗi xảy ra
//         if (req.body.email) {
//             const userWithError = await User.findOne({ email: req.body.email });
//             if (userWithError) {
//                 userWithError.resetPasswordToken = undefined;
//                 userWithError.resetPasswordExpire = undefined;
//                 await userWithError.save({ validateBeforeSave: false });
//             }
//         }
//         console.error("Lỗi quên mật khẩu:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // [PUT] /api/auth/reset-password/:token
// exports.resetPassword = async (req, res) => {
//     try {// 1. Lấy token từ URL và mã hóa nó để so sánh với DB
//         const resetPasswordToken = crypto
//             .createHash('sha256')
//             .update(req.params.token)
//             .digest('hex');

//         // 2. Tìm user bằng token đã mã hóa và token chưa hết hạn
//         const user = await User.findOne({
//             resetPasswordToken,
//             resetPasswordExpire: { $gt: Date.now() }, // Thời gian hết hạn phải lớn hơn thời gian hiện tại
//         });

//         if (!user) {
//             return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
//         }

//         // 3. Cập nhật mật khẩu mới và xóa token
//         user.password = req.body.password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save();
        
//         res.status(200).json({ message: 'Đặt lại mật khẩu thành công.' });
//     } catch (err) {
//         console.error("Lỗi đặt lại mật khẩu:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // controllers/authController.js
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const User = require('../models/User');
// const RefreshToken = require('../models/RefreshToken');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";
// const REFRESH_SECRET = "RefreshTokenSieuBiMat123";
// const ACCESS_EXPIRES_IN = '15m'; // Access Token sống 15 phút
// const REFRESH_EXPIRES_DAYS = 7; // Refresh sống 7 ngày

// // ---------------------- SIGNUP ----------------------
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//         return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });

//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: 'Email này đã được sử dụng.' });

//         user = new User({ name, email, password });
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
//         await user.save();

//         const payload = { id: user.id, role: user.role };
//         const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
//         const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });

//         const expiresAt = new Date();
//         expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);
//         await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt });

//         res.status(201).json({ message: "Đăng ký thành công!", accessToken, refreshToken });
//     } catch (err) {
//         console.error("Lỗi khi đăng ký:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };

// // ---------------------- LOGIN ----------------------
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//         return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });

//     try {
//         const user = await User.findOne({ email }).select('+password');
//         if (!user) return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });

//         const payload = { id: user.id, role: user.role };
//         const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
//         const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });

//         const expiresAt = new Date();
//         expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);
//         await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt });

//         res.json({
//             message: "Đăng nhập thành công!",
//             accessToken,
//             refreshToken,
//             user: { id: user._id, email: user.email, name: user.name }
//         });
//     } catch (err) {
//         console.error("Lỗi khi đăng nhập:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
//     }
// };

// // ---------------------- FORGOT PASSWORD ----------------------
// exports.forgotPassword = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(200).json({ message: 'Email hướng dẫn đã được gửi (nếu tồn tại).' });
//         }

//         const resetToken = crypto.randomBytes(20).toString('hex');
//         user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//         user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//         await user.save({ validateBeforeSave: false });

//         const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//         });

//         await transporter.sendMail({
//             to: user.email,
//             subject: 'Đặt lại mật khẩu',
//             html: `Vui lòng nhấn vào liên kết để đặt lại mật khẩu: <a href="${resetUrl}">${resetUrl}</a>`,
//         });

//         res.status(200).json({ message: 'Email hướng dẫn đã được gửi.' });
//     } catch (err) {
//         console.error("Lỗi quên mật khẩu:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // ---------------------- RESET PASSWORD ----------------------
// exports.resetPassword = async (req, res) => {
//     try {
//         const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
//         const user = await User.findOne({
//             resetPasswordToken,
//             resetPasswordExpire: { $gt: Date.now() },
//         });

//         if (!user) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });

//         user.password = await bcrypt.hash(req.body.password, 10);
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Đặt lại mật khẩu thành công.' });
//     } catch (err) {
//         console.error("Lỗi đặt lại mật khẩu:", err);
//         res.status(500).json({ message: 'Lỗi máy chủ' });
//     }
// };

// // ---------------------- REFRESH TOKEN ----------------------
// exports.refreshToken = async (req, res) => {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) return res.status(400).json({ message: 'Không có refresh token!' });

//         const stored = await RefreshToken.findOne({ token: refreshToken });
//         if (!stored) return res.status(403).json({ message: 'Token không hợp lệ!' });

//         jwt.verify(refreshToken, REFRESH_SECRET, async (err, user) => {
//             if (err) return res.status(403).json({ message: 'Refresh token không hợp lệ!' });

//             const newAccessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
//                 expiresIn: ACCESS_EXPIRES_IN,
//             });
//             res.json({ accessToken: newAccessToken });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Lỗi server' });
//     }
// };

// // ---------------------- LOGOUT ----------------------
// exports.logout = async (req, res) => {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) return res.status(400).json({ message: 'Không có refresh token!' });

//         await RefreshToken.deleteOne({ token: refreshToken });
//         res.json({ message: 'Đăng xuất thành công!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Lỗi server' });
//     }
// };


const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Lấy các giá trị từ biến môi trường, có giá trị dự phòng
const JWT_SECRET = process.env.JWT_SECRET || "DefaultSecretKeyForJWT";
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_DAYS = parseInt(process.env.JWT_REFRESH_EXPIRES_DAYS || '7', 10);

// --- Đăng ký tài khoản ---
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email này đã được sử dụng.' });
        }

        // Tạo user với mật khẩu gốc, Model User.js sẽ tự động mã hóa
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({
            message: "Đăng ký thành công! Vui lòng đăng nhập.",
            user: { id: user._id, email: user.email, name: user.name }
        });

    } catch (err) {
        console.error("Lỗi khi đăng ký:", err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// --- Đăng nhập ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        // Tạo Access Token
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );

        // Tạo Refresh Token
        const refreshTokenString = uuidv4();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + REFRESH_EXPIRES_DAYS);

        // Lưu refresh token vào DB
        await RefreshToken.create({
            token: refreshTokenString,
            user: user._id,
            expiryDate: expiryDate,
        });

        res.json({
            message: "Đăng nhập thành công!",accessToken,
            refreshToken: refreshTokenString,
            user: { id: user._id, email: user.email, name: user.name, role: user.role }
        });

    } catch (err) {
        console.error("Lỗi khi đăng nhập:", err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// --- Refresh Access Token ---
exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (!requestToken) {
        return res.status(400).json({ message: "Refresh Token là bắt buộc!" });
    }

    try {
        const refreshToken = await RefreshToken.findOne({ token: requestToken });
        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token không hợp lệ!" });
        }

        if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
            await RefreshToken.findByIdAndDelete(refreshToken._id);
            return res.status(403).json({ message: "Refresh token đã hết hạn. Vui lòng đăng nhập lại." });
        }

        const user = await User.findById(refreshToken.user);
        if (!user) {
            await RefreshToken.findByIdAndDelete(refreshToken._id);
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        const newAccessToken = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );

        res.json({ accessToken: newAccessToken });

    } catch (err) {
        console.error("Lỗi khi refresh token:", err);
        res.status(500).send('Lỗi máy chủ');
    }
};

// --- Đăng xuất ---
exports.logout = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (!requestToken) {
        return res.status(400).json({ message: 'Refresh Token là bắt buộc!' });
    }

    try {
        await RefreshToken.deleteOne({ token: requestToken });
        res.json({ message: 'Đăng xuất thành công!' });
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// --- Quên Mật khẩu ---
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: 'Email hướng dẫn đã được gửi (nếu email tồn tại trong hệ thống).' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút
        await user.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        
        const transporter = nodemailer.createTransport({service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to: user.email,
            subject: 'Yêu cầu đặt lại mật khẩu',
            html: `Chào bạn, <br><br> Vui lòng nhấn vào liên kết sau để đặt lại mật khẩu (link có hiệu lực trong 10 phút): <a href="${resetUrl}">${resetUrl}</a>`
        });

        res.status(200).json({ message: 'Email hướng dẫn đã được gửi.' });
    } catch (err) {
        console.error("Lỗi quên mật khẩu:", err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};

// --- Đặt lại Mật khẩu ---
exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }

        // Gán mật khẩu gốc, hook pre('save') trong User model sẽ tự hash
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Đặt lại mật khẩu thành công.' });
    } catch (err) {
        console.error("Lỗi đặt lại mật khẩu:", err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};