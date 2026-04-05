const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3333;
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK Notebooks Backend');
});

console.log('***** Connecting to MongoDB *****', MONGO_URI);

mongoose.connect(MONGO_URI, {
  connectTimeoutMS:3000
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Notebooks Backend Server is running on port ${PORT}`);
      });
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

