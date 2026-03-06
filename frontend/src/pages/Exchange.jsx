import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../api";

function Exchange() {

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = user?.username || "guest";
  const coins = user?.coins || 100;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("buy");
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);

  /* ================= LOAD ================= */

  useEffect(() => {

    axios
      .get(`${API}/exchange/all`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log("LOAD ERROR:", err));

  }, []);

  /* ================= CREATE ================= */

  const handleAdd = async () => {

    if (!title.trim()) return;

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/exchange/create`,
        {
          title,
          type,
          description: "User added item"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRequests((prev) => [res.data, ...prev]);
      setTitle("");

    } catch (err) {

      console.log("CREATE ERROR:", err.response?.data);

    }

  };

  /* ================= ACCEPT ================= */

  const handleAccept = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/exchange/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id
            ? { ...req, status: "Accepted" }
            : req
        )
      );

    } catch (err) {

      console.log("ACCEPT ERROR:", err.response?.data);

    }

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/exchange/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRequests((prev) =>
        prev.filter((req) => req._id !== id)
      );

    } catch (err) {

      console.log("DELETE ERROR:", err.response?.data);

    }

  };

  /* ================= FILTER ================= */

  const filteredRequests = requests.filter((req) =>
    req.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (

    <div style={pageStyle}>

      <h2>Campus Marketplace</h2>

      <div style={userInfo}>
        Logged in as: {currentUser}
        <br />
        Coins: <span style={{ color: "#2563eb" }}>{coins}</span>
      </div>

      {/* ADD REQUEST */}

      <div style={formBox}>

        <div style={formRow}>

          <div style={formGroup}>
            <label style={labelStyle}>Item Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={inputStyle}
            >

              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="exchange">Exchange</option>

            </select>

          </div>

          <button
            style={primaryBtn}
            onClick={handleAdd}
          >
            Add Request
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div style={searchBox}>

        <input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

      </div>

      {/* REQUESTS */}

      <div style={gridStyle}>

        {filteredRequests.map((req) => (

          <div key={req._id} style={cardStyle}>

            <h4 style={{ marginBottom: "10px" }}>
              {req.title}
            </h4>

            <p>Type: {req.type}</p>

            <p>Owner: {req.ownerUsername}</p>

            <p>

              Status:{" "}

              <span
                style={{
                  color:
                    req.status === "Open"
                      ? "green"
                      : "#2563eb",
                  fontWeight: "600"
                }}
              >
                {req.status}
              </span>

            </p>

            <div style={cardActions}>

              {req.status === "Open" &&
                req.ownerUsername !== currentUser && (

                  <button
                    style={primaryBtn}
                    onClick={() =>
                      handleAccept(req._id)
                    }
                  >
                    Accept
                  </button>

                )}

              {req.ownerUsername === currentUser && (

                <button
                  style={dangerBtn}
                  onClick={() =>
                    handleDelete(req._id)
                  }
                >
                  Delete
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

/* ================= STYLES ================= */

const pageStyle = {
  padding: "25px"
};

const userInfo = {
  marginBottom: "20px",
  fontWeight: "600"
};

const formBox = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const formRow = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap"
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  minWidth: "200px"
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "5px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "200px"
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  height: "40px",
  marginTop: "22px"
};

const dangerBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
  width: "120px"
};

const searchBox = {
  margin: "20px 0"
};

const searchInput = {
  padding: "8px",
  width: "260px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  color: "#111827"
};

const cardActions = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};

export default Exchange;