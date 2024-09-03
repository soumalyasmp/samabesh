const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');
const Alumni = require('../models/alumniModel'); // Assuming you have an alumni model

// Create a new event
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  const event = new Event({
    title,
    description,
    date,
    location,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// Get all events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// Get an event by ID
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// Update an event
const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// Delete an event
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// Register for an event
const registerForEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const alumni = await Alumni.findById(req.user.id);

    if (!event || !alumni) {
      res.status(404);
      throw new Error('Event or Alumni not found');
    }

    if (!event.registeredUsers.includes(alumni._id)) {
      event.registeredUsers.push(alumni._id);
      await event.save();
    } else {
      res.status(400);
      throw new Error('You have already registered for this event');
    }

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
  createEvent,
  getEvents,
  getEventById, // Export the new function
  updateEvent,
  deleteEvent,
  registerForEvent,
};