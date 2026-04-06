const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {healthRouter} = require('./routes/health');
const {noteRouter} = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3333;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use('/api/notes/health', healthRouter);
app.use('/api/notes', noteRouter);

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
 
