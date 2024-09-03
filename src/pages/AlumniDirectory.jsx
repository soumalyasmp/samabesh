import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AlumniDirectory.css'; // Import the CSS file for styling

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const navigate = useNavigate();

  // Fetch all alumni data
  const fetchAlumni = async () => {
    try {
      const query = new URLSearchParams({
        name: searchName,
        profession: searchProfession,
        graduationYear: searchYear,
      }).toString();
      
      const res = await fetch(`http://localhost:5000/api/alumni?${query}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setAlumni(data);
      // Call filtering function after fetching data
      filterAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      setAlumni([]); // Clear results on error
    }
  };

  // Function to filter alumni data based on search criteria
  const filterAlumni = (data) => {
    const filtered = data.filter(alumnus => 
      (!searchName || alumnus.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchProfession || alumnus.profession.toLowerCase().includes(searchProfession.toLowerCase())) &&
      (!searchYear || alumnus.graduationYear.toString().includes(searchYear))
    );
    setFilteredAlumni(filtered);
  };

  // Function to handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Function to trigger search
  const handleSearch = () => {
    fetchAlumni(); // Fetch and filter data on search
  };

  // Function to navigate to the alumni profile
  const goToProfile = (id) => {
    navigate(`/alumni/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="alumni-directory-main">
        <div className="search-container">
          <input
            type="text"
            placeholder="Name"
            value={searchName}
            onChange={handleInputChange(setSearchName)}
          />
          <input
            type="text"
            placeholder="Profession"
            value={searchProfession}
            onChange={handleInputChange(setSearchProfession)}
          />
          <input
            type="number"
            placeholder="Graduation Year"
            value={searchYear}
            onChange={handleInputChange(setSearchYear)}
          />
          <button onClick={handleSearch}>Search</button> {/* Trigger search on button click */}
        </div>
        
        <ul>
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map(alumnus => (
              <li key={alumnus._id}>
                <div>
                  <strong>Name:</strong> {alumnus.name}
                  <button onClick={() => goToProfile(alumnus._id)}>View Profile</button>
                </div>
                <div><strong>Email:</strong> {alumnus.email}</div>
                <div><strong>Graduation Year:</strong> {alumnus.graduationYear}</div>
                <div><strong>Profession:</strong> {alumnus.profession}</div>
              </li>
            ))
          ) : (
            <p>No alumni found.</p>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniDirectory;






