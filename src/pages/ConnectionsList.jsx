import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  margin: '10px 0',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
});

const ConnectionsList = () => {
  const { id } = useParams();
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connectedAlumni, setConnectedAlumni] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      const token = localStorage.getItem('alumniToken');
      try {
        const res = await fetch(`http://localhost:5000/api/connection/requests?userId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch connection requests');
        }
        const data = await res.json();
        setConnectionRequests(data.requests || data); 
      } catch (error) {
        console.error('Error fetching connection requests:', error);
      }
    };

    const fetchConnectedAlumni = async () => {
      const token = localStorage.getItem('alumniToken');
      try {
        const res = await fetch(`http://localhost:5000/api/connection/connected?userId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch connected alumni');
        }
        const data = await res.json();
        setConnectedAlumni(data.connected || data); 
      } catch (error) {
        console.error('Error fetching connected alumni:', error);
      }
    };

    fetchConnectionRequests();
    fetchConnectedAlumni();
  }, [id]);

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem('alumniToken');
      const res = await fetch(`http://localhost:5000/api/connection/${requestId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update request status');
      }

      const updatedRequest = await res.json();
      setConnectionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    } catch (error) {
      console.error('Error updating connection request status:', error);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 p-4" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Connection Requests
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {connectionRequests.length > 0 ? (
              connectionRequests.map((request) => (
                <StyledCard key={request._id}>
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                      {request.requester.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {request.message || 'No message provided'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateRequestStatus(request._id, 'Accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleUpdateRequestStatus(request._id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </CardActions>
                </StyledCard>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No connection requests available.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Connected Alumni
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {connectedAlumni.length > 0 ? (
              connectedAlumni.map((alumni) => (
                <StyledCard key={alumni._id}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold">
                          {alumni.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {alumni.profession || 'Profession not available'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No connected alumni available.
              </Typography>
            )}
          </Grid>
        </Grid>
        <IconButton
          color="primary"
          onClick={handleProfileMenuClick}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: '3rem',
            height: '3rem',
          }}
        >
          <Avatar src={'profile-picture-url.jpg'} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileMenuClose}
          PaperProps={{ style: { width: 140 } }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => console.log('Logout Clicked')}>Logout</MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
};

export default ConnectionsList;





