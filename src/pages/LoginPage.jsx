import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiEndpoint = activeTab === 'alumni'
      ? 'http://localhost:5000/api/alumni/login'
      : activeTab === 'student'
      ? 'http://localhost:5000/api/students/login'
      : 'http://localhost:5000/api/admin/login';
      
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(activeTab === 'admin' && { name: formData.name }) // Only include name for admin
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const tokenKey = activeTab === 'admin'
        ? 'adminToken'
        : activeTab === 'student'
        ? 'studentToken'
        : 'alumniToken'; // Add this line to handle alumni
        if (activeTab === 'alumni') {
          localStorage.setItem('alumniId', data._id); // Save alumni ID
        }
      localStorage.setItem(tokenKey, data.token);
      localStorage.setItem('alumniName', data.name);
      console.log('Token Stored:', data.token);
        navigate(`/${activeTab === 'admin' ? 'admin/dashboard' : `${activeTab}/${data._id}`}`);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex space-x-4 mb-6 mt-6">
          <button
            onClick={() => setActiveTab('alumni')}
            className={`px-4 py-2 text-lg font-medium cursor-pointer transition-colors ${activeTab === 'alumni' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Login as Alumni
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 text-lg font-medium cursor-pointer transition-colors ${activeTab === 'student' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Login as Student
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 text-lg font-medium cursor-pointer transition-colors ${activeTab === 'admin' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Login as Admin
          </button>
        </div>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {activeTab === 'admin' ? 'Admin' : activeTab === 'student' ? 'Current Student' : 'Alumni'} Login
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'admin' && (
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <a href={`/${activeTab}-register`} className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;