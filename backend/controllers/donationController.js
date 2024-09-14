// backend/controllers/donationController.js
const asyncHandler = require('express-async-handler');
const Donation = require('../models/donationModel');

const createDonation = asyncHandler(async (req, res) => {
  if (!req.alumni || !req.alumni._id) {
    res.status(401);
    throw new Error('Unauthorized: Alumni not authenticated');
  }

  const { amount, message, alumni_name, projectId } = req.body;
  const alumniId = req.alumni._id; // Get alumniId from authenticated user

  if (!amount || !alumni_name || !projectId) {
    res.status(400);
    throw new Error('Bad Request: Missing required fields');
  }

  // Create a new donation
  const donation = new Donation({
    alumni_name,
    alumniId,
    projectId, // Include projectId
    amount,
    message,
  });

  const createdDonation = await donation.save();
  res.status(201).json(createdDonation);
});

module.exports = { createDonation };
