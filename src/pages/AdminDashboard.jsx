import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import AdminNavbar from '../components/AdminNavbar';
import './AdminDashboard.css'; // Import the updated CSS file

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
          fetch('http://localhost:5000/api/jobs', fetchOptions)
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

  const processDataForChart = (data, key) => {
    const groupedData = data.reduce((acc, item) => {
      const value = item[key];
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] += 1;
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Alumni</h2>
                <p className="text-4xl font-bold text-gray-800">{alumniData.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Students</h2>
                <p className="text-4xl font-bold text-gray-800">{studentData.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Events</h2>
                <p className="text-4xl font-bold text-gray-800">{eventData.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Donations</h2>
                <p className="text-4xl font-bold text-gray-800">${donationData.reduce((total, donation) => total + donation.amount, 0)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Job Openings</h2>
                <p className="text-4xl font-bold text-gray-800">{jobData.length}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni by Graduation Year</h2>
                <Bar data={alumniByYearData} options={chartOptions} />
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Students by Graduation Year</h2>
                <Bar data={studentsByYearData} options={chartOptions} />
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Donation Overview</h2>
                <Bar data={donationChartData} options={donationChartOptions} />
              </div>
              <div className="flex-1 job-profession-chart bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Jobs by Profession</h2>
                <Bar data={jobsByProfessionData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Events</h2>
              <ul className="list-disc list-inside text-gray-700">
                {eventData.map(event => (
                  <li key={event._id} className="mb-4">
                    <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()} at {event.location}
                    <p className="text-gray-600 text-sm mt-1">{event.description}</p>
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
