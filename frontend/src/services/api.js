// 📁 src/services/api.js

const BASE_URL = "http://localhost:3000/users";

// Thêm người dùng mới
export async function addUser(user) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return await response.json();
}

// Lấy danh sách người dùng
export async function getUsers() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
}

// Xóa người dùng theo id
export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete user");
  return await response.json();
}
