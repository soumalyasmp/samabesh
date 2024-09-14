import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import AdminNavbar from '../components/AdminNavbar';
import './AdminStudent.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStudent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const headers = new Headers({
          'Authorization': `Bearer ${token}`,
        });

        const response = await fetch('http://localhost:5000/api/admin/students', { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }

        const data = await response.json();
        setStudentsData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching students data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
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
          label: 'Number of Students',
          data: Object.values(groupedData),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const graduationYearData = processGraduationYearData(studentsData);

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
    <div className="admin-student min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="chart-container bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Student Directory</h1>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">Error: {error}</div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Students by Graduation Year</h2>
              <Bar data={graduationYearData} options={chartOptions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminStudent;