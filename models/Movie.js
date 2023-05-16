const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Movie = new Schema({
    name: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    wallpaper: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("movie", Movie)