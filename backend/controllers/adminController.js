const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const Alumni = require('../models/alumniModel');
const Student = require('../models/currentStudentModel');
const Donation = require('../models/donationModel');
const Event = require('../models/eventModel');
const generateToken = require('../utils/generateToken');

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  // Directly compare plaintext password
  if (admin.password !== password) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(admin._id);
  res.json({ token, message: 'Login successful' });
});

// Admin signup
const signupAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  // Create a new admin
  const newAdmin = await Admin.create({
    name,
    email,
    password, // Ensure this is a plaintext password, no hashing is done here
  });

  if (newAdmin) {
    const token = generateToken(newAdmin._id);
    res.status(201).json({ token, message: 'Signup successful' });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// Data fetching functions
const getAlumniData = asyncHandler(async (req, res) => {
  const alumni = await Alumni.find({});
  res.json(alumni);
});

const getStudentData = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

const getDonationData = asyncHandler(async (req, res) => {
  const donations = await Donation.find({});
  res.json(donations);
});

const getEventData = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

module.exports = {
  getAlumniData,
  getStudentData,
  getDonationData,
  getEventData,
  loginAdmin,
  signupAdmin,
};