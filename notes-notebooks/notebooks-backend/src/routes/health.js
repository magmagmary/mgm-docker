const express = require('express');
const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    res.status(200).send('OK Notebooks Backend Health Check');
});

module.exports = {healthRouter};