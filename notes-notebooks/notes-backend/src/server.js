const express = require('express');
const app = express();
const PORT = process.env.PORT || 4444;

app.get('/health', (req, res) => {
  res.status(200).send('OK Notes Backend');
});

app.listen(PORT, () => {
  console.log(`Notes Backend Server is running on port ${PORT}`);
});