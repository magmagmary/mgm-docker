const { model, Schema } = require('mongoose');

const notebookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
        default: ''
    }
}, 
{
    timestamps: true
}
);

const Notebook = model('Notebooks', notebookSchema);

module.exports = { Notebook };