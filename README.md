# Rapid Quest Data Visualization API
**Live Site URL:** [Rapid Quest](https://client-rosy-six.vercel.app/)
## Overview

This is an API built using Node.js and MongoDB to analyze and visualize e-commerce data. The application aggregates various metrics such as sales growth, repeat customers, new customers, and customer lifetime value, grouped by daily, monthly, quarterly, and yearly intervals. It provides endpoints to access the data and visualize it in charts and graphs.

## Features

- **Sales Growth Tracking**: Aggregate sales growth rates by day, month, quarter, and year.
- **Repeat Customers**: Identify and track repeat customers across different timeframes.
- **Customer Lifetime Value (CLTV)**: Group customers by cohorts (based on the month of their first purchase) and calculate lifetime value.
- **New Customers**: Track and count new customers across different time intervals.
- **Geographical Distribution**: Visualize the geographical distribution of customers using their default addresses.

## Endpoints

### Sales Growth

- **GET /api/sales-growth**
  - Fetch sales growth rates by daily, monthly, quarterly, and yearly intervals.

### Repeat Customers

- **GET /api/repeat-customers**
  - Fetch repeat customers aggregated by daily, monthly, quarterly, and yearly intervals.

### Customer Lifetime Value by Cohort

- **GET /api/customer-lifetime-value**
  - Group customers by the month of their first purchase and visualize their lifetime value for each cohort.

### New Customers

- **GET /api/new-customers**
  - Fetch new customer data aggregated by daily, monthly, quarterly, and yearly intervals.

### Geographical Distribution of Customers

- **GET /api/customer-distribution**
  - Fetch and map the distribution of customers across different cities using their default address.

## Requirements

- Node.js
- MongoDB
- Express.js
- Leaflet.js for geographical mapping

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shondarzer-Taroka/rapid-quest-assignment.git
   cd rapid-quest-assignment ```


2. Install Dependencies:

``` bash
npm install 
```

3. Running the Application

``` bash
npm run dev ```


