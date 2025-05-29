import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const DataMember = ({ members, setMembers, error }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Apa kamu yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`admin/member/${id}`);
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const handleEdit = (id) => {
    navigate(`../admin/member/${id}`);
  };

  return (
    <div>
      <h2 className="mb-3">Daftar Member</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr className="table-info" key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.no_hp}</td>
              <td>{member.alamat}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(member.id)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(member.id)}
                >
                  <i className="fas fa-trash"></i> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataMember;
