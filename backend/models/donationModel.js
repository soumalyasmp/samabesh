// backend/models/donationModel.js
const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  alumniId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Alumni' },
  alumni_name: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'DonationProjectListing' }, // Add project reference
  amount: { type: Number, required: true },
  message: { type: String },
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
