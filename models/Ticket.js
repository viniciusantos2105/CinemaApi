const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Ticket = new Schema({
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true
    },
    movieTheater: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

mongoose.model("ticket", Ticket)