import React, { useEffect, useState } from "react";
import axios from "axios";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await axios.get(`https://camp-rjlh1ujms-camp-us.vercel.app/admin/users`, {
      headers: { authorization: token },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) return;

    await axios.post(`https://camp-rjlh1ujms-camp-us.vercel.app/admin/users`,
      { name, email, role },
      { headers: { authorization: token } }
    );

    setName("");
    setEmail("");
    setRole("student");

    fetchUsers();
  };

  const updateRole = async (id, role) => {
    await axios.put(
      `https://camp-rjlh1ujms-camp-us.vercel.app/admin/users/${id}`,
      { role },
      { headers: { authorization: token } }
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `https://camp-rjlh1ujms-camp-us.vercel.app/admin/users/${id}`,
      { headers: { authorization: token } }
    );
    fetchUsers();
  };

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