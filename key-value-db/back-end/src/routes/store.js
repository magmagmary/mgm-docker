const express = require('express');

const storeRouter = express.Router();

storeRouter.post('/', (req, res) => {
  res.status(200).send('was able to receive POST request' + req.body);
});

storeRouter.get('/:key', (req, res) => {
  res.status(200).send('received GET request , key: ' + req.params.key);
});

storeRouter.put('/:key', (req, res) => {
  res.status(200).send('was able to receive PUT request, key: ' + req.params.key + ' value: ' + req.body);
});

storeRouter.delete('/:key', (req, res) => {
  res.status(200).send('was able to receive DELETE request, key: ' + req.params.key);
});

module.exports = { storeRouter };