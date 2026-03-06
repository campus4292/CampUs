import React from "react";
import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  const menuItems = {
    student: [
      { label: "Dashboard", path: "/student" },
      { label: "Exchange", path: "/student/exchange" },
      { label: "Academic", path: "/student/academic" },
      { label: "Emergency", path: "/student/emergency" },
      { label: "Wallet", path: "/student/wallet" },
    ],
    faculty: [
      { label: "Dashboard", path: "/faculty" },
      { label: "Approve Academic", path: "/faculty/academic" },
      { label: "Emergency Monitor", path: "/faculty/emergency" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Manage Users", path: "/admin/users" },
      { label: "Analytics", path: "/admin/analytics" },
    ],
    outsider: [
      { label: "Dashboard", path: "/outsider" },
    ],
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h3>CampUs</h3>
        <p style={{ fontSize: "12px", opacity: 0.7 }}>{role}</p>

        {menuItems[role]?.map((item) => (
          <Link key={item.path} to={item.path} style={linkStyle}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "240px",
  background: "#111827",
  color: "white",
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "6px",
};

export default MainLayout;