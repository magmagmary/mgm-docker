const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4444;

app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK Notes Backend');
});

const MONGO_URI = process.env.MONGO_URI;

console.log('***** Connecting to MongoDB *****', MONGO_URI);

mongoose.connect(MONGO_URI, {
  authSource: 'notes_db',
  connectTimeoutMS:3000
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Notes Backend Server is running on port ${PORT}`);
      });
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

