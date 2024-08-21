
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useCommon from '../../hooks/useCommon';

const NewCustomersChart = () => {
    let axiosCommon=useCommon()
  const [customersData, setCustomersData] = useState({
    daily: [],
    monthly: [],
    yearly: [],
    quarterly:[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch new customers data from the API
    const fetchCustomersData = async () => {
      try {
        const response = await axiosCommon.get('/new-customers');
        setCustomersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    fetchCustomersData();
  }, [axiosCommon]);

  // Prepare chart data for Line chart
  const prepareChartData = (data, label) => {
    return {
      labels: data.map(item => item._id), // x-axis labels (dates)
      datasets: [
        {
          label: `${label} New Customers`,
          data: data.map(item => item.newCustomers), // y-axis data (new customers count)
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        }
      ]
    };
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of New Customers'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period'
        }
      }
    }
  };

console.log(customersData);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>New Customers Over Time</h2>

          <h3>Daily New Customers</h3>
          <Line data={prepareChartData(customersData.daily, 'Daily')} options={chartOptions} />

          <h3>Monthly New Customers</h3>
          <Line data={prepareChartData(customersData.monthly, 'Monthly')} options={chartOptions} />

          <h3>Yearly New Customers</h3>
          <Line data={prepareChartData(customersData.yearly, 'Yearly')} options={chartOptions} />
          <h3>Quarterly New Customers</h3>
          <Line data={prepareChartData(customersData.quarterly, 'Quarterly')} options={chartOptions} />
        </div>
      )}
    </>
  );
};

export default NewCustomersChart;
