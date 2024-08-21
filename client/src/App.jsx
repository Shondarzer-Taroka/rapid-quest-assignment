import { useEffect, useState } from 'react'
import './App.css'
import useCommon from './hooks/useCommon'
// import SalesChart from './pages/SalesChart/SalesChart'
// import SalesGrowthChart from './pages/SalesGrowthChart/SalesGrowthChart'
// import NewCustomersChart from './pages/NewCustomersChart/NewCustomersChart'
// import RepeatCustomersChart from './pages/RepeatCustomersChart/RepeatCustomersChart'
// import MapView from './pages/MapView/MapView'
import axios from 'axios'
// import CustomerLifetimeValueChart from './pages/CustomerLifetimeValueChart'

function App() {
  const [count, setCount] = useState([])
  let axiosCommon = useCommon()
  useEffect(() => {
    axios.get('http://localhost:7700/api/sales-growth')
      .then(res => {
        setCount(res.data)
      })
      .catch(err => {
        console.log(err);

      })
  }, [axiosCommon])

  console.log(count);

  return (

    <>

      HI , This is App page

      {/* <SalesChart />
      <h1>Sales Growth Over Time</h1>
      <SalesGrowthChart></SalesGrowthChart>
      <h1>New Customers Chart</h1>
      <NewCustomersChart />

      <h1>Repeat Customers Chart </h1>
      <RepeatCustomersChart></RepeatCustomersChart>
        
        <h1>customer</h1>
      <CustomerLifetimeValueChart></CustomerLifetimeValueChart>
      <h1>Ditribution</h1>
      <MapView></MapView> */}
    </>
  )
}

export default App
