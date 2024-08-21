
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import useCommon from '../../hooks/useCommon';

const SalesChart = () => {
    let axiosCommon = useCommon();
    const [salesData, setSalesData] = useState({
        daily: [],
        monthly: [],
        yearly: [],
        quarterly:[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch sales data from the API
        const fetchData = async () => {
            try {
                const response = await axiosCommon.get('/sales/all-intervals');
                setSalesData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, [axiosCommon]);

    // Prepare chart data
    const prepareChartData = (data, label) => {
        return {
            labels: data.map(item => item._id), // x-axis labels (dates)
            datasets: [
                {
                    label: `${label} Sales`,
                    data: data.map(item => item.totalSales), // y-axis data (sales)
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                }
            ]
        };
    };

    // Chart configuration
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Sales'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time'
                },
                type: 'category', // Set the x-axis as a categorical scale
            }
        }
    };

    // console.log(salesData);
    
    return (
        <>
            {loading ? <h1>Loading...</h1> :
                <div>
                    <h1>Sales Over Time</h1>

                    <h3>Daily Sales</h3>
                    <Line data={prepareChartData(salesData.daily, 'Daily')} options={chartOptions} />

                    <h3>Monthly Sales</h3>
                    <Line data={prepareChartData(salesData.monthly, 'Monthly')} options={chartOptions} />

                    <h3>Yearly Sales</h3>
                    <Line data={prepareChartData(salesData.yearly, 'Yearly')} options={chartOptions} />
                    <h3>Quarterly Sales</h3>
                    <Line data={prepareChartData(salesData.quarterly, 'Quarterly')} options={chartOptions} />
                </div>
            }
        </>
    );
};

export default SalesChart;
