const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventRegistrationsCount
} = require('../controllers/eventController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

// Route to create a new event with an image upload
router.post('/', protectAdmin, upload.single('image'), createEvent);

// Route to get all events
router.get('/', getEvents);

// Route to get, update, or delete an event by ID
router.route('/:id')
  .get(getEventById)
  .put(protectAdmin, updateEvent)
  .delete(protectAdmin, deleteEvent);

// Route to register for an event by ID
router.post('/:id/register', registerForEvent);
router.get('/registrations/count', getEventRegistrationsCount);

module.exports = router;

