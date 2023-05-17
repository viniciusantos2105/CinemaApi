const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MovieTheater = new Schema({
    number: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
})

mongoose.model("movieTheater", MovieTheater)