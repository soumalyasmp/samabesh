import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar'; // Ensure you have this component implemented

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>
        <p className="text-center text-gray-600 mb-12">
          Welcome to the Admin Panel. Use the links below to navigate to different sections:
        </p>

        {/* Links to Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Link */}
          <Link to="/admin/dashboard" className="admin-home-link transform transition duration-300 hover:scale-105">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard</h2>
              <p className="text-gray-500">View overall statistics and charts.</p>
            </div>
          </Link>

          {/* Manage Alumni */}
          <Link to="/admin/alumni" className="admin-home-link transform transition duration-300 hover:scale-105">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Alumni</h2>
              <p className="text-gray-500">View and manage alumni records.</p>
            </div>
          </Link>

          {/* Manage Students */}
          <Link to="/admin/students" className="admin-home-link transform transition duration-300 hover:scale-105">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Students</h2>
              <p className="text-gray-500">View and manage student records.</p>
            </div>
          </Link>

          {/* Manage Donations */}
          <Link to="/admin/donations" className="admin-home-link transform transition duration-300 hover:scale-105">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Donations</h2>
              <p className="text-gray-500">View and manage donation records.</p>
            </div>
          </Link>

          {/* Manage Events */}
          <Link to="/admin/events" className="admin-home-link transform transition duration-300 hover:scale-105">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Events</h2>
              <p className="text-gray-500">View and manage events and reunions.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;