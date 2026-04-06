const express = require('express');
const notebookRouter = express.Router();

const { Notebook } = require('../models/notebooks.model');

notebookRouter.get('/', async (req, res) => {
    try {
        const notebooks = await Notebook.find();
        res.status(200).json(notebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notebookRouter.get('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
   
    try {
        const notebook = await Notebook.findOne({ name });
        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        res.status(200).json(notebook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notebookRouter.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const notebook = await Notebook.create(req.body);
        res.status(201).json(notebook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notebookRouter.put('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }
   
    try {
        const notebook = await Notebook.findOneAndUpdate({ name }, req.body, { new: true });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        res.status(200).json(notebook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notebookRouter.delete('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }
   
    try {
        const notebook = await Notebook.findOneAndDelete({ name });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        res.status(200).json({ message: 'Notebook deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {notebookRouter};