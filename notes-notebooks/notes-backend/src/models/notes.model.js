const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    notebookName: {
        type: String,
        required: false,
        default: null
    }
}, 
{
    timestamps: true
}
);

const Note = model('Notes', noteSchema);

module.exports = { Note };