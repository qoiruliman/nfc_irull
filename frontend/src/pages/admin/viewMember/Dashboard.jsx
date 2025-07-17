import { useEffect, useState } from "react";
import Loading from "../../../helper/loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../helper/axioss";

const DashboardMemberAdminView = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!id) {
        navigate("/admin/members");
        return;
      }

      try {
        const response = await axiosInstance.get(`admin/member/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Gagal mengambil data API:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4">
            <i className="fa-solid fa-user-circle me-2 text-warning"></i>
            Selamat Datang,{" "}
            <span className="text-primary">{data.name || "-"}</span>
          </h4>

          <div className="row mb-3">
            <div className="col-sm-2 fw-semibold">📞 Nomor HP</div>
            <div className="col-sm-8">:{data.no_hp || "-"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-2 fw-semibold">📧 Email</div>
            <div className="col-sm-8">:{data.email || "-"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-2 fw-semibold">📍 Alamat:</div>
            <div className="col-sm-8">:{data.alamat || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMemberAdminView;
