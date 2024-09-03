import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonationForm from '../components/DonationForm';
import JobPostingForm from '../components/JobPostingForm';
import EventList from '../components/EventList';

const AlumniProfile = () => {
  const { id } = useParams(); // Get the alumni ID from the URL
  const [alumni, setAlumni] = useState(null); // Initialize alumni state as null

  useEffect(() => {
    // Fetch alumni details from the backend API
    const fetchAlumniDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/alumni/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setAlumni(data); // Update the alumni state with fetched data
      } catch (error) {
        console.error('Error fetching alumni details:', error);
        // Handle the error appropriately
      }
    };

    fetchAlumniDetails();
  }, [id]);

  if (!alumni) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  // Construct the URL for the profile picture
  const profilePictureUrl = alumni.profilePicture 
    ? `http://localhost:5000/uploads/${alumni.profilePicture}` 
    : 'default-image-url.jpg'; // Replace with a default image URL if needed

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-24 px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4">Alumni Profile</h2>
        <div className="space-y-4 mb-8">
          <div><strong className="font-semibold">Name:</strong> {alumni.name}</div>
          <div><strong className="font-semibold">Email:</strong> {alumni.email}</div>
          <div><strong className="font-semibold">Graduation Year:</strong> {alumni.graduationYear}</div>
          <div><strong className="font-semibold">Profession:</strong> {alumni.profession}</div>
          <div><strong className="font-semibold">Average CGPA:</strong> {alumni.averageCgpa}</div>
          <div><strong className="font-semibold">Current Company:</strong> {alumni.currentCompany}</div>
          <div><strong className="font-semibold">Current Location:</strong> {alumni.currentLocation}</div>
          <Link to='/jobs'>Jobs</Link>
          <button><Link to='/directory'>Alumni directory</Link></button>
          <div>
            <strong className="font-semibold">Profile Picture:</strong>
            <img 
              src={profilePictureUrl} 
              alt={`${alumni.name}'s profile`} 
              className="w-36 h-36 rounded-full mt-2" 
            />
          </div>
          <h3 className="text-xl font-semibold mt-6">Success Stories</h3>
          {alumni.successStories && alumni.successStories.length > 0 ? (
            <ul className="list-disc pl-5 space-y-4">
              {alumni.successStories.map((story, index) => (
                <li key={index}>
                  <h4 className="text-lg font-semibold">{story.title}</h4>
                  <p>{story.description}</p>
                  <p><em>Contributed by: {story.contributorName}</em></p>
                  <p><small>{new Date(story.date).toLocaleDateString()}</small></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No success stories available.</p>
          )}
          <DonationForm alumni_name={alumni.name} />
        </div>
        <JobPostingForm alumni_name={alumni.name} />
        <Link to={`/jobs-posted-by/${id}`} className="mt-4 inline-block text-blue-500 hover:underline">View Jobs Posted by You</Link>
        <h3 className="text-xl font-semibold mt-6">Upcoming Events</h3>
        <EventList 
  fromAlumniProfile={true} 
  alumniId={id} 
  alumniName={alumni.name} 
  alumniEmail={alumni.email} 
/>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniProfile;
