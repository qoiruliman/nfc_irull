import React, { useEffect, useState } from "react";
import Loading from "../../helper/loading";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";

const DashboardAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmin(response.data.data);
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

  if (loading) return <Loading />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Selamat Datang, Admin</h3>

              {admin.path ? (
                <img
                  src={`http://127.0.0.1:8000/storage/${admin.path}`}
                  alt="Foto Admin"
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #007bff",
                  }}
                />
              ) : (
                <p>kosong</p>
              )}

              <p className="mb-2">
                <strong>Nama:</strong> {admin.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {admin.email}
              </p>
              {admin.created_at && (
                <p className="mb-3">
                  <strong>Terdaftar sejak:</strong>{" "}
                  {new Date(admin.created_at).toLocaleDateString("id-ID", {
                    dateStyle: "medium",
                  })}
                </p>
              )}

              <a href="/admin/edit" className="btn btn-primary w-100">
                Ubah Profil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
