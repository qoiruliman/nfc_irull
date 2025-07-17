import { useState } from "react";
import { useNotification } from "../../helper/NotificationContext";
import axiosInstance from "../../helper/axioss";
import { Link } from "react-router-dom";

const RegisterAdmin = () => {
  const [data, setData] = useState({ nama: "", email: "", password: "" });
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/register", {
        name: data.nama,
        email: data.email,
        password: data.password,
      });
      showNotification("Registrasi berhasil!", "success");
      setData({ nama: "", email: "", password: "" });
    } catch (error) {
      showNotification("Registrasi gagal", "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Registrasi Admin</h2>
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
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={data.email}
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

          <button type="submit" className="btn btn-success w-100 mb-3">
            Register
          </button>

          <div className="text-center">
            <span>Sudah punya akun? </span>
            <Link to="/admin/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
