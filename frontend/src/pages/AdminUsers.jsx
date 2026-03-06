import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const token = localStorage.getItem("token");

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data);

    } catch (err) {
      console.log("FETCH USERS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ADD USER ================= */

  const addUser = async () => {

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post(
        `${API}admin/users`,
        { name, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setEmail("");
      setPassword("");
      setRole("student");

      fetchUsers();

    } catch (err) {
      console.log("ADD USER ERROR:", err);
    }
  };

  /* ================= UPDATE ROLE ================= */

  const updateRole = async (id, role) => {

    try {

      await axios.put(
        `${API}admin/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers();

    } catch (err) {
      console.log("UPDATE ROLE ERROR:", err);
    }
  };

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `${API}admin/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers();

    } catch (err) {
      console.log("DELETE USER ERROR:", err);
    }
  };

  /* ================= UI ================= */

  return (

    <div>

      <h2>Manage Users</h2>

      {/* ADD USER FORM */}

      <div style={formBox}>

        <h4>Add New User</h4>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="student">student</option>
          <option value="faculty">faculty</option>
          <option value="admin">admin</option>
          <option value="outsider">outsider</option>
        </select>

        <button onClick={addUser} style={primaryBtn}>
          Add User
        </button>

      </div>

      {/* USERS TABLE */}

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>

                <select
                  defaultValue={user.role}
                  onChange={(e) => updateRole(user._id, e.target.value)}
                >
                  <option value="student">student</option>
                  <option value="faculty">faculty</option>
                  <option value="admin">admin</option>
                  <option value="outsider">outsider</option>
                </select>

              </td>

              <td>

                <button
                  onClick={() => deleteUser(user._id)}
                  style={dangerBtn}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

/* ================= STYLES ================= */

const formBox = {
  background: "#f3f4f6",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "8px",
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
};

const dangerBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
};

export default AdminUsers;