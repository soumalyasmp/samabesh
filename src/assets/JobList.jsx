import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Ensure the modal root element is set for accessibility
Modal.setAppElement('#root');

const JobList = ({ fromProfile, style }) => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
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
    setFormData(prev => ({
      ...prev,
      studentId: '', // Reset studentId if needed
      studentName: '',
      email: '',
      contactNo: '',
    }));
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
        studentId: formData.studentId,
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
    <div className="container max-w-full">
      <h2 className="heading text-2xl md:text-5xl font-bold my-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Job Listings</h2>
      <div className="job-list grid grid-cols-3 gap-x-12 gap-y-9 r-gap overflow-hidden p-5 my-24"
        style={style}
      >
        {jobs.map(job => (
          <div key={job._id} className="job-card h-[35vh] rounded-[1.5rem] bg-white shadow-[0_0_20px_0px_#00000026]">
            <div className='bg-[#ecf1ff] h-[80%] m-[5px] rounded-[20px] overflow-hidden relative'>
              <img src='https://freelogopng.com/images/all_img/1657952641google-logo-png-image.png' className='w-[50px] h-[50px] rounded-full absolute top-4 right-4'></img>
              <h3 className="job-title bg-white w-max p-[5px_20px] rounded-[30px] m-[10px] font-bold text-[18px]">Job Title: {job.title}</h3>
              <p className="job-company w-max ml-[15px] text-black font-bold">
                {/* <strong>Company:</strong> */}
                 {job.company}
                 </p>
              <p className="job-description h-[65%] overflow-hidden text-start p-[10px_20px] text-black opacity-80 texy-[14px]">
                <strong className='block opacity-100'>Description:</strong>
                {job.description}
              </p>
            </div>
            <p className="job-location text-black w-max px-[20px]"><strong>Location:</strong> {job.location}</p>
            {fromProfile && <button
              className="apply-button"
              onClick={() => openModal(job)}
              disabled={!isAuthenticated || !fromProfile} // Disable button if not authenticated or not from profile
            >
              Apply
            </button>}
          </div>
        ))}
      </div>

      {/* Modal for application */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Job Application"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '400px', margin: 'auto', borderRadius: '10px', padding: '20px', border: 'none' },
        }}
      >
        <h2 className="modal-heading">Apply for Job: {selectedJob?.title}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <label className="form-label">
            Student ID:
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Name:
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Contact Number:
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={handleSubmit} className="confirm-button">Submit Application</button>
            <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JobList;

