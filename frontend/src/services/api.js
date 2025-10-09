// 📁 src/services/api.js

// Thêm người dùng mới qua API backend
export async function addUser(user) {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Add user failed:", errorText);
      throw new Error("Failed to add user: " + errorText);
    }
    return await response.json();
  } catch (err) {
    console.error("Network or server error:", err);
    throw err;
  }
}

// Lấy danh sách người dùng
export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
}

// Xóa người dùng theo id
export async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return await response.json();
}
