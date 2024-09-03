const mongoose=require('mongoose');
const eventRegistrationSchema = new mongoose.Schema({
    user: { 
      type: String,  // Changed from ObjectId to String
      required: true 
    },
    event: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event', 
      required: true 
    },
    registrationDate: { 
      type: Date, 
      default: Date.now 
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    contactNo: { 
      type: String, 
      required: true 
    },
  });
  
  const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
  
  module.exports = EventRegistration;