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
        const token = localStorage.getItem('token');

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
      const token = localStorage.getItem('token');
      
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-24 px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4">Applicants for Job</h2>
        {applicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-4">
            {applicants.map((applicant) => (
              <li key={applicant._id}>
                <p><strong>Name:</strong> {applicant.studentName}</p>
                <p><strong>Email:</strong> {applicant.email}</p>
                <p><strong>Contact No:</strong> {applicant.contactNo}</p>
                <p><strong>Status:</strong> {applicant.status}</p>
                <button
                  onClick={() => handleUpdateStatus(applicant._id, 'Approved')}
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(applicant._id, 'Rejected')}
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded ml-2"
                >
                  Reject
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

export default JobApplicants;