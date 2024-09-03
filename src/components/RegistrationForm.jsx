import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Convert successStories to JSON string
    formData.append('successStories', JSON.stringify(successStories));

    try {
        const res = await fetch('http://localhost:5000/api/alumni/register', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            throw new Error('Registration failed');
        }
        navigate('/success'); // Redirect on success
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Graduation Year:</label>
        <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} required />
      </div>
      <div>
        <label>Profession:</label>
        <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Average CGPA:</label>
        <input type="number" step="0.1" value={averageCgpa} onChange={(e) => setAverageCgpa(e.target.value)} min="0" max="10" />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
      </div>
      <div>
        <label>Current Company:</label>
        <input type="text" value={currentCompany} onChange={(e) => setCurrentCompany(e.target.value)} />
      </div>
      <div>
        <label>Current Location:</label>
        <input type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />
      </div>
      <div>
        <h3>Success Stories</h3>
        {successStories.map((story, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={story.title}
              onChange={(e) => handleStoryChange(index, 'title', e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={story.description}
              onChange={(e) => handleStoryChange(index, 'description', e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveStory(index)}>Remove Story</button>
          </div>
        ))}
        <button type="button" onClick={handleAddStory}>Add Story</button>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;