import React, { useState } from "react";
import api from "../lib/apii";

const MemberLogin = () => {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!uid.trim()) {
      setError("UID tidak boleh kosong.");
      return;
    }

    try {
      const response = await api.post("/login", { uid: uid.trim() });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login gagal:", err.response || err.message);
      if (err.response?.status === 401) {
        window.location.href = "/daftar";
      } else {
        setError("Gagal login. Silakan coba lagi.");
      }
    }
  };

  const handleInputChange = (e) => {
    setUid(e.target.value);
    setError(""); // reset error ketika user mulai mengetik
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Scan Kartu</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan UID"
            value={uid}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default MemberLogin;
