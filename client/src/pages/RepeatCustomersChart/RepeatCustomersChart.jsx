



import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import useCommon from '../../hooks/useCommon';

const RepeatCustomersChart = () => {
  const axiosCommon=useCommon()
  const [repeatCustomersData, setRepeatCustomersData] = useState({
    daily: [],
    monthly: [],
    quarterly: [],
    yearly: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepeatCustomersData = async () => {
      try {
        const response = await axiosCommon.get('/repeat-customers');
        setRepeatCustomersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
      }
    };

    fetchRepeatCustomersData();
  }, [axiosCommon]);

  // Prepare chart data function
  const prepareChartData = (data, label) => {
    return {
      labels: data.map(item => item._id.day || item._id.month || item._id.quarter || item._id.year),
      datasets: [
        {
          label: `${label} Repeat Customers`,
          data: data.map(item => item.purchaseCount),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    };
  };

  // Chart options configuration
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Repeat Customers'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Repeat Customers Over Time</h2>

      <h3>Daily Repeat Customers</h3>
      <Line data={prepareChartData(repeatCustomersData.daily, 'Daily')} options={chartOptions} />

      <h3>Monthly Repeat Customers</h3>
      <Line data={prepareChartData(repeatCustomersData.monthly, 'Monthly')} options={chartOptions} />

      <h3>Quarterly Repeat Customers</h3>
      <Line data={prepareChartData(repeatCustomersData.quarterly, 'Quarterly')} options={chartOptions} />

      <h3>Yearly Repeat Customers</h3>
      <Line data={prepareChartData(repeatCustomersData.yearly, 'Yearly')} options={chartOptions} />
    </div>
  );
};

export default RepeatCustomersChart;
