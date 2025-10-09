// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // ⚙️ Backend server URL

// 🧩 Lấy danh sách người dùng
export async function getUsers() {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
}

// 🧩 Thêm người dùng mới
export async function addUser(user) {
  const res = await axios.post(`${API_URL}/users`, user);
  return res.data;
}

// 🧩 Xóa người dùng theo ID
export async function deleteUser(id) {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
}