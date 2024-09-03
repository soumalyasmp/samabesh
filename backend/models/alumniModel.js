const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const alumniSchema = mongoose.Schema({
  name: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  profession: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  averageCgpa: { type: Number, min: 0, max: 10 },
  currentCompany: { type: String },
  currentLocation: { type: String },
  profilePicture: { type: String }, // Stores the filename or URL of the profile picture
  successStories: [{ 
    title: { type: String },
    description: { type: String },
    contributorName: { type: String },
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true,
});

// Password hashing before saving the document
alumniSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare input password with the hashed password in the database
alumniSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
