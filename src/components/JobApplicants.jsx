import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (!jobId) {
      console.error('jobId is undefined');
      return;
    }

    const fetchApplicants = async () => {
      try {
        // Fetch alumni token from local storage
        const token = localStorage.getItem('alumniToken');

        // Check if token is available
        if (!token) {
          console.error('No alumni token found');
          return;
        }

        const res = await fetch(`http://localhost:5000/api/job-registrations/applied-students/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleUpdateStatus = async (applicantId, status) => {
    try {
      // Fetch alumni token from local storage
      const token = localStorage.getItem('alumniToken');

      if (!token) {
        console.error('No alumni token found');
        return;
      }

      const res = await fetch(`http://localhost:5000/api/job-registrations/${applicantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      const updatedApplicant = await res.json();

      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === updatedApplicant._id ? updatedApplicant : applicant
        )
      );
    } catch (error) {
      console.error('Error updating applicant status:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-24 px-6 py-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Job Applicants</h2>
        {applicants.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No applicants yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicants.map((applicant) => (
              <div
                key={applicant._id}
                className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{applicant.studentName}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      applicant.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : applicant.status === 'Rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {applicant.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> {applicant.email}</p>
                <p className="text-gray-700 mb-2"><strong>Contact No:</strong> {applicant.contactNo}</p>
                <div className="flex mt-4">
                  <button
                    onClick={() => handleUpdateStatus(applicant._id, 'Approved')}
                    className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(applicant._id, 'Rejected')}
                    className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg ml-3 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobApplicants;

