import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AdminNavbar from '../components/AdminNavbar';
import './AdminJobList.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await fetch('http://localhost:5000/api/jobs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch jobs');

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const processData = (jobs) => {
    const companyCounts = jobs.reduce((acc, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {});

    const alumniCounts = jobs.reduce((acc, job) => {
      acc[job.alumni_name] = (acc[job.alumni_name] || 0) + 1;
      return acc;
    }, {});

    const locationCounts = jobs.reduce((acc, job) => {
      acc[job.location] = (acc[job.location] || 0) + 1;
      return acc;
    }, {});

    return {
      companyData: {
        labels: Object.keys(companyCounts),
        datasets: [{
          label: 'Jobs per Company',
          data: Object.values(companyCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      alumniData: {
        labels: Object.keys(alumniCounts),
        datasets: [{
          label: 'Jobs Posted by Alumni',
          data: Object.values(alumniCounts),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        }],
      },
      locationData: {
        labels: Object.keys(locationCounts),
        datasets: [{
          label: 'Jobs per Location',
          data: Object.values(locationCounts),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        }],
      },
    };
  };

  const { companyData, alumniData, locationData } = processData(jobs);

  return (
    <div>
      <AdminNavbar />
      <main>
        <h1>Admin Job List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <div className="chart-container">
              <h2>Number of Jobs by Company</h2>
              <Bar data={companyData} options={{ responsive: true, plugins: { title: { display: true, text: 'Number of Jobs by Company' } } }} />
            </div>
            <div className="chart-container">
              <h2>Number of Jobs Posted by Alumni</h2>
              <Bar data={alumniData} options={{ responsive: true, plugins: { title: { display: true, text: 'Number of Jobs Posted by Alumni' } } }} />
            </div>
            <div className="chart-container">
              <h2>Number of Jobs by Location</h2>
              <Bar data={locationData} options={{ responsive: true, plugins: { title: { display: true, text: 'Number of Jobs by Location' } } }} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminJobList;