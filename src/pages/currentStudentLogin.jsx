import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrentStudentLogin.css';  // Import the CSS file for styling
import Navbar from '../components/Navbar';

const CurrentStudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and navigate to the student's profile page
        localStorage.setItem('studentToken', data.token);
        navigate(`/student-profile/${data._id}`); // Correctly navigate to profile page
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error appropriately (e.g., show an error message)
    }
  };

  return (
    <div className="login-container">
        <Navbar/>
      <h2>Current Student Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="signup-container">
        <p>Don't have an account?</p>
        <a href="/student-register" className="signup-button">Sign Up</a>
      </div>
    </div>
  );
};

export default CurrentStudentLogin;