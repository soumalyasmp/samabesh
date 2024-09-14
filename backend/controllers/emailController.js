const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (req, res) => {
  const { senderEmail, recipientEmail, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your service's email (for authentication)
      pass: process.env.EMAIL_PASS, // Your service's email password or app-specific password
    },
  });

  const mailOptions = {
    from: senderEmail, // Set the sender's email dynamically
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Email could not be sent' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ success: true, message: 'Email sent successfully' });
    }
  });
});

module.exports = { sendEmail };