import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, Menu, MenuItem } from '@mui/material';
import { gsap } from 'gsap';
import Footer from '../components/Footer';
import JobList from '../components/JobList';
import EventList from '../components/EventList';

const CurrentStudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const profileRef = useRef(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/profile/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  useEffect(() => {
    if (student) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, [student]);

  const handleUpdateClick = () => setIsUpdating(true);

  const handleClose = () => setIsUpdating(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/students/profile/${id}`, {
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
      setStudent({ ...student, ...updatedData });
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
      await fetch('http://localhost:5000/api/logout', { method: 'POST' });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Box className="flex flex-col md:flex-row mt-12 px-6 py-10 bg-white shadow-md rounded-lg relative">
        <Box
          ref={profileRef}
          className="md:w-1/4 flex flex-col items-start bg-white shadow-lg rounded-lg p-4"
          style={{ height: 'fit-content' }} // Set height to auto to fit content
        >
          <Box className="flex items-center space-x-4 mb-6">
            <img
              src={student.profilePicture ? `http://localhost:5000/uploads/${student.profilePicture}` : 'default-image-url.jpg'}
              alt={`${student.name}'s profile`}
              className="w-20 h-20 rounded-full border-3 border-teal-600"
            />
            <Box className="ml-4">
              <Typography variant="h6" className="font-semibold text-gray-900">
                {student.name}
              </Typography>
              <Typography variant="body1" className="text-gray-700 mt-1">
                {student.email}
              </Typography>
              <Typography variant="body1" className="text-teal-600 mt-1">
                {student.studentId}
              </Typography>
            </Box>
          </Box>

          <Divider className="my-4" />

          <Box className="w-full space-y-2">
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                Graduation Year:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.graduationYear || 'Not provided'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                Department:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.department || 'Not provided'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                CGPA:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.cgpa || 'Not provided'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                Skills:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.skills || 'Not provided'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                Bio:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.bio || 'Not provided'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="font-semibold text-gray-800">
                Interests:
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                {student.interests || 'Not provided'}
              </Typography>
            </Box>
          </Box>

          <Button variant="contained" color="success" className="w-full mt-6" onClick={handleUpdateClick}>
            Update Profile
          </Button>

          <Link to='/student/directory' className="mt-4 block text-teal-600 hover:underline text-lg">
            Back to Student Directory
          </Link>
        </Box>

        {/* Right Side - Events, and Jobs */}
        <Box className="md:w-3/4 flex flex-col items-end md:pl-4 mt-8 md:mt-0 relative">
          <Box className="w-full">
            <EventList 
              fromStudentProfile={true} 
              studentId={id} 
              studentName={student.name} 
              studentEmail={student.email} 
            />
          </Box>

          <Box className="w-full mt-4">
            <JobList fromProfile={true} />
          </Box>

          {/* Profile Picture Icon for Logout */}
          <Button
            variant="text"
            color="primary"
            onClick={handleProfilePictureClick}
            className="rounded-full"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '3rem',
              height: '3.8rem',
              zIndex: 50
            }}
          >
            <img 
              src={student.profilePicture ? `http://localhost:5000/uploads/${student.profilePicture}` : 'default-image-url.jpg'} 
              alt={`${student.name}'s profile`} 
              className="w-full h-full object-cover rounded-full border-2 border-teal-500"
            />
          </Button>
        </Box>
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
                  <label htmlFor="graduationYear" className="font-semibold">Graduation Year:</label>
                  <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={updatedData.graduationYear || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </Box>
                <Box className="flex flex-col">
                  <label htmlFor="department" className="font-semibold">Department:</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={updatedData.department || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </Box>
                <Box className="flex flex-col">
                  <label htmlFor="cgpa" className="font-semibold">CGPA:</label>
                  <input
                    type="text"
                    id="cgpa"
                    name="cgpa"
                    value={updatedData.cgpa || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </Box>
                <Box className="flex flex-col">
                  <label htmlFor="skills" className="font-semibold">Skills:</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={updatedData.skills || ''}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </Box>
              </Box>

              <Box className="mt-4 flex justify-end space-x-2">
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
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

export default CurrentStudentProfile;




