const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    text: {
        type: String,
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
    {
        timestamps: true
    }
);

const Note = new mongoose.model("Note", noteSchema)
module.exports = Note;