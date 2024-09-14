import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './AlumniDirectory.css';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const navigate = useNavigate();
   // Fetch and extract user ID and email from the token
   useEffect(() => {
    const token = localStorage.getItem('alumniToken');
    if (token) {
      // Decode the token manually
      const payload = token.split('.')[1]; // Extract payload
      const decodedPayload = atob(payload); // Base64 decode
      const user = JSON.parse(decodedPayload); // Parse JSON payload
      setLoggedInUserId(user.id); // Adjust according to the token structure
      setLoggedInUserEmail(user.email); // Adjust according to the token structure
    }
  }, []);

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
      filterAlumni(data); // Filter data after fetching
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      setAlumni([]); // Clear results on error
    }
  };

  // Filter alumni data based on search criteria
  const filterAlumni = (data) => {
    const filtered = data.filter(alumnus => 
      (!searchName || alumnus.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchProfession || alumnus.profession.toLowerCase().includes(searchProfession.toLowerCase())) &&
      (!searchYear || alumnus.graduationYear.toString().includes(searchYear))
    );
    setFilteredAlumni(filtered);
  };

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Trigger search
  const handleSearch = () => {
    fetchAlumni();
  };

  // Navigate to alumni profile
  const goToProfile = (id) => {
    navigate(`/alumni/${id}`);
  };

  // Send email function
  const sendEmail = async (recipientEmail, emailSubject, emailMessage) => {
    const emailData = {
      senderEmail: loggedInUserEmail,
      recipientEmail,
      subject: emailSubject,
      message: emailMessage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email');
    }
  };

  // Send connection request
  const sendConnectionRequest = async (alumnusId) => {
    try {
      const response = await fetch('http://localhost:5000/api/connection/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: loggedInUserId,        // Use logged-in user's ID
          requesteeId: alumnusId,            // ID of the alumnus being sent the request
          requesterModel: 'Alumni',          // Assuming the logged-in user is an alumni
          requesteeModel: 'Alumni',          // Assuming the alumnus is also an alumni
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Connection request sent successfully');
      } else {
        alert(result.message || 'Failed to send connection request');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('An error occurred while sending the connection request');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Alumni Directory</h1>
          
          {/* Search Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Name"
              value={searchName}
              onChange={handleInputChange(setSearchName)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Profession"
              value={searchProfession}
              onChange={handleInputChange(setSearchProfession)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Graduation Year"
              value={searchYear}
              onChange={handleInputChange(setSearchYear)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>

          {/* Alumni List Section */}
          {filteredAlumni.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map(alumnus => (
                <li key={alumnus._id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-700">{alumnus.name}</h2>
                    <button
                      onClick={() => goToProfile(alumnus._id)}
                      className="text-sm text-green-500 hover:underline"
                    >
                      View Profile
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p><strong>Email:</strong> {alumnus.email}</p>
                    <p><strong>Graduation Year:</strong> {alumnus.graduationYear}</p>
                    <p><strong>Profession:</strong> {alumnus.profession}</p>
                  </div>

                  {/* Email Section */}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Email Subject"
                      className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                    <textarea
                      placeholder="Email Message"
                      className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setEmailMessage(e.target.value)}
                    />
                    <button
                      onClick={() => sendEmail(alumnus.email, emailSubject, emailMessage)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Send Message
                    </button>
                  </div>

                  {/* Connection Request Section */}
                  <div className="mt-4">
                    <button
                      onClick={() => sendConnectionRequest(alumnus._id)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Send Connection Request
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No alumni found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AlumniDirectory;









