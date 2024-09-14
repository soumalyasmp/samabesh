// backend/controllers/donationProjectListingController.js
const expressAsyncHandler = require('express-async-handler');
const DonationProjectListing = require('../models/donationProjectListingModel');
const path = require('path');
const fs = require('fs');

const createDonationProject = expressAsyncHandler(async (req, res) => {
    try {
      const { title, description, targetAmount } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!title || !description || !targetAmount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const donationProject = new DonationProjectListing({
        title,
        description,
        targetAmount,
        image,
      });

      const createdDonationProject = await donationProject.save();
      return res.status(201).json(createdDonationProject);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

const getDonationProject = expressAsyncHandler(async (req, res) => {
  try {
    const donationProject = await DonationProjectListing.findById(req.params.id);

    if (!donationProject) {
      return res.status(404).json({ message: 'Donation project not found' });
    }

    res.json(donationProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getDonationProjectImage = expressAsyncHandler(async (req, res) => {
  const { imagePath } = req.params;
  const imageFilePath = path.resolve(__dirname, '../uploads/', imagePath);

  if (fs.existsSync(imageFilePath)) {
    res.sendFile(imageFilePath);
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});

const updateCollectedAmount = expressAsyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;
    const donationProject = await DonationProjectListing.findById(req.params.id);

    if (!donationProject) {
      return res.status(404).json({ message: 'Donation project not found' });
    }

    donationProject.collectedAmount += parseFloat(amount);
    const updatedDonationProject = await donationProject.save();

    res.json(updatedDonationProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createDonationProject,
  getDonationProject,
  getDonationProjectImage,
  updateCollectedAmount, // Export the new function
};


