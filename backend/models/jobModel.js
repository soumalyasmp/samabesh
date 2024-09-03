const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  alumni_name: { type: String, required: true },
  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni', // Assuming the collection for alumni is named 'Alumni'
    required: true,
  },
  location: { type: String, required: true },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
