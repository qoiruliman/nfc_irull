import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../helper/sidebaradmin";
import { useEffect } from "react";

const DashboardAdminView = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  return (
    <div className="wrapper">
      <SidebarAdmin />
      <main className="main">{children}</main>
    </div>
  );
};

export default DashboardAdminView;
