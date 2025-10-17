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





// backend/controllers/userController.js
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const newUser = await User.create({ name, email });
  res.status(201).json(newUser);
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};