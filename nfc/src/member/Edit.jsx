import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";

const FormEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    no_hp: "",
    alamat: "",
  });
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await api.get(`me`);
        setFormData(response.data.data);
        setId(response.data.data.id);
      } catch (err) {
        console.error("Gagal ambil data:", err);
        setError("Gagal mengambil data member.");
      }
    };
    fetchMember();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`member/${id}`, formData);
      setSuccess("Data berhasil diperbarui.");
      setError("");
    } catch (err) {
      console.error("Gagal update:", err);
      setError("Gagal memperbarui data member.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "30rem" }}>
        <h2 className="text-center mb-3">Edit Member</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>No HP</label>
            <input
              type="text"
              className="form-control"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Alamat</label>
            <textarea
              className="form-control"
              name="alamat"
              rows="3"
              value={formData.alamat}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEdit;
