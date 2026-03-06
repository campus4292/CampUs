import React, { useState } from "react";
import axios from "axios";
import API from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/auth/register`, {
        name,
        username,
        email,
        password,
      });

      alert("Registered Successfully. Please login.");
      window.location.href = "/";
    } catch (err) {
      alert("User already exists");
    }
  };
  {!isLogin && (
  <>
    <input
      placeholder="Full Name"
      onChange={(e) => setName(e.target.value)}
    />
    <br /><br />

    <input
      placeholder="Username (unique)"
      onChange={(e) => setUsername(e.target.value)}
    />
    <br /><br />
  </>
  )}

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleRegister}>Sign Up</button>
    </div>
  );
}

export default Register;