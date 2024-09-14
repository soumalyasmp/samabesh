import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import AdminNavbar from '../components/AdminNavbar';
import DonationProjectListing from '../components/DonationProjectListing'; // Import the DonationProjectListing component
import './AdminAlumniDonation.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAlumniDonation = () => {
  const [donationsData, setDonationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationsData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const headers = new Headers({
          'Authorization': `Bearer ${token}`,
        });

        const response = await fetch('http://localhost:5000/api/admin/donations', { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch donations data');
        }

        const data = await response.json();
        setDonationsData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching donations data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationsData();
  }, []);

  // Process data for chart
  const processDonationData = (data) => {
    const labels = data.map(donation => donation.alumni_name);
    const amounts = data.map(donation => donation.amount);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Donation Amounts',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const donationChartData = processDonationData(donationsData);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Donations by Alumni',
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

  return (
    <div className="admin-alumni-donation min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="chart-container bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Alumni Donations</h1>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">Error: {error}</div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Donation Amounts by Alumni</h2>
                <Bar data={donationChartData} options={chartOptions} />
              </div>
              <DonationProjectListing/> {/* Include the DonationProjectListing component */}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAlumniDonation;