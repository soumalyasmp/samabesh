const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getAllRegistrations,
  getRegistrationsByEvent
} = require('../controllers/eventRegistrationController'); // Update the path as needed

// Route to create a new event registration
router.post('/', createRegistration);

// Route to get all event registrations
router.get('/', getAllRegistrations);

// Route to get registrations for a specific event
router.get('/registrations/event/:eventId', getRegistrationsByEvent);

module.exports = router;