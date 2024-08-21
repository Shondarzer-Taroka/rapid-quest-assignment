// import  { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import useCommon from '../hooks/useCommon';


// const CustomerLifetimeValueChart = () => {
//   const [lifetimeValueData, setLifetimeValueData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosCommon=useCommon()
//   useEffect(() => {
//     const fetchLifetimeValueData = async () => {
//       try {
//         const response = await axiosCommon.get('/customer-lifetime-value');
//         setLifetimeValueData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching customer lifetime value data:", error);
//       }
//     };

//     fetchLifetimeValueData();
//   }, [axiosCommon]);

//   // Prepare data for the chart
//   const prepareChartData = () => {
//     if (!lifetimeValueData) return {};
//     const labels = lifetimeValueData.map(item => item._id); // Cohort months (YYYY-MM)
//     const values = lifetimeValueData.map(item => item.lifetimeValue); // Lifetime values for each cohort
//     const customerCounts = lifetimeValueData.map(item => item.customerCount); // Number of customers in each cohort

//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Customer Lifetime Value (CLV)',
//           data: values,
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           yAxisID: 'y'
//         },
//         {
//           label: 'Customer Count',
//           data: customerCounts,
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           yAxisID: 'y1'
//         }
//       ]
//     };
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         position: 'left',
//         title: {
//           display: true,
//           text: 'Customer Lifetime Value (CLV)'
//         }
//       },
//       y1: {
//         beginAtZero: true,
//         position: 'right',
//         title: {
//           display: true,
//           text: 'Customer Count'
//         },
//         grid: {
//           drawOnChartArea: false
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Cohort (First Purchase Month)'
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Customer Lifetime Value by Cohorts</h2>
//       {loading ? <p>Loading...</p> : (
//         <Bar data={prepareChartData()} options={chartOptions} />
//       )}
//     </div>
//   );
// };

// export default CustomerLifetimeValueChart;
