
import './App.css'
import SalesChart from './pages/SalesChart/SalesChart'
import SalesGrowthChart from './pages/SalesGrowthChart/SalesGrowthChart'
import NewCustomersChart from './pages/NewCustomersChart/NewCustomersChart'
import RepeatCustomersChart from './pages/RepeatCustomersChart/RepeatCustomersChart'
import MapView from './pages/MapView/MapView'
import CustomerLifetimeValueChart from './pages/CustomerLifetimeValueChart'

function App() {
  

  return (

    <>

        <h1>Rapid Quest</h1>

      <SalesChart />
      <h1>Sales Growth Over Time Chart</h1>
      <SalesGrowthChart></SalesGrowthChart>
      <h1>New Customers Chart</h1>
      <NewCustomersChart />

      <h1>Repeat Customers Chart </h1>
      <RepeatCustomersChart></RepeatCustomersChart>
        
        <h1>Customer Lifetime Value by Cohorts Chart</h1>
      <CustomerLifetimeValueChart></CustomerLifetimeValueChart>
      <h1>Ditribution</h1>
      <MapView></MapView>
    </>
  )
}

export default App
