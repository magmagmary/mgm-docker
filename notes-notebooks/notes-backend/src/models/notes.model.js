const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    notebookId: {
        type: Schema.Types.ObjectId,
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