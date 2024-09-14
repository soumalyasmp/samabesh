import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, TextField, Button, Typography, Box, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';

const DonationForm = () => {
  const location = useLocation();
  const alumni_name = location.state?.alumni_name || '';
  const alumniId = location.state?.alumniId || '';
  const projectId = location.state?.projectId || '';

  const [formData, setFormData] = useState({
    amount: '',
    message: '',
    alumni_name: alumni_name,
    alumniId: alumniId,
    projectId: projectId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('alumniToken');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    try {
      const donationRes = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const donationData = await donationRes.json();

      if (donationRes.ok) {
        const updateRes = await fetch(`http://localhost:5000/api/donation-projects/update/${projectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: formData.amount }),
        });

        const updateData = await updateRes.json();

        if (updateRes.ok) {
          alert('Donation successful!');
          setFormData({ amount: '', message: '', alumni_name: alumni_name, projectId: projectId, alumniId: alumniId });
        } else {
          alert(`Error: ${updateData.message || 'Donation failed'}`);
        }
      } else {
        alert(`Error: ${donationData.message || 'Donation failed'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Donate to Project
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <FormControl fullWidth margin="normal">
            <TextField
              required
              name="amount"
              label="Amount"
              type="number"
              variant="outlined"
              value={formData.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              name="message"
              label="Message (optional)"
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            style={{ marginTop: '1rem' }}
          >
            Donate
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default DonationForm;






