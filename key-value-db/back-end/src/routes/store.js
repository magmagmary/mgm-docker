const express = require('express');
const { KeyValue } = require('../models/keyvalue');

const storeRouter = express.Router();

storeRouter.post('/', async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).json({message: 'both key and value are required'});
    }

    try {
        const existingKeyValue = await KeyValue.findOne({ key });

        if (existingKeyValue) {
            return res.status(400).json({message: 'key already exists'});
        }
    
        const newKeyValue = new KeyValue({ key, value });
    
        await newKeyValue.save();
    
        res.status(201).json({ message: 'key-value pair created successfully' });
    } catch (error) {
        res.status(500).json({message: 'error creating key-value pair', error: error.message});
    }
});

storeRouter.get('/:key', async(req, res) => {
  const { key } = req.params;

  if (!key) {
    return res.status(400).json({message: 'key is required'});
  }

  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) {
      return res.status(404).json({message: 'key-value pair not found'});
    }

    res.status(200).json({ keyValue });
  } catch (error) {
    res.status(500).json({message: 'error getting key-value pair', error: error.message});
  }
});

storeRouter.put('/:key',async (req, res) => {
  const { key  } = req.params;
  const { value } = req.body;

  if (!key || !value) {
    return res.status(400).json({message: 'both key and value are required'});
  }

  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) {
      return res.status(404).json({message: 'key-value pair not found'});
    }

    keyValue.value = value;
    await keyValue.save();

    res.status(200).json({ message: 'key-value pair updated successfully' });
  } catch (error) {
    res.status(500).json({message: 'error updating key-value pair', error: error.message});
  }
});

storeRouter.delete('/:key',async (req, res) => {
  const { key } = req.params;

  if (!key) {
    return res.status(400).json({message: 'key is required'});
  }

  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) {
      return res.status(404).json({message: 'key-value pair not found'});
    }

    await keyValue.deleteOne();

    res.status(200).json({ message: 'key-value pair deleted successfully' });

  } catch (error) {
    res.status(500).json({message: 'error deleting key-value pair', error: error.message});
  }
});

module.exports = { storeRouter };