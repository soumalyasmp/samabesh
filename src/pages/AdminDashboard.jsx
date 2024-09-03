import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [alumniData, setAlumniData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const headers = new Headers({
          'Authorization': `Bearer ${token}`,
        });

        const fetchOptions = {
          method: 'GET',
          headers,
        };

        const requests = [
          fetch('http://localhost:5000/api/admin/alumni', fetchOptions),
          fetch('http://localhost:5000/api/admin/students', fetchOptions),
          fetch('http://localhost:5000/api/admin/donations', fetchOptions),
          fetch('http://localhost:5000/api/admin/events', fetchOptions),
          fetch('http://localhost:5000/api/jobs', fetchOptions) // Fetch jobs data
        ];

        const [alumniResponse, studentResponse, donationResponse, eventResponse, jobResponse] = await Promise.all(requests);

        if (!alumniResponse.ok) throw new Error('Failed to fetch alumni data');
        if (!studentResponse.ok) throw new Error('Failed to fetch student data');
        if (!donationResponse.ok) throw new Error('Failed to fetch donation data');
        if (!eventResponse.ok) throw new Error('Failed to fetch event data');
        if (!jobResponse.ok) throw new Error('Failed to fetch job data');

        const [alumniData, studentData, donationData, eventData, jobData] = await Promise.all([
          alumniResponse.json(),
          studentResponse.json(),
          donationResponse.json(),
          eventResponse.json(),
          jobResponse.json(),
        ]);

        setAlumniData(alumniData);
        setStudentData(studentData);
        setDonationData(donationData);
        setEventData(eventData);
        setJobData(jobData);

      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to process data for chart
  const processDataForChart = (data, key) => {
    const groupedData = data.reduce((acc, item) => {
      const value = item[key];
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] += 1; // Count the number of records per key
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: 'Count',
          data: Object.values(groupedData),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const donationAmounts = donationData.map(d => d.amount);
  const donationLabels = donationData.map(d => new Date(d.updatedAt).toLocaleDateString());

  const donationChartData = {
    labels: donationLabels,
    datasets: [
      {
        label: 'Donations',
        data: donationAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const donationChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Donation Overview',
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`,
        },
      },
    },
  };

  const alumniByYearData = processDataForChart(alumniData, 'graduationYear');
  const studentsByYearData = processDataForChart(studentData, 'graduationYear');
  const jobsByProfessionData = processDataForChart(jobData, 'profession');

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <AdminNavbar />
      <main>
        <h1>Admin Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <div className="summary-boxes">
              <div className="summary-box">
                <h2>Total Alumni</h2>
                <p>{alumniData.length}</p>
              </div>
              <div className="summary-box">
                <h2>Total Students</h2>
                <p>{studentData.length}</p>
              </div>
              <div className="summary-box">
                <h2>Total Events</h2>
                <p>{eventData.length}</p>
              </div>
              <div className="summary-box">
                <h2>Total Donations</h2>
                <p>${donationData.reduce((total, donation) => total + donation.amount, 0)}</p>
              </div>
              <div className="summary-box">
                <h2>Total Job Openings</h2>
                <p>{jobData.length}</p> {/* New box for job openings */}
              </div>
            </div>
            <div className="chart-container">
              <h2>Alumni by Graduation Year</h2>
              <Bar data={alumniByYearData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <h2>Students by Graduation Year</h2>
              <Bar data={studentsByYearData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <h2>Donation Overview</h2>
              <Bar data={donationChartData} options={donationChartOptions} />
            </div>
            <div className="chart-container">
              <h2>Jobs by Profession</h2>
              <Bar data={jobsByProfessionData} options={chartOptions} />
            </div>
            <div>
              <h2>Events</h2>
              <ul>
                {eventData.map(event => (
                  <li key={event._id}>
                    <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()} at {event.location}
                    <p>{event.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
