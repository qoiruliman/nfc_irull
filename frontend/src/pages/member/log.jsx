import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../helper/sidebaradmin";
import axiosInstance from "../../helper/axioss";
import Loading from "../../helper/loading";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.post("/log", { uid });
        setMembers(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data API:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      member.user_id.toString().includes(searchTerm) ||
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

        <input
          type="text"
          placeholder="Cari Status, atau waktu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px", marginBottom: "15px" }}
        />

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggal</th>
            </tr>
          </thead>
          {/* <tbody>
            {filtered.map((member, i) => {
              const date = new Date(member.created_at);
              const tanggal = date.toLocaleDateString("id-ID", {
                dateStyle: "medium",
              });
              const jam = date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{member.status}</td>
                  <td>{`${tanggal}, ${jam}`}</td>
                </tr>
              );
            })}
          </tbody> */}

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

export default Log;
