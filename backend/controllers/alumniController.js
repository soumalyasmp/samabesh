const asyncHandler = require('express-async-handler');
const Alumni = require('../models/alumniModel');
const generateToken = require('../utils/generateToken');

// Register a new alumni (excluding bio, skills, and college)
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
    res.status(404).throw(new Error('No alumni found'));
  }
});

// Get alumni by query parameters
const getAlumni = asyncHandler(async (req, res) => {
  const { name, profession, graduationYear } = req.query;

  const query = {};

  if (name) query.name = { $regex: name, $options: 'i' };
  if (profession) query.profession = { $regex: profession, $options: 'i' };
  if (graduationYear) query.graduationYear = graduationYear;

  const alumni = await Alumni.find(query, 'name email graduationYear profession averageCgpa currentCompany currentLocation profilePicture');

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
    res.status(404).throw(new Error('Alumni not found'));
  }
});

// Update an alumni profile by ID (bio and skills are now updatable)
const updateAlumniProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentCompany, currentLocation, averageCgpa, bio, skills } = req.body;

  // Find the alumni by ID
  const alumni = await Alumni.findById(id);

  if (!alumni) {
    res.status(404).throw(new Error('Alumni not found'));
  }

  // Update the alumni profile details
  alumni.currentCompany = currentCompany || alumni.currentCompany;
  alumni.currentLocation = currentLocation || alumni.currentLocation;
  alumni.averageCgpa = averageCgpa || alumni.averageCgpa;
  alumni.bio = bio || alumni.bio; // Allow bio to be updated
  alumni.skills = skills ? skills.split(',').map(skill => skill.trim()) : alumni.skills; // Allow skills to be updated

  // Handle profile picture update
  if (req.file) {
    alumni.profilePicture = req.file.filename;
  }

  try {
    // Save the updated alumni profile
    const updatedAlumni = await alumni.save();
    res.json(updatedAlumni);
  } catch (error) {
    res.status(400).throw(new Error('Error updating profile'));
  }
});


module.exports = {
  registerAlumni,
  authAlumni,
  getSuccessStories,
  getAlumni,
  getAlumniById,
  updateAlumniProfile,
};

