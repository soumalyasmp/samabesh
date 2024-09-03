const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  permissions: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'active',
  },
});

module.exports = mongoose.model('Admin', adminSchema);
