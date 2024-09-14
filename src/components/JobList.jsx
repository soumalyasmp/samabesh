import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Ensure the modal root element is set for accessibility
Modal.setAppElement('#root');

const JobList = ({ fromProfile, style }) => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    contactNo: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setFormData({
      studentName: '',
      email: '',
      contactNo: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const applicationDate = new Date().toISOString().substring(0, 10);
      const jobRegistration = {
        jobId: selectedJob._id,
        studentName: formData.studentName,
        email: formData.email,
        contactNo: formData.contactNo,
        dateApplied: applicationDate,
      };

      const token = localStorage.getItem('token');

      if (!token) {
        alert('You need to be logged in to apply for a job.');
        return;
      }

      const res = await fetch('http://localhost:5000/api/job-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobRegistration),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to apply for the job');
      }

      alert('Successfully applied for the job');
      closeModal(); // Close the modal after successful application
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Application failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Job Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 relative">
              <img 
                src="https://freelogopng.com/images/all_img/1657952641google-logo-png-image.png" 
                alt="Company logo" 
                className="w-16 h-16 rounded-full absolute top-4 right-4 border-2 border-white"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Title: {job.title}</h3>
              <p className="text-sm text-gray-700 font-semibold mb-3">Company: {job.company}</p>
              <p className="text-gray-600 mb-3 h-20 overflow-hidden">{job.description}</p>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {job.location}
              </p>
              {fromProfile && (
                <button
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => openModal(job)}
                  disabled={!isAuthenticated || !fromProfile}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for job application */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Job Application"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '400px', margin: 'auto', borderRadius: '10px', padding: '20px', border: 'none' },
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Apply for Job: {selectedJob?.title}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number:
            </label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Submit Application
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JobList;







