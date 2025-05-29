import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    no_hp: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me");
        const user = response.data.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          no_hp: user.no_hp || "",
          alamat: user.alamat || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewLog = () => {
    navigate("/log");
  };

  if (loading) return <div className="text-center mt-5">Memuat data...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Dashboard</h2>

        <div className="mb-3">
          <strong>Nama:</strong> {formData.name}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {formData.email}
        </div>
        <div className="mb-3">
          <strong>No HP:</strong> {formData.no_hp}
        </div>
        <div className="mb-3">
          <strong>Alamat:</strong> {formData.alamat}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-info" onClick={handleViewLog}>
            Lihat Log
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
