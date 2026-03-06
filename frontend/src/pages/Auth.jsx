import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logo from "../assets/campus.png";
import API from "../api";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  /* ================= REDIRECT ================= */

  const redirectByRole = (role) => {
    if (role === "student") navigate("/student");
    else if (role === "faculty") navigate("/faculty");
    else if (role === "admin") navigate("/admin");
    else if (role === "outsider") navigate("/outsider");
  };

  /* ================= LOGIN ================= */

  const handleLogin = async () => {

    try {

      const res = await axios.post(`${API}auth/login`,{
        username,
        password
      });

      const decoded = jwtDecode(res.data.token);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(decoded));

      redirectByRole(decoded.role);

    } catch (err) {

      alert(err.response?.data?.message || "Login failed");

    }

  };

  /* ================= REGISTER ================= */

  const handleRegister = async () => {

    try {

      await axios.post(`${API}auth/register`, {
        name,
        email,
        username,
        password
      });

      alert("Registered successfully! Please login.");
      setIsLogin(true);

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="page-center">

      <div className="card">
         <div style={cardHeaderContainer}>

          <div style={cardHeader}>

            <img src={logo} alt="Campus Logo" style={cardLogo} />

            <div style={cardHeaderText}>
              <h3 style={cardHeaderTitle}>CampUs</h3>
              <p style={cardHeaderSubtitle}>Connecting Students Together</p>
            </div>

          </div>

        </div>
        <div style={headerRow}>
          <div>
            <h2 style={titleStyle}>
              {isLogin ? "Sign In" : "Register"}
            </h2>

            <p style={subtitleStyle}>
              {isLogin
                ? "Enter your credentials to continue"
                : "Create your campus account"}
            </p>
          </div>
        </div>        

        {/* REGISTER FIELDS */}

        {!isLogin && (
          <>
            <input
              style={inputStyle}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={inputStyle}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              style={inputStyle}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {/* LOGIN FIELD */}

        {isLogin && (
          <input
            style={inputStyle}
            placeholder="Username or Email"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* PASSWORD */}

        <div style={passwordWrapper}>

          <input
            style={passwordInput}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            style={eyeStyle}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>

        </div>

        {/* OPTIONS */}



        {isLogin && (
          <div style={optionsStyle}>
            <label style={rememberLabel}>
              <input type="checkbox" style={checkboxStyle} />
              Remember me
            </label>

            <span style={forgotStyle}>
              Forgot password?
            </span>
          </div>
        )}

        {/* BUTTON */}

        <button
          style={buttonStyle}
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Sign In" : "Register"}
        </button>

        {/* TOGGLE */}

        <p style={{ marginTop: "20px", fontSize: "14px" }}>

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            style={linkStyle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Create one" : " Sign in"}
          </span>

        </p>

      </div>

    </div>
  );
}

export default Auth;


/* ================= STYLES ================= */

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

const passwordInput = {
  ...inputStyle,
  paddingRight: "40px"
};


const optionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: "4px",
  marginBottom: "18px",
};
const forgotStyle = {
  fontSize: "14px",
  color: "#2563eb",
  cursor: "pointer",
  lineHeight: "1",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  transition: "0.2s"
};

const linkStyle = {
  color: "#2563eb",
  cursor: "pointer",
  marginLeft: "5px"
};
const rememberLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  cursor: "pointer"
};

const checkboxStyle = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
  accentColor: "#3b82f6",
  margin: 0,
};
const headerRow = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  marginBottom: "20px"
};


const titleStyle = {
  margin: "0",
  fontSize: "24px",
  fontWeight: "600"
};

const subtitleStyle = {
  marginTop: "4px",
  color: "#6b7280",
  fontSize: "14px"
};

const passwordWrapper = {
  position: "relative",
  width: "100%"
};

const eyeStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "16px",
  color: "#6b7280"
};
const cardHeaderContainer = {
  background: "#f8fafc",
  borderBottom: "1px solid #e5e7eb",
  padding: "14px 20px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  marginBottom: "20px"
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  gap: "12px"
};

const cardLogo = {
  width: "40px",
  height: "40px",
  objectFit: "contain"
};

const cardHeaderText = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const cardHeaderTitle = {

  margin: 0,
  fontSize: "21px",
  fontWeight: "600",
  color: "#111827",
};

const cardHeaderSubtitle = {
  margin: 0,
  fontSize: "12px",
  color: "#6b7280"
};