const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  registerStudent,
  authStudent,
  getStudentProfile,
  updateStudentProfile,
  getAllStudents
} = require('../controllers/currentStudentController');

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
  }
});

const upload = multer({ storage });

// Registration and Authentication Routes
router.post('/register', upload.single('profilePicture'), registerStudent); // Register route with file upload
router.post('/login', authStudent); // Login route

// Profile Routes
router.get('/', getAllStudents); // Get all students
router.get('/profile/:id', getStudentProfile); // Get student profile by ID
router.put('/profile/:id', updateStudentProfile); // Update student profile by ID

module.exports = router;
