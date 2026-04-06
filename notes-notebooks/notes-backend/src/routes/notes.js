const express = require('express');
const noteRouter = express.Router();

const { Note } = require('../models/notes.model');

noteRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

noteRouter.get('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
   
    try {
        const note = await Note.findOne({ name });
        if (!notebook) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

noteRouter.post('/', async (req, res) => {
    const { name , content } = req.body;
    if (!name || !content) {
        return res.status(400).json({ message: 'Name and content are required' });
    }

    try { 
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

noteRouter.put('/:name', async (req, res) => {
    const { name , content } = req.body;
    if (!name || !content) {
        return res.status(400).json({ message: 'name is required' });
    }
    
    try {
        const existingNote = await Note.findOne({ name });
        if (!existingNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        existingNote.content = content;
        await existingNote.save();

        res.status(200).json(existingNote); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

noteRouter.delete('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }
   
    try {
        const note = await Note.findOneAndDelete({ name });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {noteRouter};