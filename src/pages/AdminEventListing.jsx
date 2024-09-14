import React, { useState, useEffect } from 'react';
import './AdminEventListing.css'; 
import AdminNavbar from '../components/AdminNavbar';

function AdminEventListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // State to handle image
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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
  // Example code to upload an event with an image
const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('date', date);
  formData.append('location', location);
  if (image) {
    formData.append('image', image);
  }

  try {
    const token=localStorage.getItem('token');  
    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token if needed
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    const result = await response.json();
    console.log('Event created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="admin-event-listing">
      <AdminNavbar />
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label htmlFor="image">Event Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
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

