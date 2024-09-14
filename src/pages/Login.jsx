import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';  // Import the CSS file for Login page
import { useNavigate, useLocation } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get state from location
  const state = location.state || {};
  const { alumni_name, alumniId, projectId } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/alumni/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store token and user info
        localStorage.setItem('alumniToken', data.token); // Store token for authenticated requests
        
        // Check if we need to redirect to DonationForm
        if (alumni_name && alumniId && projectId) {
          navigate(`/donate/${projectId}`, { 
            state: { alumni_name, alumniId, projectId }
          });
        } else {
          // Navigate to the alumni profile page
          navigate(`/alumni/${data._id}`);
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
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
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="signup-container">
          <p>Don't have an account?</p>
          <a href="/register" className="signup-button">Sign Up</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
