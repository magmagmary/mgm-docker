const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const MONGO_KEY_VALUE_USERNAME = process.env.MONGO_KEY_VALUE_USERNAME;
const MONGO_KEY_VALUE_PASSWORD = process.env.MONGO_KEY_VALUE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_URI = `mongodb://${MONGO_HOST}/${DATABASE_NAME}`;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

console.log("connecting to MongoDB");

mongoose.connect(MONGO_URI, {
  auth:{
    username: MONGO_KEY_VALUE_USERNAME,
    password: MONGO_KEY_VALUE_PASSWORD,
  },
  authSource: DATABASE_NAME,
  connectTimeoutMS:3000
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});