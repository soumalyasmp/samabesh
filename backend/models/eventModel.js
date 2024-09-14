const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    registeredAlumni: [{ type: String }],
    image: { type: String, required: true }, // Store the URL/path of the event image
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

