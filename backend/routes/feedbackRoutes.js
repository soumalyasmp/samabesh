const express = require('express');
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createFeedback)
router.get('/',getFeedbacks);

module.exports = router;
