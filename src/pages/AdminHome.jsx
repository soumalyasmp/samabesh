import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import './AdminHome.css'; // Optional: for custom styles

function AdminHome() {
  return (
    <div>
      <AdminNavbar />
      <main>
        <h1>Admin Home</h1>
        <p>Welcome to the Admin Panel. Use the links below to navigate to different sections:</p>
        <div className="admin-home-links">
          <Link to="/admin/dashboard" className="admin-home-link">
            <h2>Dashboard</h2>
            <p>View overall statistics and charts.</p>
          </Link>
          <Link to="/admin/alumni" className="admin-home-link">
            <h2>Manage Alumni</h2>
            <p>View and manage alumni records.</p>
          </Link>
          <Link to="/admin/students" className="admin-home-link">
            <h2>Manage Students</h2>
            <p>View and manage student records.</p>
          </Link>
          <Link to="/admin/donations" className="admin-home-link">
            <h2>Manage Donations</h2>
            <p>View and manage donation records.</p>
          </Link>
          <Link to="/admin/events" className="admin-home-link">
            <h2>Manage Events</h2>
            <p>View and manage events and reunions.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;