const asyncHandler = require('express-async-handler');
const Alumni = require('../models/alumniModel');
const generateToken = require('../utils/generateToken');

// Register a new alumni
const registerAlumni = asyncHandler(async (req, res) => {
  const {
      name,
      graduationYear,
      profession,
      email,
      password,
      averageCgpa,
      currentCompany,
      currentLocation,
      successStories // This will be a stringified JSON
  } = req.body;

  let parsedSuccessStories;
  try {
      parsedSuccessStories = JSON.parse(successStories);
  } catch (error) {
      return res.status(400).json({ message: 'Invalid success stories format' });
  }

  const profilePicture = req.file ? req.file.filename : null;

  const alumni = new Alumni({
      name,
      graduationYear,
      profession,
      email,
      password,
      averageCgpa,
      currentCompany,
      currentLocation,
      successStories: parsedSuccessStories, // Store as an array
      profilePicture,
  });

  try {
      await alumni.save();
      res.status(201).json({ message: 'Alumni registered successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Authenticate an existing alumni
const authAlumni = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const alumni = await Alumni.findOne({ email });

  if (alumni && (await alumni.matchPassword(password))) {
    res.json({
      _id: alumni._id,
      name: alumni.name,
      email: alumni.email,
      profilePicture: alumni.profilePicture, // Include the profile picture in the response
      token: generateToken(alumni._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get all success stories
const getSuccessStories = asyncHandler(async (req, res) => {
  const alumni = await Alumni.find({}, 'name successStories profilePicture'); // Fetch all alumni with their success stories and profile pictures

  if (alumni) {
    res.json(alumni);
  } else {
    res.status(404);
    throw new Error('No alumni found');
  }
});

// Get alumni by query parameters
const getAlumni = asyncHandler(async (req, res) => {
  const { name, profession, graduationYear } = req.query;

  const query = {};

  if (name) query.name = { $regex: name, $options: 'i' };
  if (profession) query.profession = { $regex: profession, $options: 'i' };
  if (graduationYear) query.graduationYear = graduationYear;

  const alumni = await Alumni.find(query, 'name email graduationYear profession averageCgpa currentCompany currentLocation profilePicture'); // Fetch alumni based on query and include profile picture

  if (alumni.length > 0) {
    res.json(alumni);
  } else {
    res.status(404).json({ message: 'No alumni found' });
  }
});

// Get alumni by ID
const getAlumniById = asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.params.id);

  if (alumni) {
    res.json(alumni);
  } else {
    res.status(404);
    throw new Error('Alumni not found');
  }
});

module.exports = { registerAlumni, authAlumni, getSuccessStories, getAlumni, getAlumniById };