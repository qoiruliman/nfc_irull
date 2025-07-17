import React from "react";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./helper/NotificationContext";
import MemberLogin from "./pages/member/Login";
import MemberRegister from "./pages/member/Daftar";
import DashboardMember from "./pages/member/DashboardMember";
import Setting from "./pages/member/Setting";
import Menu from "./pages/member/Menu";
import Log from "./pages/member/log";
import LoginAdmin from "./pages/admin/Login";
import DashboardAdminView from "./pages/admin/DashboardAdmin";
import DashboardAdmin from "./pages/admin/Dashboard";
import SettingAdmin from "./pages/admin/Seting";
import Members from "./pages/admin/member";
import AddMember from "./pages/admin/AddMember";
import AllLog from "./pages/admin/Logs";
import ScanMember from "./pages/admin/ScanMember";
import MemberDashboardView from "./pages/admin/MemberDashboardView";
import MenuMemberAdminView from "./pages/admin/viewMember/Dashboard";
import EditMemberAdminView from "./pages/admin/viewMember/Edit";
import LogMemberAdminView from "./pages/admin/viewMember/Log";
import NotFound from "./pages/404";
import RegisterAdmin from "./pages/admin/Register";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<MemberLogin />} />
          <Route path="/daftar" element={<MemberRegister />} />
          <Route
            path="/dashboard"
            element={
              <DashboardMember>
                <Menu />
              </DashboardMember>
            }
          />
          <Route
            path="/edit"
            element={
              <DashboardMember>
                <Setting />
              </DashboardMember>
            }
          />
          <Route
            path="/log"
            element={
              <DashboardMember>
                <Log />
              </DashboardMember>
            }
          />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/daftar" element={<RegisterAdmin />} />
          <Route
            path="/admin"
            element={
              <DashboardAdminView>
                <DashboardAdmin />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/edit"
            element={
              <DashboardAdminView>
                <SettingAdmin />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/members"
            element={
              <DashboardAdminView>
                <Members />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/addmember"
            element={
              <DashboardAdminView>
                <AddMember />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/log"
            element={
              <DashboardAdminView>
                <AllLog />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/scan"
            element={
              <DashboardAdminView>
                <ScanMember />
              </DashboardAdminView>
            }
          />
          <Route
            path="/admin/member/dashboard/:id"
            element={
              <MemberDashboardView>
                <MenuMemberAdminView />
              </MemberDashboardView>
            }
          />
          <Route
            path="/admin/member/log/:id"
            element={
              <MemberDashboardView>
                <LogMemberAdminView />
              </MemberDashboardView>
            }
          />
          <Route
            path="/admin/member/edit/:id"
            element={
              <MemberDashboardView>
                <EditMemberAdminView />
              </MemberDashboardView>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
