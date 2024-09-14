import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const JobsPostedByAlumni = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/posted-by/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setJobs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [id]);
  const handleViewApplicants = (jobId) => {
    const alumniToken = localStorage.getItem('alumniToken');
    navigate(`/jobs/${jobId}/applicants`, { state: { token: alumniToken } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-24 px-6 py-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Jobs Posted by You</h2>
        {jobs.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-1 flex items-center">
                  <FaBuilding className="mr-2" /> <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-700 mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-700 mb-3">{job.description}</p>
                <p className="text-gray-600 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2" /> <strong>Posted on:</strong>{' '}
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleViewApplicants(job._id)}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
                >
                  View Applicants
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobsPostedByAlumni;

