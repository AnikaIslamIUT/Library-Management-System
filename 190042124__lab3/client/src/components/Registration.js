import React, { useState, useEffect } from "react";
import axios from "axios";

const Registration = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/users", newUser).then((response) => {
      setUsers([...users, response.data]);
      setNewUser({ username: "", password: "", role: "" });
    });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
  <div style={{ maxWidth: 600, margin: 'auto' }}>
  <h2>User Management</h2>
  <form onSubmit={handleAddUser} style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', marginBottom: 10 }}>
      <label htmlFor="username" style={{ marginRight: 10 }}>Username:</label>
      <input
        type="text"
        name="username"
        value={newUser.username}
        onChange={handleInputChange}
        required
        style={{ flex: 1 }}
      />
    </div>
    <div style={{ display: 'flex', marginBottom: 10 }}>
      <label htmlFor="password" style={{ marginRight: 10 }}>Password:</label>
      <input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleInputChange}
        required
        style={{ flex: 1 }}
      />
    </div>
    <div style={{ display: 'flex', marginBottom: 10 }}>
      <label htmlFor="role" style={{ marginRight: 10 }}>Role:</label>
      <select
        name="role"
        value={newUser.role}
        onChange={handleInputChange}
        required
        style={{ flex: 1 }}
      >
        <option value="">Select a role</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="librarian">Librarian</option>
      </select>
    </div>
    <button type="submit" onClick={handleAddUser}>Add User</button>
  </form>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ borderBottom: '1px solid black' }}>
        <th>ID</th>
        <th>Username</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => {
        return (
        <tr key={user.id} style={{ borderBottom: '1px solid black' }}>
          <td style={{ padding: 10 }}>{user.id}</td>
          <td style={{ padding: 10 }}>{user.username}</td>
          <td style={{ padding: 10 }}>{user.role}</td>
          <td style={{ padding: 10 }}>
            <button onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </td>
        </tr>
        );
      })}
    </tbody>
      </table>
    </div>
  );
};

export default Registration;
