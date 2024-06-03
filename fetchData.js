const CaseModel = require('./model/caseModel');
const { google } = require('googleapis');
require('dotenv').config();
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY; 

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '19bnWl2wMlnDJET_y8Beu7pSvHp6Pm8SF3m1gUpfjkTg';
const range = 'Sheet1'

 async function fetchData() {
  try {
    const data = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });

    const rows = data.data.values;
    if (rows.length) {
      // Remove the header row
      const records = rows.slice(1).map(row => ({
        bankName: row[0],
        propertyName: row[1],
        city: row[2],
        borrowerName: row[3],
        createdAt: new Date(row[4]),
      }));

      console.log(records);
      await CaseModel.insertMany(records);
      console.log('Data saved to MongoDB');
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports=fetchData