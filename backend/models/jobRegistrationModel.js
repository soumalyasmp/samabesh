const mongoose = require('mongoose');

const jobRegistrationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

const JobRegistration = mongoose.models.JobRegistration || mongoose.model('JobRegistration', jobRegistrationSchema);

module.exports = JobRegistration;


