const express = require('express');
const router = express.Router();
const {
  registerStudent,
  authStudent,
  getStudentProfile,
  updateStudentProfile,
  getAllStudents
} = require('../controllers/currentStudentController');

// Registration and Authentication Routes
router.post('/register', registerStudent); // Register route
router.post('/login', authStudent); // Login route

// Profile Routes
router.get('/', getAllStudents); // Get all students
router.get('/profile/:id', getStudentProfile); // Get student profile by ID
router.put('/profile/:id', updateStudentProfile); // Update student profile by ID

module.exports = router;