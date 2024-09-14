import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, Menu, MenuItem } from '@mui/material';
import { gsap } from 'gsap';

import Footer from '../components/Footer';
import DonationForm from '../components/DonationForm';
import JobPostingForm from '../components/JobPostingForm';
import EventList from '../components/EventList';
import DonationList from '../components/DonationList';

const AlumniProfile = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [loggedInAlumniId, setLoggedInAlumniId] = useState(null); // Currently logged-in alumni
  const [connectionRequests, setConnectionRequests] = useState([]); // Initialize state
  const [showRequestsModal, setShowRequestsModal] = useState(false); // Initialize state
  const [anchorEl, setAnchorEl] = useState(null);
  const profileRef = useRef(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      const token = localStorage.getItem('alumniToken');
      const name=localStorage.getItem('alumniName');
      console.log(name);
      console.log(token);
      try {
        const res = await fetch(`http://localhost:5000/api/alumni/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setAlumni(data);
      } catch (error) {
        console.error('Error fetching alumni details:', error);
      }
    };
        // Fetch currently logged-in alumni's ID from localStorage
        const loggedInAlumniId = localStorage.getItem('alumniId'); // Fetch alumniId from localStorage
        console.log(loggedInAlumniId);
        setLoggedInAlumniId(loggedInAlumniId);
    
        fetchAlumniDetails();
      }, [id]);

  useEffect(() => {
    if (alumni) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, [alumni]);
  const handleShowRequestsClick = () => {
    navigate(`/alumni/${id}/connections`); // Navigate to the connections page
  };

  const handleUpdateClick = () => setIsUpdating(true);

  const handleClose = () => setIsUpdating(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure CGPA has no decimal placess

    try {
      const res = await fetch(`http://localhost:5000/api/alumni/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await res.json();
      setAlumni({ ...alumni, ...updatedData });
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfilePictureClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/alumni/logout', { method: 'POST' }); // Logout request
      const token=localStorage.getItem('alumniToken');
      console.log(token);
      localStorage.removeItem(token); // Remove token

      navigate('/'); // Redirect to login page
      console.log(token);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  

  if (!alumni) {
    return <p>Loading...</p>;
  }
  const isOwnProfile = loggedInAlumniId === alumni._id;
  const profilePictureUrl = alumni.profilePicture 
    ? `http://localhost:5000/uploads/${alumni.profilePicture}` 
    : 'default-image-url.jpg';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
            <Box className="flex flex-col md:flex-row mt-12 px-6 py-10 bg-white shadow-md rounded-lg relative">
            <Box
          ref={profileRef}
          className="md:w-1/3 flex flex-col items-start bg-white shadow-lg rounded-lg p-6"
          style={{ height: 'fit-content' }} // Ensure the box height adjusts to content
        >
          <Box className="flex items-center space-x-4 mb-6">
            <img 
              src={profilePictureUrl} 
              alt={`${alumni.name}'s profile`} 
              className="w-24 h-24 rounded-full border-3 border-teal-600"
            />
            <Box className="ml-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                {alumni.name}
              </Typography>
              <Typography variant="body1" className="text-gray-700 mt-1">
                {alumni.profession}
              </Typography>
              <Typography variant="body1" className="text-teal-600 mt-1">
                {alumni.email}
              </Typography>
            </Box>
          </Box>

          <Divider className="my-4" />

        <Box className="w-full space-y-4">
            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Bio:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.bio || 'Not provided'}
              </Typography>
            </Box>

            <Divider className="my-2" />

            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Current Company:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.currentCompany || 'Not provided'}
              </Typography>
            </Box>

            <Divider className="my-2" />

            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Current Location:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.currentLocation || 'Not provided'}
              </Typography>
            </Box>

            <Divider className="my-2" />

            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Average CGPA:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.averageCgpa || 'Not provided'}
              </Typography>
            </Box>

            <Divider className="my-2" />

            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Graduation Year:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.graduationYear || 'Not provided'}
              </Typography>
            </Box>

            <Divider className="my-2" />

            <Box className="mb-4">
              <Typography variant="body1" className="font-semibold text-gray-800">
                Skills:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-1">
                {alumni.skills.join(', ') || 'Not provided'}
              </Typography>
            </Box>
          </Box>

          {isOwnProfile ? (<>   <Button variant="contained" color="success" className="w-full mt-6" onClick={handleUpdateClick}>
            Update Profile
          </Button></>):(<></>)}

          <Link to='/directory' className="mt-4 block text-teal-600 hover:underline text-lg">
            Back to Alumni Directory
          </Link>
          <Divider className="my-4" />

<Button variant="contained" color="primary" className="mt-4" onClick={handleShowRequestsClick}>
  Show Connection Requests
</Button>
        </Box>



        {/* Right Side - Events, Donations, and Jobs */}
        {isOwnProfile && <Box className="md:w-1/2 flex flex-col items-end md:pl-4 mt-8 md:mt-0 relative">
          <Box className="w-full">
            <EventList 
              fromAlumniProfile={true} 
              alumniId={id} 
              alumniName={alumni.name} 
              alumniEmail={alumni.email} 
            />
          </Box>

          <Box className="w-full mt-4">
            <DonationList alumni_name={alumni.name} alumniId={alumni._id} />
          </Box>

          <Box className="w-full mt-4">
            <JobPostingForm alumni_name={alumni.name} />
            <Link to={`/jobs-posted-by/${id}`} className="mt-2 inline-block text-teal-600 hover:underline">
              <Button variant="text" color="success">
                View Jobs Posted by You
              </Button>
            </Link>
          </Box>

          {/* Profile Picture Icon for Logout */}


        </Box>}
        <Button
  variant="text"
  color="primary"
  onClick={handleProfilePictureClick}
  className="rounded-full"
  style={{
    position: 'absolute', // Or 'fixed' for positioning relative to the entire screen
    top: '20px',          // Adjust as per your needs
    right: '20px',        // Adjust as per your needs
    width: '3rem',
    height: '3.8rem',
    zIndex: 50           // Ensure the button stays on top of other elements
  }}
>
  <img 
    src={profilePictureUrl} 
    alt={`${alumni.name}'s profile`} 
    className="w-full h-full object-cover rounded-full border-2 border-teal-500"
  />
</Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{ style: { width: 120 } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Update Profile Modal */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <Typography variant="h6" className="mb-4">Update Profile</Typography>
            <form onSubmit={handleSubmit}>
              <Box className="space-y-2">
                <Box className="flex flex-col">
                  <label htmlFor="currentCompany" className="font-semibold">Current Company:</label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={updatedData.currentCompany || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </Box>
                <Box className="flex flex-col">
                  <label htmlFor="currentLocation" className="font-semibold">Current Location:</label>
                  <input
                    type="text"
                    id="currentLocation"
                    name="currentLocation"
                    value={updatedData.currentLocation || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </Box>
                <Box className="flex flex-col">
                  <label htmlFor="bio" className="font-semibold">Bio:</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={updatedData.bio || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </Box>
                              <Box className="flex flex-col">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills:</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={updatedData.skills || alumni.skills.join(', ')}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </Box>
                <Button type="submit" variant="contained" color="success">
                  Save Changes
                </Button>
                <Button type="button" onClick={handleClose} variant="outlined" color="error" className="ml-2">
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </div>
      )}



      <Footer />
    </div>
  );
};

export default AlumniProfile;






















