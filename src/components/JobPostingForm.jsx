import React, { useState } from 'react';

const JobPostingForm = ({ alumni_name }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    alumniId: alumni_name || '', // Set default value from props
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Use formData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Job posted successfully:', result);
      // Handle successful posting (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Job Title:
          <input
            type="text"
            name="title" // Set name attribute to match formData key
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Company:
          <input
            type="text"
            name="company" // Set name attribute to match formData key
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description" // Set name attribute to match formData key
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location" // Set name attribute to match formData key
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;