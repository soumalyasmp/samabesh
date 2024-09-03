const express = require('express');
const EventRegistration = require('../models/eventRegistrationModel'); // Update the path as needed

const createRegistration = async (req, res) => {
    try {
      const { user, event, name, email, contactNo } = req.body;
  
      if (!user || !event || !name || !email || !contactNo) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required.',
        });
      }
  
      const registration = new EventRegistration({
        user,
        event,
        name,
        email,
        contactNo,
      });
  
      await registration.save();
  
      res.status(201).json({
        success: true,
        data: registration,
      });
    } catch (error) {
      console.error('Error in createRegistration:', error); // Log the error
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find().populate('user').populate('event');
    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get registrations by event
const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find registrations for the specified event
    const registrations = await EventRegistration.find({ event: eventId }).populate('user');

    if (!registrations.length) {
      return res.status(404).json({
        success: false,
        message: 'No registrations found for this event.',
      });
    }

    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
};