import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './EventList.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

Modal.setAppElement('#root');

const EventList = ({ fromAlumniProfile, alumniName, alumniEmail, fromStudentProfile, studentName, studentEmail }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState({
    user: fromAlumniProfile ? 'alumni' : 'student',
    eventId: '',
    name: alumniName || studentName || '',
    email: alumniEmail || studentEmail || '',
    contactNo: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events/registrations/count');
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

  // Check if the user is already registered for the selected event using localStorage
  const isAlreadyRegistered = (eventId) => {
    const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
    return registeredEvents.some(
      (registration) => registration.eventId === eventId && registration.email === registrationDetails.email
    );
  };

  const openModal = (event) => {
    if (isAlreadyRegistered(event._id)) {
      alert('You have already registered for this event.');
      return;
    }
    setSelectedEvent(event);
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      eventId: event._id,
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setRegistrationDetails({
      user: fromAlumniProfile ? 'alumni' : 'student',
      eventId: '',
      name: alumniName || studentName || '',
      email: alumniEmail || studentEmail || '',
      contactNo: '',
    });
  };

  const handleRegistration = () => {
    // Store registration details in localStorage
    const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
    const newRegistration = {
      user: registrationDetails.user,
      eventId: registrationDetails.eventId,
      name: registrationDetails.name,
      email: registrationDetails.email,
      contactNo: registrationDetails.contactNo,
    };
    // Add the new registration and update localStorage
    localStorage.setItem('registeredEvents', JSON.stringify([...registeredEvents, newRegistration]));
    alert('Successfully registered for the event');
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="heading">Upcoming Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-card">
            <img
              src={`http://localhost:5000/uploads/${event.image}`}
              alt={event.title}
              className="event-image"
            />
            <div className="event-info">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <p className="event-description">
                  <i className="fas fa-info-circle"></i> <strong>Description:</strong> {event.description}
                </p>
                <p className="event-date">
                  <i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="event-registrations">
                  <i className="fas fa-users"></i> <strong>Registrations:</strong> {event.registrationCount}
                </p>
              </div>
              {(fromAlumniProfile || fromStudentProfile) &&
                (isAlreadyRegistered(event._id) ? (
                  <button className="registered-button" disabled>
                    Registered
                  </button>
                ) : (
                  <button className="register-button" onClick={() => openModal(event)}>
                    Register
                  </button>
                ))}
            </div>
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
        <p className="modal-event-details">
          <strong>Event:</strong> {selectedEvent?.title}
        </p>
        <p className="modal-event-details">
          <strong>Description:</strong> {selectedEvent?.description}
        </p>
        <p className="modal-event-details">
          <strong>Date:</strong> {new Date(selectedEvent?.date).toLocaleDateString()}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <label className="form-label">
            User Type:
            <select
              name="user"
              value={registrationDetails.user}
              onChange={handleChange}
              required
              className="form-select"
              disabled
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
            <button type="button" onClick={handleRegistration} className="confirm-button">
              Confirm Registration
            </button>
            <button type="button" onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventList;




