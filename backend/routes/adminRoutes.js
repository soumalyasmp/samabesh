const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/adminMiddleware');
const {
  getAlumniData,
  getStudentData,
  getDonationData,
  getEventData,
  loginAdmin,
  signupAdmin,
} = require('../controllers/adminController');

router.get('/alumni',protectAdmin, getAlumniData);
router.get('/students',protectAdmin, getStudentData);
router.get('/donations',protectAdmin, getDonationData);
router.get('/events',protectAdmin, getEventData);
router.post('/login', loginAdmin);
router.post('/signup', signupAdmin);

module.exports = router;
