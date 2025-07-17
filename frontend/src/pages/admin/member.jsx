import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axioss";
import Loading from "../../helper/loading";
import axios from "axios";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/admin/members", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.error("Gagal mengambil data anggota:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus anggota ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/admin/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Gagal menghapus anggota:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/member/edit/${id}`);
  };

  const handleViewLog = (id) => {
    navigate(`/admin/member/log/${id}`);
  };

  const handleLoginAsUser = (id) => {
    navigate(`/admin/member/dashboard/${id}`);
  };

  const filtered = members.filter((member) => {
    const k = keyword.toLowerCase();
    return (
      member.name?.toLowerCase().includes(k) ||
      member.no_hp?.toLowerCase().includes(k) ||
      member.alamat?.toLowerCase().includes(k) ||
      member.email?.toLowerCase().includes(k)
    );
  });

  if (loading) return <Loading />;

  return (
    <div className="p-3">
      <div className="main p-3">
        <h2>Daftar Anggota</h2>

        <input
          type="text"
          placeholder="Cari nama, no HP, alamat, atau email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "8px", width: "300px", marginBottom: "15px" }}
          className="form-control"
        />

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Alamat</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((member, index) => (
                <tr key={member.id || index}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.no_hp}</td>
                  <td>{member.alamat}</td>
                  <td>{member.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEdit(member.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-1"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info btn-sm me-1"
                      onClick={() => handleViewLog(member.id)}
                    >
                      Cek Log
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleLoginAsUser(member.id)}
                    >
                      Login
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
