const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {healthRouter} = require('./routes/health');
const {notebookRouter} = require('./routes/notebooks');

const app = express();
const PORT = process.env.PORT || 3333;
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

app.use(bodyParser.json());
app.use('/api/notebooks/health', healthRouter);
app.use('/api/notebooks', notebookRouter);

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

