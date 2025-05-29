import React, { useState } from "react";
import api from "../lib/apii";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
      const response = await api.post("/admin/login", {
        name: formData.name,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "../admin/dashboard";
      setError("");
    } catch (err) {
      console.error("Login gagal:", err.response || err.message);
      setError("name atau password salah");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Masuk</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fas fa-${
                showPassword ? "eye-slash" : "eye"
              } position-absolute`}
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePassword}
            ></i>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
