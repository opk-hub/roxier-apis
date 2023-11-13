
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { initializeDatabase } = require('./database/db');


const transactionRoutes = require('./routes/transactionRoutes');

initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });

const app =express()
// By using "dotenv," to improve the manageability, security, and flexibility of your Node.js application's configuration. It's a best practice in the Node.js ecosystem


// "body-parser" is a Node.js middleware used to parse request bodies, such as JSON and URL-encoded data, in web applications.
app.use(bodyParser.json())

app.use(cors({orgin:'*'}))

app.use('/api', transactionRoutes); // Make sure to prefix the route with '/api' or any desired prefix



const PORT= process.env.PORT || 5000


// console.log(process.env) 


app.listen(PORT,()=>{
    console.log(`server started and running at http://localhost:${PORT}`)
})