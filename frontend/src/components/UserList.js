import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api"; // 🧩 import API chung
import axios from "axios";
import AddUser from "./AddUser";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // 🧩 user đang được chỉnh sửa
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 🧩 Hàm tải danh sách người dùng
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách:", error);
    }
  };

  // 🧩 Lấy danh sách khi load
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🧩 Xóa người dùng
  const handleDelete = async (_id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(_id);
        setUsers((prev) => prev.filter((user) => user._id !== _id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        alert("Không thể xóa người dùng. Vui lòng thử lại!");
      }
    }
  };

  // 🧩 Bắt đầu chỉnh sửa
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // 🧩 Lưu chỉnh sửa
  const handleSave = async (_id) => {
    try {
      await axios.put(`http://localhost:3000/users/${_id}`, {
        name: editName,
        email: editEmail,
      });
      setEditingUser(null);
      fetchUsers(); // reload danh sách
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật người dùng:", error);
      alert("Không thể cập nhật người dùng. Vui lòng thử lại!");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "20px auto",
        textAlign: "left",
      }}
    >
      {/* 🧩 Form thêm người dùng */}
      <AddUser onUserAdded={fetchUsers} />

      <h2 style={{ color: "#028241", marginBottom: "15px" }}>
        👥 Danh sách người dùng
      </h2>

      {users.length === 0 ? (
        <p style={{ color: "#666" }}>Chưa có người dùng nào!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9fafb",
                padding: "10px 15px",
                marginBottom: "10px",
                borderRadius: "8px",
                borderLeft: "5px solid #028241",
              }}
            >
              {editingUser === u._id ? (
                // 🧩 Chế độ chỉnh sửa
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ) : (
                // 🧩 Chế độ xem
                <div style={{ flex: 1 }}>
                  <strong>{u.name}</strong>
                  <br />
                  <span style={{ color: "#555" }}>{u.email}</span>
                </div>
              )}

<<<<<<< HEAD

=======
>>>>>>> origin/backend
              {editingUser === u._id ? (
                <>
                  <button
                    onClick={() => handleSave(u._id)}
                    style={{
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    💾 Lưu
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    style={{
                      background: "#6b7280",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Hủy
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      background: "#0284c7",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
<<<<<<< HEAD
                      borderRadius: "6px",padding: "6px 12px",
=======
                      borderRadius: "6px",
                      padding: "6px 12px",
>>>>>>> origin/backend
                      cursor: "pointer",
                    }}
                  >
                    🗑 Xóa
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;