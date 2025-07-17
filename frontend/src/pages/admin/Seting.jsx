import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../helper/loading";
import "../../assets/setting.css";
import { useNotification } from "../../helper/NotificationContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const SettingAdmin = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [originalAdmin, setOriginalAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setAdmin((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axiosInstance.get("/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmin({
          ...response.data.data,
          password: "",
          photo: null,
        });
        setOriginalAdmin(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.error("Gagal mengambil data admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", admin.name);
      formData.append("email", admin.email);
      if (admin.password) formData.append("password", admin.password);
      if (admin.photo) formData.append("foto", admin.photo);

      // Spoof method PUT
      formData.append("_method", "PUT");

      const response = await axiosInstance.post(
        `/admin/${admin.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showNotification("Profil admin berhasil diperbarui.", "success");
    } catch (error) {
      console.error("Gagal update admin:", error);
      showNotification("Gagal menyimpan data admin.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setAdmin({
      ...originalAdmin,
      password: "",
      photo: null,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-3">
      <div className="main p-3">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4">Pengaturan Admin</h3>

          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            id="name"
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Masukkan nama"
            value={admin.name}
            onChange={handleChange}
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={admin.email}
            onChange={handleChange}
          />

          <label htmlFor="password" className="form-label">
            Password (opsional)
          </label>
          <input
            id="password"
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Masukkan password baru (jika ingin diubah)"
            value={admin.password}
            onChange={handleChange}
          />

          <label htmlFor="photo" className="form-label">
            Foto (opsional)
          </label>
          <input
            id="photo"
            className="form-control mb-4"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={saving}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingAdmin;
