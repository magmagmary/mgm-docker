const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4444;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());

app.get('/api/notes/health', (req, res) => {
  res.status(200).send('OK Notes Backend');
});

console.log('***** Connecting to MongoDB *****', MONGO_URI);

mongoose.connect(MONGO_URI, {
  connectTimeoutMS:3000
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Notes Backend Server is running on port ${PORT}`);
      });
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

