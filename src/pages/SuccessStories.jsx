import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch success stories from the backend API
    const fetchStories = async () => {
      const res = await fetch('http://localhost:5000/api/alumni/success');
      const data = await res.json();
      
      // Assuming the response is an array of alumni with their successStories
      const allStories = data.reduce((acc, alumni) => {
        // Map each success story to include the alumni's name
        const storiesWithAlumniName = alumni.successStories.map(story => ({
          ...story,
          alumniName: alumni.name // Add the alumni's name to each story
        }));
        return [...acc, ...storiesWithAlumniName];
      }, []);

      setStories(allStories);
    };

    fetchStories();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Alumni Success Stories</h2>
      <ul>
        {stories.map((story, index) => (
          <li key={story._id || index}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <p><strong>{story.alumniName}</strong></p>
            <p>{new Date(story.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default SuccessStories;