import React from "react";

function StudentDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>

      <h1 style={{ marginTop: "20px" }}>Student Dashboard</h1>

      <div style={cardContainer}>

        <div style={card}>
          <h3>Exchange Requests</h3>
          <p>Buy, Rent, Exchange items with students</p>
        </div>

        <div style={card}>
          <h3>Academic Section</h3>
          <p>Notes, Assignments, Study materials</p>
        </div>

        <div style={card}>
          <h3>Emergency Help</h3>
          <p>Report issues & request assistance</p>
        </div>

        <div style={card}>
          <h3>Wallet</h3>
          <p>Manage your Campus Coins</p>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;


/* STYLES */

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "30px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
};