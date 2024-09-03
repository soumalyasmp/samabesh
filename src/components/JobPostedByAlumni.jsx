import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    navigate(`/jobs/${jobId}/applicants`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-24 px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4">Jobs Posted by You</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-4">
            {jobs.map((job) => (
              <li key={job._id}>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Posted Date:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                <button
                  onClick={() => handleViewApplicants(job._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Applicants
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobsPostedByAlumni;
