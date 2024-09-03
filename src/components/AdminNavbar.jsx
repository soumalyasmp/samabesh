import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS file

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <ul className="nav-links">
        <li><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
        <li><Link className="nav-link" to="/admin/alumni">Alumni</Link></li>
        <li><Link className="nav-link" to="/admin/students">Students</Link></li>
        <li><Link className="nav-link" to="/admin/donations">Donations</Link></li>
        <li><Link className="nav-link" to="/admin/events">Events</Link></li>
        <li><Link className="nav-link" to="/admin/jobs">Jobs</Link></li> {/* New link for Jobs */}
      </ul>
    </nav>
  );
}

export default AdminNavbar;