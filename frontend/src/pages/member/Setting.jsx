import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../helper/loading";
import "../../assets/setting.css";
import { useNotification } from "../../helper/NotificationContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const Setting = () => {
  const [member, setMember] = useState({});
  const [originalMember, setOriginalMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.post("/me", {
          uid,
        });

        setMember(response.data.data);
        console.log(response.data.data);
        setOriginalMember(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("uid");
          navigate("/login");
        }
        console.error("Gagal mengambil data api:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      showNotification("Berhasil Mengupdate User.", "success");
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
            placeholder="Masukkan nama lengkap"
            name="name"
            value={member.name || ""}
            onChange={handleChange}
          />

          <label htmlFor="no_hp" className="form-label">
            Nomor HP
          </label>
          <input
            id="no_hp"
            className="form-control mb-3"
            type="text"
            placeholder="Masukkan nomor HP"
            name="no_hp"
            value={member.no_hp || ""}
            onChange={handleChange}
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control mb-3"
            type="email"
            placeholder="Masukkan email aktif"
            name="email"
            value={member.email || ""}
            onChange={handleChange}
          />

          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
          <input
            id="alamat"
            className="form-control mb-3"
            type="text"
            placeholder="Masukkan alamat lengkap"
            name="alamat"
            value={member.alamat || ""}
            onChange={handleChange}
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

export default Setting;
