import React, { useState } from "react";
import { addUser } from "../services/api";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("⚠️ Tên không được để trống!");
    if (!/\S+@\S+\.\S+/.test(email)) return alert("⚠️ Email không hợp lệ!");

    try {
      setLoading(true);
      await addUser({ name, email });
      setName("");
      setEmail("");
      alert("✅ Thêm người dùng thành công!");
      if (onUserAdded) onUserAdded(); // 🔁 Gọi callback để load lại danh sách
    } catch (error) {
      console.error("❌ Lỗi khi thêm người dùng:", error);
      alert("Không thể thêm người dùng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        textAlign: "left",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#028241", marginBottom: "15px" }}>➕ Thêm người dùng</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Họ tên..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#ccc" : "#028241",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "⏳ Đang thêm..." : "➕ Thêm người dùng"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
