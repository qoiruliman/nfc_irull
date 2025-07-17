import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMember from "../../helper/sidebarmember";
import axiosInstance from "../../helper/axioss";

const DashboardMember = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("uid");

    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="wrapper">
      <SidebarMember />
      <main className="main">{children}</main>
    </div>
  );
};

export default DashboardMember;

// import SidebarMember from "../../helper/sidebarmember";

// const DashboardMember = ({ children }) => {
//   return (
//     <div className="wrapper">
//       <SidebarMember />
//       <main className="main">{children}</main>
//     </div>
//   );
// };

// export default DashboardMember;

// import { Suspense } from "react";
// import Loading from "../../helper/loading";
// import SidebarMember from "../../helper/SidebarMember";

// const DashboardMember = ({ children }) => {
//   return (
//     <div className="wrapper">
//       <SidebarMember />
//       <Suspense fallback={<Loading />}>
//         <main className="main">{children}</main>
//       </Suspense>
//     </div>
//   );
// };

// export default DashboardMember;
