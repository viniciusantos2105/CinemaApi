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
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    audio: {
        type: String,
        required: true
    }
})

mongoose.model("movieTheater", MovieTheater)