import axios from "axios";
import React, { useState } from "react";
import { useNotification } from "../../helper/NotificationContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const MemberLogin = () => {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  let navigate = useNavigate();

  const handleLogin = async () => {
    if (!uid.trim()) {
      showNotification("UID tidak boleh kosong", "error");
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        uid: uid,
      });
      localStorage.setItem("uid", response.data.data.uid);
      showNotification("Login berhasil!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login gagal:", err.response || err.message);
      if (err.response?.status === 404) {
        localStorage.setItem("uid", uid);
        console.log(localStorage.getItem("uid"));
        showNotification("UID tidak ditemukan, silakan daftar.", "error");
        navigate("/daftar");
      } else {
        setError("Gagal login. Silakan coba lagi.");
        showNotification("Gagal login. Silakan coba lagi.", "error");
      }
    }
  };

  const handleInputChange = (e) => {
    setUid(e.target.value);
    setError("");
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
