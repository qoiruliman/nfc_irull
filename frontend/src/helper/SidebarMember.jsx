import React, { useState } from "react";
import "../assets/sibebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext";

function SidebarMember() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("uid");
    showNotification("Berhasil logout.", "info");
    navigate("/login");
  };

  return (
    <>
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="fa-solid fa-grip-lines"></i>
          </button>
          <div className="sidebar-logo">
            <Link to="#">Menu</Link>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/log" className="sidebar-link">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>Logs</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/edit" className="sidebar-link">
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

export default SidebarMember;
