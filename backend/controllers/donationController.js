const asyncHandler = require('express-async-handler');
const Donation = require('../models/donationModel');

const createDonation = asyncHandler(async (req, res) => {
  // Ensure that req.alumni exists and has _id
  if (!req.alumni || !req.alumni._id) {
    res.status(401);
    throw new Error('Unauthorized: Alumni not authenticated');
  }

  const { amount, message, alumni_name } = req.body;
  const alumniId = req.alumni._id; // Get alumniId from authenticated user

  // Validate the presence of required fields
  if (!amount || !alumni_name) {
    res.status(400);
    throw new Error('Bad Request: Missing required fields');
  }

  // Create a new donation
  const donation = new Donation({
    alumni_name,
    alumniId,
    amount,
    message,
  });

  // Save the donation
  const createdDonation = await donation.save();
  res.status(201).json(createdDonation);
});

module.exports = { createDonation };