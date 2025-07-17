import axios from "axios";
import React, { useState } from "react";
import { useNotification } from "../../helper/NotificationContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const ScanMember = () => {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showNotification("Token tidak ditemukan. Silakan login ulang.", "error");
      navigate("/login");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/admin/scan",
        { uid: uid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data.data;
      showNotification("Login berhasil!", "success");
      navigate(`/admin/member/dashboard/${user.id}`);
    } catch (err) {
      console.error("Login gagal:", err.response || err.message);
      if (err.response?.status === 404) {
        localStorage.setItem("uid", uid);
        showNotification("UID tidak ditemukan, silakan daftar.", "error");
        navigate("/admin/addmember");
      } else if (err.response?.status === 401) {
        showNotification("Token tidak valid atau kedaluwarsa.", "error");
        localStorage.removeItem("uid");
        navigate("/login");
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
      <div className="card p-4 shadow-sm border-0" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Scan Kartu</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan UID"
            value={uid}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
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

export default ScanMember;
