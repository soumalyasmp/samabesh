const asyncHandler = require('express-async-handler');
const Student = require('../models/currentStudentModel');
const generateToken = require('../utils/generateToken');

const registerStudent = asyncHandler(async (req, res) => {
  const { name, studentId, email, password, graduationYear } = req.body;

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(400);
    throw new Error('Student already exists');
  }

  const student = await Student.create({
    name,
    studentId,
    email,
    password,
    graduationYear,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, email, password, graduationYear } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.graduationYear = graduationYear || student.graduationYear;
    if (password) {
      student.password = password; // Hash password before saving
    }

    await student.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

module.exports = { 
  registerStudent, 
  authStudent, 
  getStudentProfile, 
  updateStudentProfile, 
  getAllStudents 
};