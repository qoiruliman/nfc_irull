import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MemberRegister from "./member/Daftar";
import MemberLogin from "./member/tes";
import DataRiwayat from "./member/riwayat";
import FormEdit from "./member/Edit";
import Dashboard from "./admin/Dashboard";
import Dashboard1 from "./member/Dashboard";
import EditForm from "./admin/edit";
import AdminLogin from "./admin/Login";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path="/login" element={<MemberLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard1 />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/member/:id" element={<EditForm />} />
      <Route path="/daftar" element={<MemberRegister />} />
      <Route path="/edit" element={<FormEdit />} />
      <Route path="/log" element={<DataRiwayat />} />
    </Routes>
  );
};

export default App;
