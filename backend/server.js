const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const alumniRoutes = require('./routes/alumniRoutes');
const donationRoutes = require('./routes/donationRoutes');
const jobRoutes = require('./routes/jobRoutes');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const currentStudentRoutes = require('./routes/currentStudentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRegistrationRoutes = require('./routes/eventRegistrationRoutes');
const jobRegistrationRoutes = require('./routes/jobRegistrationRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/alumni', alumniRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/students', currentStudentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events/registrations', eventRegistrationRoutes);
app.use('/api/job-registrations', jobRegistrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
