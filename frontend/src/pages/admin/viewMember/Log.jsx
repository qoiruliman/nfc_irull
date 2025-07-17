import React, { useState, useEffect } from "react";
import Loading from "../../../helper/loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../helper/axioss";

const LogMemberAdminView = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate("/admin/members");
        return;
      }

      const token = localStorage.getItem("token");
      try {
        const response = await axiosInstance.get(`/admin/log/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(response.data.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            navigate("/admin/members");
          } else if (error.response.status === 401) {
            navigate("/login");
          }
        } else {
          console.error("Gagal mengambil data API:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (loading) return <Loading />;

  const filtered = members.filter((member) => {
    const date = new Date(member.created_at);
    const tanggal = date.toLocaleDateString("id-ID", { dateStyle: "medium" });
    const jam = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const waktuGabungan = `${tanggal}, ${jam}`.toLowerCase();

    return (
      member.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waktuGabungan.includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-3">
      <div className="main p-3">
        <h2>History</h2>

        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Cari status atau waktu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ width: "300px" }}
          />
        </div>

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((log, index) => {
                const date = new Date(log.created_at);
                const tanggal = date.toLocaleDateString("id-ID", {
                  dateStyle: "medium",
                });
                const jam = date.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{log.name}</td>
                    <td>{log.status}</td>
                    <td>{`${tanggal}, ${jam}`}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <nav className="mt-3">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default LogMemberAdminView;
