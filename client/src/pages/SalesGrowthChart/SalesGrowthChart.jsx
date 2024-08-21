// src/components/SalesGrowthChart.js
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useCommon from '../../hooks/useCommon';

const SalesGrowthChart = () => {
    const axiosCommon=useCommon()
  const [growthData, setGrowthData] = useState({
    daily: [],
    monthly: [],
    yearly: [],
    quarterly:[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sales growth data from the API
    const fetchGrowthData = async () => {
      try {
        const response = await axiosCommon.get('/sales-growth');
        setGrowthData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };

    fetchGrowthData();
  }, [axiosCommon]);

  // Prepare chart data for Line chart
  const prepareChartData = (data, label) => {
    return {
      labels: data.map(item => item._id), // x-axis labels (dates)
      datasets: [
        {
          label: `${label} Sales Growth Rate (%)`,
          data: data.map(item => item.growthRate || 0), // y-axis data (growth rate)
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
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
          text: 'Growth Rate (%)'
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

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>Sales Growth Rate Over Time</h2>

          <h3>Daily Growth Rate</h3>
          <Line
            data={prepareChartData(growthData.daily, 'Daily')}
            options={chartOptions}
          />

          <h3>Monthly Growth Rate</h3>
          <Line
            data={prepareChartData(growthData.monthly, 'Monthly')}
            options={chartOptions}
          />

          <h3>Yearly Growth Rate</h3>
          <Line
            data={prepareChartData(growthData.yearly, 'Yearly')}
            options={chartOptions}
          />
          <h3>Quarterly Growth Rate</h3>
          <Line
            data={prepareChartData(growthData.yearly, 'Quarterly')}
            options={chartOptions}
          />
        </div>
      )}
    </>
  );
};

export default SalesGrowthChart;
