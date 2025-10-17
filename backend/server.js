// // // const express = require('express');
// // // const app = express();

// // // app.use(express.json());

// // // // Import routes
// // // const userRoutes = require('./routes/user');
// // // app.use('/users', userRoutes);

// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // const express = require('express');
// // const mongoose = require('mongoose');
// // const User = require('./routes/user');

// // const app = express();
// // app.use(express.json()); // Cho phép đọc JSON từ request body

// // // 👉 Thay link này bằng link MongoDB Atlas của bạn
// // const mongoURI = 'mongodb+srv://loi224453_db_user:hZWnSsuzolQi89LA@groupdb.lzoxwbo.mongodb.net/?retryWrites=true&w=majority&appName=groupDB';

// // // Kết nối MongoDB
// // mongoose.connect(mongoURI)
// //   .then(() => console.log('✅ Đã kết nối MongoDB Atlas thành công'))
// //   .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// // // API GET: Lấy danh sách người dùng
// // app.get('/users', async (req, res) => {
// //   try {
// //     const users = await User.find();
// //     res.json(users);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // API POST: Thêm người dùng mới
// // app.post('/users', async (req, res) => {
// //   const { name, email } = req.body;
// //   try {
// //     const newUser = new User({ name, email });
// //     await newUser.save();
// //     res.status(201).json(newUser);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // const PORT = 3000;
// // app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Kết nối MongoDB Atlas
// const mongoURI =
//   "mongodb+srv://loi224453_db_user:hZWnSsuzolQi89LA@groupdb.lzoxwbo.mongodb.net/groupDB?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ Kết nối MongoDB Atlas thành công"))
//   .catch((err) => console.error("❌ Lỗi MongoDB:", err));

// // 🧩 Schema & Model
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });
// const User = mongoose.model("User", UserSchema);

// // 🧩 API routes
// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const user = new User(req.body);
//   await user.save();
//   res.json(user);
// });

// app.delete("/users/:id", async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// });

// app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// // ⚙️ Middleware
// app.use(cors());
// app.use(express.json());

// // 🌐 Kết nối MongoDB Atlas
// const mongoURI =
//   "mongodb+srv://loi224453_db_user:hZWnSsuzolQi89LA@groupdb.lzoxwbo.mongodb.net/groupDB?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ Đã kết nối MongoDB Atlas thành công"))
//   .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// // 🧩 Định nghĩa Schema & Model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // =============================
// // 📌 API ROUTES
// // =============================

// // Lấy danh sách người dùng
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy danh sách" });
//   }
// });

// // Thêm người dùng mới
// app.post("/users", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error("❌ Lỗi khi thêm người dùng:", error);
//     res.status(400).json({ message: "Dữ liệu không hợp lệ" });
//   }
// });

// // Xóa người dùng theo ID
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Không tìm thấy người dùng để xóa" });
//     }
//     res.json({ message: "✅ Xóa người dùng thành công" });
//   } catch (error) {
//     console.error("❌ Lỗi khi xóa người dùng:", error);
//     res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
//   }
// });
// //sua nguoi dung
// app.put("/users/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // =============================
// // 🚀 Khởi động server
// // =============================
// app.listen(PORT, () =>
//   console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
// );






// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const app = express();

// app.use(cors()); // ⚡ CHO PHÉP FRONTEND TRUY CẬP
// app.use(express.json());

// // 🌐 Kết nối MongoDB Atlas
// const mongoURI =
//   "mongodb+srv://loi224453_db_user:hZWnSsuzolQi89LA@groupdb.lzoxwbo.mongodb.net/groupDB?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ Đã kết nối MongoDB Atlas thành công"))
//   .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// // 🧩 Định nghĩa Schema & Model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // =============================
// // 📌 API ROUTES
// // =============================

// // Lấy danh sách người dùng
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy danh sách" });
//   }
// });

// // Thêm người dùng mới
// app.post("/users", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error("❌ Lỗi khi thêm người dùng:", error);
//     res.status(400).json({ message: "Dữ liệu không hợp lệ" });
//   }
// });

// // Xóa người dùng theo ID
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Không tìm thấy người dùng để xóa" });
//     }
//     res.json({ message: "✅ Xóa người dùng thành công" });
//   } catch (error) {
//     console.error("❌ Lỗi khi xóa người dùng:", error);
//     res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
//   }

// });
// //sua nguoi dung
// app.put("/users/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // =============================
// // 🚀 Khởi động server
// // =============================
// app.listen(PORT, () =>
//   console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
// );





// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const app = express();

// app.use(cors()); // ⚡ CHO PHÉP FRONTEND TRUY CẬP
// app.use(express.json());

// connectDB();

// // Import route
// const userRoutes = require('./routes/user');

// // Sử dụng route có tiền tố /api
// app.use('/api', userRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const app = express();

app.use(cors()); // ⚡ CHO PHÉP FRONTEND TRUY CẬP
app.use(express.json());

connectDB();

// Import route
const userRoutes = require('./routes/user');
app.use('/api/auth', authRoutes); // Thêm tiền tố /api/auth cho các route xác thực

// Sử dụng route có tiền tố /api
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));