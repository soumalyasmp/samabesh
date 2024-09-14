// backend/models/donationProjectListingModel.js
const mongoose = require('mongoose');

const donationProjectListingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  collectedAmount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Store the image URL or file path
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DonationProjectListing = mongoose.model('DonationProjectListing', donationProjectListingSchema);

module.exports = DonationProjectListing;