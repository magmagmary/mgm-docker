const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

app.get('/health', (req, res) => {
  res.status(200).send('OK Notebooks Backend');
});

app.listen(PORT, () => {
  console.log(`Notebooks Backend Server is running on port ${PORT}`);
});