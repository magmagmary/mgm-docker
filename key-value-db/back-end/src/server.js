const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const MONGO_URI = "mongodb://mongodb/key-value-db";

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

console.log("connecting to MongoDB");

mongoose.connect(MONGO_URI, {
  auth:{
    username: 'key-value-user',
    password: 'key-value-password',
  },
  authSource: 'key-value-db',
  connectTimeoutMS:3000
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});