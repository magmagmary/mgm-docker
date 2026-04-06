const express = require('express');
const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    res.status(200).send('OK Notes Backend Health Check');
});

module.exports = {healthRouter};