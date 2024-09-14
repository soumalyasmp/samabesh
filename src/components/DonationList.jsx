import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaArrowRight } from 'react-icons/fa'; // Using Rupee Sign from react-icons

const DonationList = ({ alumni_name, alumniId }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donation-projects/');
        if (!response.ok) {
          throw new Error('Failed to fetch donation projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleDonate = (projectId) => {
    // Pass alumni_name via state when navigating to DonationForm
    navigate(`/donate/${projectId}`, { state: { alumni_name, alumniId, projectId } });
  };

  // Limit the number of projects to 6 for two rows of 3 cards each
  const displayedProjects = projects.slice(0, 6); // Change the number as needed

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Support a Cause</h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="max-w-8xl mx-auto grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-1 gap-8">
        {displayedProjects.map(project => (
          <div
            key={project._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative border border-gray-200"
          >
            <img
              src={`http://localhost:5000/uploads/${project.image.split('/').pop()}`}
              alt={project.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3 h-20 overflow-hidden">{project.description}</p>
              <div className="flex items-center mb-4 text-gray-700">
                <FaRupeeSign className="text-green-600 mr-2" />
                <span className="text-lg font-medium">
                  {project.collectedAmount} / {project.targetAmount}
                </span>
              </div>
              <button
                onClick={() => handleDonate(project._id)}
                className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
              >
                <FaArrowRight className="mr-2" />
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;





     









