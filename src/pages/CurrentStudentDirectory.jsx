import React, { useState, useEffect } from 'react';

const CurrentStudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        console.log('Response:', response); // Log the response object
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Data:', data); // Log the data received
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err); // Log the error
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Current Student Directory</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <p>Name: {student.name}</p>
            <p>Email: {student.email}</p>
            <p>Student ID: {student.studentId}</p>
            <p>Graduation Year: {student.graduationYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentStudentDirectory;