import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/campus.png"; // adjust path if needed

function StudentLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={layoutStyle}>

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebarStyle,
          transform: open ? "translateX(0)" : "translateX(-100%)"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>CampUs</h2>

        <Link style={linkStyle} to="/student">Dashboard</Link>
        <Link style={linkStyle} to="/student/exchange">Exchange</Link>
        <Link style={linkStyle} to="/student/academic">Academic</Link>
        <Link style={linkStyle} to="/student/emergency">Emergency</Link>
        <Link style={linkStyle} to="/student/wallet">Wallet</Link>
        <Link style={linkStyle} to="/student/myrequests">MyRequests</Link>

        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>


      {/* MAIN AREA */}
      <div
        style={{
          ...mainArea,
          marginLeft: open ? "230px" : "0"
        }}
      >

        {/* TOPBAR */}
        <div style={topbar}>

  {/* LEFT */}
          <div style={topLeft}>
            <button
              style={menuButton}
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>

          {/* CENTER */}
          <div style={topCenter}>
            CampUs
          </div>

          {/* RIGHT */}
          <div style={topRight}>
            <img
              src={logo}
              alt="Campus"
              style={logoStyle}
            />
          </div>

        </div>

        {/* PAGE CONTENT */}
        <div style={contentStyle}>
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default StudentLayout;


/* ================= STYLES ================= */

const layoutStyle = {
  display: "flex",
  minHeight: "100vh",
  width: "100%"
};

const sidebarStyle = {
  width: "230px",
  background: "#0f172a",
  color: "white",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  transition: "0.3s ease",
  zIndex: 1000
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginBottom: "15px",
  fontSize: "15px"
};

const logoutBtn = {
  marginTop: "auto",
  background: "#ef4444",
  border: "none",
  padding: "10px",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const mainArea = {
  flex: 1,
  width: "100%",
  transition: "margin-left 0.3s ease"
};

const topbar = {
  height: "60px",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

const topLeft = {
  width: "120px",
  display: "flex",
  alignItems: "center"
};

const topCenter = {
  flex: 1,
  textAlign: "center",
  fontWeight: "700",
  fontSize: "25px"
};

const topRight = {
  width: "120px",
  display: "flex",
  justifyContent: "flex-end"
};

const menuButton = {
  fontSize: "25px",
  border: "none",
  background: "none",
  cursor: "pointer",
  color: "black",
  alignItems: "left",
  justifyContent: "left",
};

const logoStyle = {
  width: "40px",
  height: "40px",
  objectFit: "contain"
};

const contentStyle = {
  padding: "30px",
  background: "#f1f5f9",
  minHeight: "calc(100vh - 60px)"
};