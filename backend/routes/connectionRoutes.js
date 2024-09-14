const express = require('express');
const {
  sendConnectionRequest,
  updateConnectionRequestStatus,
  getConnectionRequests,
  getConnectedAlumni  // Import the new function
} = require('../controllers/connectionController');
const router = express.Router();

// Route to send a connection request
router.post('/send', sendConnectionRequest);

// Route to update connection request status
router.put('/:id', updateConnectionRequestStatus);

// Route to get connection requests
router.get('/requests', getConnectionRequests);

// Route to get connected alumni
router.get('/connected', getConnectedAlumni);  // New route

module.exports = router;

