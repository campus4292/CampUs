import React from "react";
import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <h3>Admin Panel</h3>
        <Link to="/admin" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/users" style={linkStyle}>Manage Users</Link>
        <Link to="/admin/analytics" style={linkStyle}>Analytics</Link>
      </div>

      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "220px",
  background: "#7c2d12",
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

export default AdminLayout;