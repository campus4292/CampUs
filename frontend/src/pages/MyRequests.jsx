import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function MyRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get(
      `${API}/exchange/my-requests`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => setRequests(res.data));

  }, []);

  return (

    <div style={{ padding: "20px" }}>
      <h2>My Exchange Requests</h2>

      {requests.map(req => (

        <div key={req._id} style={cardStyle}>

          <h4>{req.title}</h4>

          <p>Type: {req.type}</p>

          <p>Status: {req.status}</p>

          <p>
            Accepted By:{" "}
            <strong>
              {req.acceptedBy ? req.acceptedBy : "No one yet"}
            </strong>
          </p>

        </div>

      ))}

    </div>

  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  color: "#111827",
};


export default MyRequests;