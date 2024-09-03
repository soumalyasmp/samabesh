import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './EventList.css'; // Import the CSS file

// Ensure the modal root element is set for accessibility
Modal.setAppElement('#root');

const EventList = ({ fromAlumniProfile, alumniName, alumniEmail, fromStudentProfile, studentName, studentEmail }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState({
    user: fromAlumniProfile ? 'alumni' : 'student', // Default to 'alumni' or 'student'
    eventId: '',
    name: alumniName || studentName || '',
    email: alumniEmail || studentEmail || '',
    contactNo: '',
  });

  useEffect(() => {
    // Fetch events from the backend API
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setRegistrationDetails(prevDetails => ({
      ...prevDetails,
      eventId: event._id,
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setRegistrationDetails({
      user: fromAlumniProfile ? 'alumni' : 'student', // Reset to 'alumni' or 'student'
      eventId: '',
      name: alumniName || studentName || '',
      email: alumniEmail || studentEmail || '',
      contactNo: '',
    });
  };

  const handleRegistration = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the token
      if (!token) {
        alert('You need to be logged in to register for an event.');
        return;
      }

      if (!selectedEvent) {
        alert('No event selected.');
        return;
      }

      const registrationRes = await fetch('http://localhost:5000/api/events/registrations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: registrationDetails.user,
          event: registrationDetails.eventId,
          name: registrationDetails.name,
          email: registrationDetails.email,
          contactNo: registrationDetails.contactNo,
        }),
      });

      if (!registrationRes.ok) {
        const errorData = await registrationRes.json();
        throw new Error(errorData.message || 'Failed to register for the event');
      }

      alert('Successfully registered for the event');
      closeModal(); // Close the modal after successful registration
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="heading">Upcoming Events</h2>
      <ul className="event-list">
        {events.map(event => (
          <li key={event._id} className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description"><strong>Description:</strong> {event.description}</p>
            <p className="event-date"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            {(fromAlumniProfile || fromStudentProfile) && (
              <button className="register-button" onClick={() => openModal(event)}>Register</button>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for registration */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Registration"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '400px', margin: 'auto', borderRadius: '10px', padding: '20px', border: 'none' },
        }}
      >
        <h2 className="modal-heading">Register for Event</h2>
        <p className="modal-event-details"><strong>Event:</strong> {selectedEvent?.title}</p>
        <p className="modal-event-details"><strong>Description:</strong> {selectedEvent?.description}</p>
        <p className="modal-event-details"><strong>Date:</strong> {new Date(selectedEvent?.date).toLocaleDateString()}</p>

        {/* Registration Form */}
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <label className="form-label">
            User Type:
            <select
              name="user"
              value={registrationDetails.user}
              onChange={handleChange}
              required
              className="form-select"
              disabled // Disable this field as user type is set by the profile context
            >
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
            </select>
          </label>
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={registrationDetails.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={registrationDetails.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Contact Number:
            <input
              type="text"
              name="contactNo"
              value={registrationDetails.contactNo}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={handleRegistration} className="confirm-button">Confirm Registration</button>
            <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventList;
