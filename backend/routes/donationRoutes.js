const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/donationController');
const {protect} = require('../middleware/authMiddleware');

router.post('/',protect,createDonation);

module.exports = router;