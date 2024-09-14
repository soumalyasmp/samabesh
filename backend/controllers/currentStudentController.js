const asyncHandler = require('express-async-handler');
const Student = require('../models/currentStudentModel');
const generateToken = require('../utils/generateToken');

// Register a new student
const registerStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    graduationYear,
    department,
    cgpa,
    skills,
    bio,
    interests
  } = req.body;

  const profilePicture = req.file ? req.file.filename : null; // Handle file upload

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    return res.status(400).json({ message: 'Student already exists' });
  }

  const student = new Student({
    name,
    email,
    password,
    graduationYear,
    profilePicture,
    department,
    cgpa,
    skills,
    bio,
    interests
  });

  try {
    await student.save();
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Authenticate an existing student
const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      profilePicture: student.profilePicture, // Include profile picture in the response
      token: generateToken(student._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Get a student's profile by ID
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Update a student's profile by ID
const updateStudentProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, graduationYear, department, cgpa, skills, bio, interests } = req.body;

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  student.name = name || student.name;
  student.email = email || student.email;
  student.graduationYear = graduationYear || student.graduationYear;
  student.department = department || student.department;
  student.cgpa = cgpa || student.cgpa;
  student.skills = skills || student.skills;
  student.bio = bio || student.bio;
  student.interests = interests || student.interests;

  if (password) {
    student.password = password; // Hash password before saving
  }

  if (req.file) {
    student.profilePicture = req.file.filename; // Handle file upload
  }

  try {
    const updatedStudent = await student.save();
    res.json({ message: 'Profile updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

module.exports = {
  registerStudent,
  authStudent,
  getStudentProfile,
  updateStudentProfile,
  getAllStudents,
};

