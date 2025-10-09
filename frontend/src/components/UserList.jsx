import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api"; // 🧩 import API chung


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🧩 Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách:", error);
    }
  };

  // 🧩 Xóa người dùng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        fetchUsers(); // Refresh danh sách
      } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        alert("Không thể xóa người dùng. Vui lòng thử lại!");
      }
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
      <h2 style={{ color: "#028241", marginBottom: "15px" }}>
        👥 Danh sách người dùng
      </h2>

      {users.length === 0 ? (
        <p style={{ color: "#666" }}>Chưa có người dùng nào!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u.id}
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
              <div>
                <strong>{u.name}</strong>
                <br />
                <span style={{ color: "#555" }}>{u.email}</span>
              </div>
              <button
                onClick={() => handleDelete(u.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                🗑 Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
