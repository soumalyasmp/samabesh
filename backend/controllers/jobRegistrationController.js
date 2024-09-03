const asyncHandler = require('express-async-handler');
const JobRegistration = require('../models/JobRegistrationModel');
const mongoose=require('mongoose');

// @desc    Register for a job
// @route   POST /api/job-registrations
// @access  Private (only for logged-in students)
const registerForJob = asyncHandler(async (req, res) => {
  const { jobId, studentId, studentName, email, contactNo } = req.body;

  if (!jobId || !studentId || !studentName || !email || !contactNo) {
    res.status(400);
    throw new Error('Please provide all required fields: jobId, studentId, studentName, email, and contactNo.');
  }

  const existingRegistration = await JobRegistration.findOne({ email, jobId });
  if (existingRegistration) {
    res.status(400);
    throw new Error('You have already applied for this job.');
  }

  const jobRegistration = new JobRegistration({
    jobId,
    studentId,
    studentName,
    email,
    contactNo,
  });

  const createdJobRegistration = await jobRegistration.save();
  res.status(201).json(createdJobRegistration);
});
// @desc    Get all job registrations
// @route   GET /api/job-registrations
// @access  Private (for admin)
const getJobRegistrations = asyncHandler(async (req, res) => {
  const jobRegistrations = await JobRegistration.find({})
    .populate('jobId', 'title company');
  
  res.json(jobRegistrations);
});

// @desc    Get students applied for a specific job
// @route   GET /api/job-registrations/applied-students/:jobId
// @access  Private (for admin)
// @desc    Get students applied for a specific job
// @route   GET /api/job-registrations/applied-students/:jobId
// @access  Private (for admin)
const getAppliedStudentsByJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400);
    throw new Error('Invalid jobId');
  }

  const registrations = await JobRegistration.find({ jobId })
    .populate('studentId', 'name') // Populate studentId to get student name
    .select('studentId studentName email contactNo status'); // Adjust selected fields as needed

  res.json(registrations);
});





// @desc    Update job registration status
// @route   PUT /api/job-registrations/:id
// @access  Private (for admin)
const updateJobRegistrationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const jobRegistration = await JobRegistration.findById(id);

  if (!jobRegistration) {
    res.status(404);
    throw new Error('Job registration not found');
  }

  jobRegistration.status = status;
  const updatedJobRegistration = await jobRegistration.save();

  res.json(updatedJobRegistration);
});

module.exports = {
  registerForJob,
  getJobRegistrations,
  getAppliedStudentsByJob,
  updateJobRegistrationStatus,
};

