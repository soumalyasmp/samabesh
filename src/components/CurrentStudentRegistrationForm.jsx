import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const CurrentStudentRegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('graduationYear', graduationYear);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const res = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      navigate('/student/login'); // Redirect on success
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaUser className="mr-2 text-gray-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Graduation Year:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaGraduationCap className="mr-2 text-gray-500" />
          <input
            type="number"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            required
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaEnvelope className="mr-2 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaLock className="mr-2 text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Picture:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaImage className="mr-2 text-gray-500" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default CurrentStudentRegistrationForm;


