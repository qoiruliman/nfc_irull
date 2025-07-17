import { useNavigate, useParams } from "react-router-dom";
import SidebarViewAsMember from "../../helper/SidebarViewAsMember";
import { useEffect } from "react";

const MemberDashboardView = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }
    const isNumeric = (value) => /^\d+$/.test(value);

    if (!id || !isNumeric(id)) {
      navigate("/not-found");
    }
  }, [id, navigate]);

  return (
    <div className="wrapper">
      <SidebarViewAsMember />
      <main className="main">{children}</main>
    </div>
  );
};

export default MemberDashboardView;
