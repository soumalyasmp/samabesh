const express = require('express');
const {
  registerForJob,
  getJobRegistrations,
  getAppliedStudentsByJob,
  updateJobRegistrationStatus,
} = require('../controllers/jobRegistrationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, registerForJob);
router.get('/', protect, getJobRegistrations);
router.get('/applied-students/:jobId', protect, getAppliedStudentsByJob);
router.put('/:id', protect, updateJobRegistrationStatus);

module.exports = router;
