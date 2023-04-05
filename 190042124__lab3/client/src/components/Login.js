import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, NavLink } from "react-router-dom";
import jwt_decode from 'jwt-decode';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });

      const token = response.data.token;
      const decoded = jwt_decode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', decoded.userId); // assuming user id is stored in the token as "id"
      const userId = localStorage.getItem('userId');
      console.log("ID "+userId);
      window.location.href = `/userbookList/${userId}`;
    } catch (error) {
      console.error(error);
    }
  }
 

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
