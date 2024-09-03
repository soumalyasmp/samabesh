const express = require('express');
const { postJob, getJobs, getJobsPostedByAlumni } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, postJob);
router.get('/', getJobs);
router.get('/posted-by/:alumniName', getJobsPostedByAlumni);

module.exports = router;
