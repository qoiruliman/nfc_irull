import React, { useEffect, useState } from "react";
import api from "../lib/apii";

const MemberLogin = () => {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const response = api.post("/login", { uid: scannedUid });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login gagal:", err.response || err.message);
      if (err.response?.status === 401) {
        window.location.href = "/daftar";
      } else {
        setError("Gagal login. Silakan coba lagi.");
      }
    }
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-3">Scan Kartu</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="text-center mb-3">
          Silakan tap kartu ke reader Anda...
        </div>
        {uid && <p className="text-success text-center">{uid}</p>}
      </div>
    </div>
  );
};

export default MemberLogin;
