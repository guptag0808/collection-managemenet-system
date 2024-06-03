const express = require('express');
const { connection } = require('./config/db');
const fetchData= require('./fetchData')
const cron = require('node-cron');
const app = express();

// Schedule the cron job to run at 10 AM and 5 PM every day
cron.schedule('04,44 13 * * *', async () => {
  console.log('Cron job running...');
  await fetchData();
});



app.listen(3000, async () => {
  try {
    await connection;
    console.log('Connected to DB');
  } catch (err) {
    console.log(err.message);
  }
  console.log('Server is running on port 3000');
});
