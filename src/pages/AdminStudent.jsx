import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminStudent.css'; // Import the CSS file
import AdminNavbar from '../components/AdminNavbar';

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

  // Process data for chart
  const processGraduationYearData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const year = item.graduationYear;
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += 1; // Count the number of students per year
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
        text: 'Students by Graduation Year',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="admin-student">
        <AdminNavbar/>
      <h1>Student Directory</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="chart-container">
          <h2>Students by Graduation Year</h2>
          <Bar data={graduationYearData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default AdminStudent;