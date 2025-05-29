import React, { useState } from "react";
import api from "../lib/apii";

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    no_hp: "",
    alamat: "",
    email: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", {
        uid: formData.uid,
        name: formData.name,
        no_hp: formData.no_hp,
        alamat: formData.alamat,
        email: formData.email,
        username: formData.username,
      });

      setSuccess("Registrasi berhasil! Silakan login.");
      setError("");
      setFormData({
        uid: "",
        name: "",
        no_hp: "",
        alamat: "",
        email: "",
        username: "",
      });
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registrasi gagal");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Daftar</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="uid"
              placeholder="UID"
              value={formData.uid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="no_hp"
              placeholder="No HP"
              value={formData.no_hp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="alamat"
              placeholder="Alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Daftar
          </button>
          <div className="mt-3 text-center">
            <a href="/login">Sudah punya akun? Masuk</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberRegister;
