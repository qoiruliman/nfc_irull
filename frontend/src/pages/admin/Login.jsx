import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../helper/NotificationContext";
import axiosInstance from "../../helper/axioss";

const LoginAdmin = () => {
  const [data, setData] = useState({ nama: "", password: "" });
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/login", {
        name: data.nama,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      showNotification("Nama atau password salah", "success");
      navigate("/admin");
    } catch (error) {
      showNotification("Nama atau password salah", "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">
              Nama:
            </label>
            <input
              type="text"
              className="form-control"
              id="nama"
              name="nama"
              value={data.nama}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
