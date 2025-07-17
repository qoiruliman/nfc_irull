import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../../helper/loading";
import "../../../assets/setting.css";
import { useNotification } from "../../../helper/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../helper/axioss";

const EditMemberAdminView = () => {
  const [member, setMember] = useState({});
  const [originalMember, setOriginalMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.get(`admin/member/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMember(response.data.data);
        setOriginalMember(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else if (error.response && error.response.status === 404) {
          navigate("/not-found");
        }
        console.error("Gagal mengambil data API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(`/member/${member.id}`, member, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showNotification("Berhasil mengupdate user.", "success");
    } catch (error) {
      console.error("Gagal update data member", error);
      showNotification("Gagal menyimpan data.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setMember(originalMember);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-3">
      <div className="main p-3">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4">Pengaturan Profil</h3>

          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            id="name"
            className="form-control mb-3"
            type="text"
            name="name"
            value={member.name || ""}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />

          <label htmlFor="no_hp" className="form-label">
            Nomor HP
          </label>
          <input
            id="no_hp"
            className="form-control mb-3"
            type="text"
            name="no_hp"
            value={member.no_hp || ""}
            onChange={handleChange}
            placeholder="Masukkan nomor HP"
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control mb-3"
            type="email"
            name="email"
            value={member.email || ""}
            onChange={handleChange}
            placeholder="Masukkan email aktif"
          />

          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
          <input
            id="alamat"
            className="form-control mb-3"
            type="text"
            name="alamat"
            value={member.alamat || ""}
            onChange={handleChange}
            placeholder="Masukkan alamat lengkap"
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

export default EditMemberAdminView;
