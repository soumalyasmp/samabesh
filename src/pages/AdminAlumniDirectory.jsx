import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import AdminNavbar from '../components/AdminNavbar';
import './AdminAlumniDirectory.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAlumniDirectory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumniData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const headers = new Headers({
          'Authorization': `Bearer ${token}`,
        });

        const response = await fetch('http://localhost:5000/api/admin/alumni', { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch alumni data');
        }

        const data = await response.json();
        setAlumniData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching alumni data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, []);

  const processGraduationYearData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const year = item.graduationYear;
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: 'Number of Alumni',
          data: Object.values(groupedData),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const processProfessionData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const profession = item.profession;
      if (!acc[profession]) {
        acc[profession] = 0;
      }
      acc[profession] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: 'Number of Alumni',
          data: Object.values(groupedData),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const processCGPAData = (data) => {
    const ranges = {
      '6-7': 0,
      '7-8': 0,
      '8-9': 0,
      '9-10': 0,
    };

    data.forEach(item => {
      const cgpa = item.cgpa;
      if (cgpa >= 6 && cgpa < 7) ranges['6-7'] += 1;
      else if (cgpa >= 7 && cgpa < 8) ranges['7-8'] += 1;
      else if (cgpa >= 8 && cgpa < 9) ranges['8-9'] += 1;
      else if (cgpa >= 9 && cgpa <= 10) ranges['9-10'] += 1;
    });

    return {
      labels: Object.keys(ranges),
      datasets: [
        {
          label: 'Number of Alumni by CGPA Range',
          data: Object.values(ranges),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const processAlumniCompaniesData = (data) => {
    const companies = data.reduce((acc, item) => {
      const company = item.company;
      if (company) {
        acc[company] = (acc[company] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(companies),
      datasets: [
        {
          label: 'Number of Alumni per Company',
          data: Object.values(companies),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const processCurrentLocationData = (data) => {
    const locations = data.reduce((acc, item) => {
      const location = item.currentLocation;
      if (location) {
        acc[location] = (acc[location] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(locations),
      datasets: [
        {
          label: 'Number of Alumni by Current Location',
          data: Object.values(locations),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const graduationYearData = processGraduationYearData(alumniData);
  const professionData = processProfessionData(alumniData);
  const cgpaData = processCGPAData(alumniData);
  const alumniCompaniesData = processAlumniCompaniesData(alumniData);
  const currentLocationData = processCurrentLocationData(alumniData);

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
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Alumni Directory</h1>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni by Graduation Year</h2>
                <Bar data={graduationYearData} options={chartOptions} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni by Profession</h2>
                <Bar data={professionData} options={chartOptions} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni by CGPA Range</h2>
                <Bar data={cgpaData} options={chartOptions} />
              </div>
            </div>
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Number of Alumni per Company</h2>
                <Bar data={alumniCompaniesData} options={chartOptions} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Number of Alumni by Current Location</h2>
                <Bar data={currentLocationData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAlumniDirectory;