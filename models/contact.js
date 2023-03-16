const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
    },
   
},
    {
        timestamps: true
    }
);

const Contact = new mongoose.model("Note", contactSchema)
module.exports = Note;