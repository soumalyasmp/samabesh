const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById, // Import the new function
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require('../controllers/eventController');
const { protectAdmin } = require('../middleware/adminMiddleware'); // Import the updated middleware
const router = express.Router();

// Route to create a new event
router.post('/', protectAdmin, createEvent);

// Route to get all events
router.get('/', getEvents);

// Route to get an event by ID
router.get('/:id', getEventById); // Add this route

// Routes to update and delete an event by ID
router.route('/:id')
  .put(protectAdmin, updateEvent)
  .delete(protectAdmin, deleteEvent);

// Route to register for an event by ID
router.post('/:id/register', registerForEvent);

module.exports = router;