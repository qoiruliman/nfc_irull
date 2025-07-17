import React, { useState, useEffect } from "react";
import axiosInstance from "../../helper/axioss";
import Loading from "../../helper/loading";
import { useNavigate } from "react-router-dom";

const AllLog = () => {
  const [logs, setLogs] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [logsRes, membersRes] = await Promise.all([
          axiosInstance.get("/admin/logs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/admin/members", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setLogs(logsRes.data.data);
        setMembers(membersRes.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;
  const mergedLogs = logs.map((log) => {
    const member = members.find((m) => m.id === log.user_id);
    return {
      ...log,
      name: member?.name || "Tidak ditemukan",
    };
  });
  const filtered = mergedLogs.filter((log) => {
    const date = new Date(log.created_at);
    const waktu = `${date.toLocaleDateString("id-ID", {
      dateStyle: "medium",
    })}, ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const matchesSearch =
      log.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waktu.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesName =
      !selectedName || log.name.toLowerCase() === selectedName.toLowerCase();

    return matchesSearch && matchesName;
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

          <select
            className="form-select"
            style={{ width: "200px" }}
            value={selectedName}
            onChange={(e) => {
              setSelectedName(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">-- Semua Nama --</option>
            {[...new Set(members.map((m) => m.name))].map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
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

export default AllLog;
