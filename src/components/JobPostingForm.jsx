import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const JobPostingForm = ({ alumni_name }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    alumniId: alumni_name || '', // Set default value from props
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Use formData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Job posted successfully:', result);
      // Handle successful posting (e.g., show a success message or redirect)
      alert('Job posted successfully!');
      setFormData({
        title: '',
        company: '',
        description: '',
        location: '',
        alumniId: alumni_name || '',
      });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Post a Job
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff', // White background for the form
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Post Job
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default JobPostingForm;
