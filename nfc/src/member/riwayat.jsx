import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const DataRiwayat = () => {
  const [log, setlog] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchlog();
  }, []);

  const fetchlog = async () => {
    try {
      const response = await api.get("/log");
      console.log(response.data.data);
      setlog(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Gagal mengambil data dari server.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Daftar Member</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>User id</th>
            <th>Status</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {log.map((member, i) => (
            <tr className="table-info" key={member.id}>
              <td>{i}</td>
              <td>{member.user_id}</td>
              <td>{member.status}</td>
              <td>{member.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataRiwayat;
