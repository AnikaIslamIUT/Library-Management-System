import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
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
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
        <button type="submit" onClick={handleAddUser}>Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => {
            return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
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

export default UserManagement;
