const express = require('express');
const { registerAlumni, authAlumni, getSuccessStories, getAlumni, getAlumniById } = require('../controllers/alumniController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage engine for profile picture upload
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

// Route for registering a new alumni with profile picture upload
router.post('/register', upload.single('profilePicture'), registerAlumni);

// Route for alumni login
router.post('/login', authAlumni);

// Route for getting success stories
router.get('/success', getSuccessStories);

// Route for fetching all alumni details
router.get('/', getAlumni);
router.get('/:id', getAlumniById);

module.exports = router;