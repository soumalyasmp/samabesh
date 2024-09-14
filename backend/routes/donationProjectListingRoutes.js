// backend/routes/donationProjectListingRoutes.js
const express = require('express');
const router = express.Router();
const { createDonationProject, getDonationProject, getDonationProjectImage, updateCollectedAmount } = require('../controllers/donationProjectListingController');
const multer = require('multer');
const expressAsyncHandler = require('express-async-handler');
const DonationProjectListing = require('../models/donationProjectListingModel');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createDonationProject);
router.get('/:id', getDonationProject);
router.get('/image/:imagePath', getDonationProjectImage);
router.put('/update/:id', expressAsyncHandler(updateCollectedAmount)); // New PUT route
router.get('/', expressAsyncHandler(async (req, res) => {
    const donationProjects = await DonationProjectListing.find({});
    res.json(donationProjects);
  }));

module.exports = router;

