// const express = require('express');
// const app = express();

// app.use(express.json());

// // Import routes
// const userRoutes = require('./routes/user');
// app.use('/users', userRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const User = require('./routes/user');

const app = express();
app.use(express.json()); // Cho phép đọc JSON từ request body

// 👉 Thay link này bằng link MongoDB Atlas của bạn
const mongoURI = 'mongodb+srv://loi224453_db_user:hZWnSsuzolQi89LA@groupdb.lzoxwbo.mongodb.net/?retryWrites=true&w=majority&appName=groupDB';

// Kết nối MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Đã kết nối MongoDB Atlas thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// API GET: Lấy danh sách người dùng
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API POST: Thêm người dùng mới
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
