import React, { useState } from "react";
import "../assets/sibebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext";

function SidebarAdmin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("tokennn");
    showNotification("Berhasil logout.", "info");
    navigate("/admin/login");
  };

  return (
    <>
      {/* <div className="wrapper"> */}
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="fa-solid fa-grip-lines"></i>
          </button>
          <div className="sidebar-logo">
            <Link to="#">Admin</Link>
          </div>
        </div>

        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/admin" className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link
              className="sidebar-link has-dropdown collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i class="fa-solid fa-house-user"></i>
              <span>Member</span>
            </Link>
            <ul
              id="auth"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <Link to="/admin/members" className="sidebar-link">
                  <i class="fa-solid fa-users"></i>
                  List Member
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/admin/addmember" className="sidebar-link">
                  <i class="fa-solid fa-user-plus"></i>
                  Add Member
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/admin/log" className="sidebar-link">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  Logs
                </Link>
              </li>
            </ul>
          </li>

          <li className="sidebar-item">
            <Link to="/admin/scan" className="sidebar-link">
              <i className="fa-solid fa-qrcode"></i>
              <span>Scan</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/admin/edit" className="sidebar-link">
              <i className="fa-solid fa-pen-to-square"></i>
              <span>Edit</span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <Link to="./" className="sidebar-link" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default SidebarAdmin;
