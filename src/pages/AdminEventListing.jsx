import React, { useState, useEffect } from 'react';
import './AdminEventListing.css'; // Import the CSS file
import AdminNavbar from '../components/AdminNavbar';

function AdminEventListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [alumniId, setAlumniId] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken'); // Fetch the token from local storage

      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          alumniId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const result = await response.json();
      setMessage('Event created successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setAlumniId('');
      setEvents([...events, result]); // Add the new event to the events list
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-event-listing">
      <AdminNavbar />
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alumniId">Alumni ID (optional)</label>
          <input
            type="text"
            id="alumniId"
            value={alumniId}
            onChange={(e) => setAlumniId(e.target.value)}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminEventListing;