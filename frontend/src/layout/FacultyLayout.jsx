import React from "react";
import { Outlet, Link } from "react-router-dom";

function FacultyLayout() {
  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <h3>Faculty Panel</h3>
        <Link to="/faculty" style={linkStyle}>Dashboard</Link>
        <Link to="/faculty/academic" style={linkStyle}>Approve Academic</Link>
        <Link to="/faculty/emergency" style={linkStyle}>Emergency Monitor</Link>
      </div>

      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "220px",
  background: "#1f2937",
  color: "white",
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const linkStyle = {
  color: "white",
  textDecoration: "none"
};

export default FacultyLayout;