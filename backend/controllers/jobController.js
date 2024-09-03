const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

// @desc    Post a job
// @route   POST /api/jobs
// @access  Private (only for logged-in alumni)
const postJob = asyncHandler(async (req, res) => {
  if (!req.alumni || !req.alumni._id || !req.alumni.name) {
    res.status(401);
    throw new Error('Unauthorized: Alumni not authenticated');
  }

  const { title, company, description, location } = req.body;
  const alumni_name = req.alumni.name;
  const alumniId = req.alumni._id;

  if (!title || !company || !description || !location) {
    res.status(400);
    throw new Error('Bad Request: Missing required fields');
  }

  const job = new Job({
    title,
    company,
    description,
    location,
    alumni_name,
    alumniId,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
});

// @desc    Get jobs posted by a specific alumni
// @route   GET /api/jobs/posted-by/:alumniId
// @access  Public
const getJobsPostedByAlumni = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ alumniId: req.params.alumniId });
  res.json(jobs);
});

module.exports = { postJob, getJobs, getJobsPostedByAlumni };
