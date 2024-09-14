import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaBriefcase, FaEnvelope, FaLock, FaChartLine, FaImage, FaBuilding, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [averageCgpa, setAverageCgpa] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [successStories, setSuccessStories] = useState([{ title: '', description: '' }]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleStoryChange = (index, field, value) => {
    const newStories = [...successStories];
    newStories[index][field] = value;
    setSuccessStories(newStories);
  };

  const handleAddStory = () => {
    setSuccessStories([...successStories, { title: '', description: '' }]);
  };

  const handleRemoveStory = (index) => {
    const newStories = successStories.filter((_, i) => i !== index);
    setSuccessStories(newStories);
  };

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
    formData.append('graduationYear', graduationYear);
    formData.append('profession', profession);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('averageCgpa', averageCgpa);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    formData.append('currentCompany', currentCompany);
    formData.append('currentLocation', currentLocation);
    formData.append('successStories', JSON.stringify(successStories));

    try {
      const res = await fetch('http://localhost:5000/api/alumni/register', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      navigate('/loginpage'); // Redirect on success
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
        <label className="block text-gray-700">Profession:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaBriefcase className="mr-2 text-gray-500" />
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
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
        <label className="block text-gray-700">Average CGPA:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaChartLine className="mr-2 text-gray-500" />
          <input
            type="number"
            step="0.1"
            value={averageCgpa}
            onChange={(e) => setAverageCgpa(e.target.value)}
            min="0"
            max="10"
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
      <div className="mb-4">
        <label className="block text-gray-700">Current Company:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaBuilding className="mr-2 text-gray-500" />
          <input
            type="text"
            value={currentCompany}
            onChange={(e) => setCurrentCompany(e.target.value)}
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Current Location:</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />
          <input
            type="text"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="w-full border-none focus:ring-0 outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Success Stories</h3>
        {successStories.map((story, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="w-1/2 mr-2">
              <input
                type="text"
                placeholder="Title"
                value={story.title}
                onChange={(e) => handleStoryChange(index, 'title', e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>
            <div className="w-full">
              <textarea
                placeholder="Description"
                value={story.description}
                onChange={(e) => handleStoryChange(index, 'description', e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                style={{ height: '100px' }}
                required
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveStory(index)}
              className="ml-2 p-2 text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStory}
          className="flex items-center text-blue-500"
        >
          <FaPlus className="mr-2" /> Add Another Story
        </button>
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

export default RegisterForm;

