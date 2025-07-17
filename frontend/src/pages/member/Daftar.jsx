import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../helper/NotificationContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    no_hp: "",
    alamat: "",
    email: "",
    username: "",
  });
  const { showNotification } = useNotification();
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("uid");
    if (id) {
      setFormData({
        uid: id,
        name: "",
        no_hp: "",
        alamat: "",
        email: "",
        username: "",
      });
      localStorage.removeItem("uid");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/register", {
        uid: formData.uid,
        name: formData.name,
        no_hp: formData.no_hp,
        alamat: formData.alamat,
        email: formData.email,
      });

      showNotification("Berhasil mendaftar.", "success");
      setFormData({
        uid: "",
        name: "",
        no_hp: "",
        alamat: "",
        email: "",
      });
      localStorage.setItem("uid", response.data.data.uid);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      showNotification("Gagal registrasi", "error");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Daftar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="uid"
              placeholder="UID"
              value={formData.uid}
              required
              disabled
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
          <button type="submit" className="btn btn-success w-100">
            Daftar
          </button>
          <div className="mt-3 text-center">
            <a href="/login">Scan Kartu</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberRegister;
