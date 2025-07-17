import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/sibebar.css";

function SidebarViewAsMember() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const isNumeric = (value) => /^\d+$/.test(value);

    if (!id || !isNumeric(id)) {
      navigate("/not-found");
    }
  }, [id, navigate]);

  return (
    <div className="wrapper">
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
            <Link to={`/admin/member/dashboard/${id}`} className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to={`/admin/member/log/${id}`} className="sidebar-link">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>Logs</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to={`/admin/member/edit/${id}`} className="sidebar-link">
              <i className="fa-solid fa-pen-to-square"></i>
              <span>Edit</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to={`/admin`} className="sidebar-link">
              <i className="fa-solid fa-user-shield"></i>
              <span>Admin</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/admin/members" className="sidebar-link">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Back</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default SidebarViewAsMember;
