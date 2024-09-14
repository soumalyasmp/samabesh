const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'requesterModel',
    required: true,
  },
  requestee: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'requesteeModel',
    required: true,
  },
  requesterModel: {
    type: String,
    enum: ['Alumni', 'Student'],
    required: true,
  },
  requesteeModel: {
    type: String,
    enum: ['Alumni', 'Student'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  pairKey: {
    type: String,
    required: true,
    unique: true, // Ensure the pairKey is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;

