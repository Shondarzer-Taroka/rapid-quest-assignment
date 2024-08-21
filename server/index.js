let express = require('express')
let cors = require('cors')
const port = process.env.PORT || 7700
require('dotenv').config()
let app = express()
app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const cokieOption = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production" ? true : false
};

async function run() {
  try {

    let productsCollection = client.db('RQ_Analytics').collection('shopifyProducts')
    let ordersCollection = client.db('RQ_Analytics').collection('shopifyOrders')
    let customersCollection = client.db('RQ_Analytics').collection('shopifyCustomers')
    app.get('/products', async (req, res) => {
      let cursor = productsCollection.find()
      let result = await cursor.toArray();
      res.send(result)
    })
    app.get('/orders', async (req, res) => {
      let cursor = ordersCollection.find()
      let result = await cursor.toArray();
      res.send(result)
    })



    app.get('/api/sales/all-intervals', async (req, res) => {
      try {
        // const ordersCollection = db.collection('shopifyOrders');

        const sales = await ordersCollection.aggregate([
          {
            // Convert created_at field to a Date object
            $addFields: {
              created_at_date: { $dateFromString: { dateString: "$created_at" } }
            }
          },
          {
            // Perform multiple groupings for different intervals
            $facet: {
              daily: [
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" } },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                  }
                },
                { $sort: { _id: 1 } }
              ],
              monthly: [
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                  }
                },
                { $sort: { _id: 1 } }
              ],
              quarterly: [
                {
                  $group: {
                    _id: {
                      $concat: [
                        { $toString: { $year: "$created_at_date" } },
                        "-Q",
                        { $toString: { $ceil: { $divide: [{ $month: "$created_at_date" }, 3] } } }
                      ]
                    },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                  }
                },
                { $sort: { _id: 1 } }
              ],
              yearly: [
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y", date: "$created_at_date" } },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                  }
                },
                { $sort: { _id: 1 } }
              ]
            }
          }
        ]).toArray();

        res.json(sales[0]);  // Return the first element in the result array
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sales data' });
      }
    });




   // // growth 

    app.get('/api/sales-growth', async (req, res) => {
    //   try {
    //     // const ordersCollection = db.collection('shopifyOrders');

        const salesGrowthData = await ordersCollection.aggregate([
          {
            $addFields: {
              created_at_date: { $dateFromString: { dateString: "$created_at" } }
            }
          },
    //       {
    //         $facet: {
    //           daily: [
    //             {
    //               $group: {
    //                 _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" } },
    //                 totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
    //               }
    //             },
    //             { $sort: { _id: 1 } },
    //             {
    //               $setWindowFields: {
    //                 sortBy: { _id: 1 },
    //                 output: {
    //                   previousSales: {
    //                     $shift: {
    //                       output: "$totalSales",
    //                       by: -1
    //                     }
    //                   }
    //                 }
    //               }
    //             },
    //             {
    //               $project: {
    //                 _id: 1,
    //                 totalSales: 1,
    //                 growthRate: {
    //                   $cond: {
    //                     if: { $eq: ["$previousSales", 0] },
    //                     then: null,
    //                     else: {
    //                       $multiply: [
    //                         { $divide: [{ $subtract: ["$totalSales", "$previousSales"] }, "$previousSales"] },
    //                         100
    //                       ]
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           ],
    //           monthly: [
    //             {
    //               $group: {
    //                 _id: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } },
    //                 totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
    //               }
    //             },
    //             { $sort: { _id: 1 } },
    //             {
    //               $setWindowFields: {
    //                 sortBy: { _id: 1 },
    //                 output: {
    //                   previousSales: {
    //                     $shift: {
    //                       output: "$totalSales",
    //                       by: -1
    //                     }
    //                   }
    //                 }
    //               }
    //             },
    //             {
    //               $project: {
    //                 _id: 1,
    //                 totalSales: 1,
    //                 growthRate: {
    //                   $cond: {
    //                     if: { $eq: ["$previousSales", 0] },
    //                     then: null,
    //                     else: {
    //                       $multiply: [
    //                         { $divide: [{ $subtract: ["$totalSales", "$previousSales"] }, "$previousSales"] },
    //                         100
    //                       ]
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           ],
    //           yearly: [
    //             {
    //               $group: {
    //                 _id: { $dateToString: { format: "%Y", date: "$created_at_date" } },
    //                 totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
    //               }
    //             },
    //             { $sort: { _id: 1 } },
    //             {
    //               $setWindowFields: {
    //                 sortBy: { _id: 1 },
    //                 output: {
    //                   previousSales: {
    //                     $shift: {
    //                       output: "$totalSales",
    //                       by: -1
    //                     }
    //                   }
    //                 }
    //               }
    //             },
    //             {
    //               $project: {
    //                 _id: 1,
    //                 totalSales: 1,
    //                 growthRate: {
    //                   $cond: {
    //                     if: { $eq: ["$previousSales", 0] },
    //                     then: null,
    //                     else: {
    //                       $multiply: [
    //                         { $divide: [{ $subtract: ["$totalSales", "$previousSales"] }, "$previousSales"] },
    //                         100
    //                       ]
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           ]
    //         }
    //       }
        ]).toArray();

    //     res.json(salesGrowthData[0]);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to fetch sales growth data' });
    //   }
    });



    // app.get('/api/new-customers', async (req, res) => {
    //   try {
    //     // Daily Aggregation
    //     const dailyCustomers = await customersCollection.aggregate([
    //       {
    //         $group: {
    //           _id: { $dateToString: { format: '%Y-%m-%d', date: { $dateFromString: { dateString: '$created_at' } } } },
    //           newCustomers: { $sum: 1 }
    //         }
    //       },
    //       { $sort: { _id: 1 } } // Sort by date ascending
    //     ]).toArray();

    //     // Monthly Aggregation
    //     const monthlyCustomers = await customersCollection.aggregate([
    //       {
    //         $group: {
    //           _id: { $dateToString: { format: '%Y-%m', date: { $dateFromString: { dateString: '$created_at' } } } },
    //           newCustomers: { $sum: 1 }
    //         }
    //       },
    //       { $sort: { _id: 1 } } // Sort by date ascending
    //     ]).toArray();

    //     // Yearly Aggregation
    //     const yearlyCustomers = await customersCollection.aggregate([
    //       {
    //         $group: {
    //           _id: { $dateToString: { format: '%Y', date: { $dateFromString: { dateString: '$created_at' } } } },
    //           newCustomers: { $sum: 1 }
    //         }
    //       },
    //       { $sort: { _id: 1 } } // Sort by date ascending
    //     ]).toArray();

    //     res.json({ daily: dailyCustomers, monthly: monthlyCustomers, yearly: yearlyCustomers });
    //   } catch (error) {
    //     console.error('Error during aggregation:', error); // Log error details
    //     res.status(500).json({ error: 'Failed to fetch new customers data', details: error.message });
    //   }
    // });


    // // Number of Repeat Customers:

    // app.get('/api/repeat-customers', async (req, res) => {
    //   try {
    //     // Daily Aggregation
    //     const dailyRepeatCustomers = await ordersCollection.aggregate([
    //       {
    //         $addFields: {
    //           created_at_date: {
    //             $dateFromString: { dateString: "$created_at" }
    //           }
    //         }
    //       },
    //       {
    //         $group: {
    //           _id: { customer_id: "$customer_id", day: { $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" } } },
    //           purchaseCount: { $sum: 1 }
    //         }
    //       },
    //       {
    //         $match: { purchaseCount: { $gt: 1 } }
    //       },
    //       { $sort: { "_id.day": 1 } }
    //     ]).toArray();
    
    //     // Monthly Aggregation
    //     const monthlyRepeatCustomers = await ordersCollection.aggregate([
    //       {
    //         $addFields: {
    //           created_at_date: {
    //             $dateFromString: { dateString: "$created_at" }
    //           }
    //         }
    //       },
    //       {
    //         $group: {
    //           _id: { customer_id: "$customer_id", month: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } } },
    //           purchaseCount: { $sum: 1 }
    //         }
    //       },
    //       {
    //         $match: { purchaseCount: { $gt: 1 } }
    //       },
    //       { $sort: { "_id.month": 1 } }
    //     ]).toArray();
    
    //     // Quarterly Aggregation
    //     const quarterlyRepeatCustomers = await ordersCollection.aggregate([
    //       {
    //         $addFields: {
    //           created_at_date: {
    //             $dateFromString: { dateString: "$created_at" }
    //           }
    //         }
    //       },
    //       {
    //         $group: {
    //           _id: {
    //             customer_id: "$customer_id",
    //             quarter: {
    //               $concat: [
    //                 { $toString: { $year: "$created_at_date" } }, // Get the year part
    //                 "-Q",
    //                 {
    //                   $toString: {
    //                     $ceil: { $divide: [{ $month: "$created_at_date" }, 3] } // Get the quarter by dividing the month
    //                   }
    //                 }
    //               ]
    //             }
    //           },
    //           purchaseCount: { $sum: 1 }
    //         }
    //       },
    //       {
    //         $match: { purchaseCount: { $gt: 1 } }
    //       },
    //       { $sort: { "_id.quarter": 1 } }
    //     ]).toArray();
    
    //     // Yearly Aggregation
    //     const yearlyRepeatCustomers = await ordersCollection.aggregate([
    //       {
    //         $addFields: {
    //           created_at_date: {
    //             $dateFromString: { dateString: "$created_at" }
    //           }
    //         }
    //       },
    //       {
    //         $group: {
    //           _id: { customer_id: "$customer_id", year: { $dateToString: { format: "%Y", date: "$created_at_date" } } },
    //           purchaseCount: { $sum: 1 }
    //         }
    //       },
    //       {
    //         $match: { purchaseCount: { $gt: 1 } }
    //       },
    //       { $sort: { "_id.year": 1 } }
    //     ]).toArray();
    
    //     // Send response with all intervals
    //     res.json({
    //       daily: dailyRepeatCustomers,
    //       monthly: monthlyRepeatCustomers,
    //       quarterly: quarterlyRepeatCustomers,
    //       yearly: yearlyRepeatCustomers
    //     });
    //   } catch (error) {
    //     console.error("Error fetching repeat customers data:", error);
    //     res.status(500).json({ error: 'Failed to fetch repeat customers data' });
    //   }
    // });
    
    
    
    // // 

    // app.get('/api/customer-distribution', async (req, res) => {

    //   const distribution = await customersCollection.aggregate([
    //     { $group: { _id: "$default_address.city", customerCount: { $sum: 1 } } },
    //     { $sort: { customerCount: -1 } } // Sort by the number of customers in descending order
    //   ]).toArray();

    //   res.json(distribution); // Send the result as JSON
    // })




    // //  Customer Lifetime Value by Cohorts:



    // app.get('/api/customer-lifetime-value', async (req, res) => {
    //   try {
    //     // Step 1: Group by customer and find the earliest purchase date for each customer
    //     const lifetimeValueByCohort = await ordersCollection.aggregate([
    //       {
    //         $group: {
    //           _id: "$customer_id",
    //           firstPurchase: { $min: "$created_at" }, // Get the earliest order date for each customer
    //           totalSpent: { $sum: "$total_price_set.shop_money.amount" } // Sum of all orders for this customer
    //         }
    //       },
    //       {
    //         // Step 2: Extract the first purchase month (YYYY-MM) for each customer
    //         $project: {
    //           _id: 1,
    //           firstPurchaseMonth: { $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$firstPurchase" } } } },
    //           totalSpent: 1
    //         }
    //       },
    //       {
    //         // Step 3: Group by first purchase month to calculate cohort CLV and customer count
    //         $group: {
    //           _id: "$firstPurchaseMonth", // Group by cohort (first purchase month)
    //           lifetimeValue: { $sum: "$totalSpent" }, // Sum of total spent by all customers in this cohort
    //           customerCount: { $sum: 1 } // Count the number of customers in this cohort
    //         }
    //       },
    //       { $sort: { _id: 1 } } // Sort by cohort (month) in ascending order
    //     ]).toArray();
    
    //     // Send the response
    //     res.json(lifetimeValueByCohort);
    //   } catch (error) {
    //     console.error('Error fetching customer lifetime value:', error.message);
    //     res.status(500).json({ error: 'Server error' });
    //   }
    // });
    




// end
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING')
})

app.listen(port, (req, res) => {
  console.log(`server in PORT:${port}`);
})