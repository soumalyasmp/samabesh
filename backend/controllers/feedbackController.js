const asyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel');

// Controller to handle feedback submission
const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create new feedback document
    const feedback = new Feedback({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    // Save feedback to the database
    await feedback.save();

    // Respond with success
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// Controller to get all feedbacks
const getFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.json(feedbacks);
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    res.status(500).json({ message: 'Error retrieving feedbacks', error: error.message });
  }
});

module.exports = {
  createFeedback,
  getFeedbacks,
};