// Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../lib/api";
import DataMember from "./Member";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("admin/members");
      setMembers(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Gagal mengambil data dari server.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid bg-info">
          <a className="navbar-brand" href="#">
            <img
              src="https://getbootstrap.com//docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Bootstrap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="nav collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Member{" "}
                  <span className="badge bg-light text-dark">
                    {members.length}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../../login">
                  Scan
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Add laporan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <DataMember members={members} setMembers={setMembers} error={error} />
      </div>
    </>
  );
};

export default Dashboard;
