import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CurrentStudentProfile.css';
import JobList from '../components/JobList';
import EventList from '../components/EventList';
import { Link } from 'react-router-dom';

const CurrentStudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/profile/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <h2>Student Profile</h2>
      <div className="profile-container">
        <div><strong>Name:</strong> {student.name}</div>
        <div><strong>Student ID:</strong> {student.studentId}</div>
        <div><strong>Email:</strong> {student.email}</div>
        <div><strong>Graduation Year:</strong> {student.graduationYear}</div>
      </div>
      <Link to="/student/directory">Student directory</Link>
      <JobList fromProfile={true} />
      <EventList fromStudentProfile={true} studentName={student.name} studentEmail={student.email} />
      <Footer />
    </div>
  );
};

export default CurrentStudentProfile;