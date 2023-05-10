const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Movie = new Schema({
    name: {
        type: String,
        required: true
    },
    classification: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    wallpaper: {
        type: String,
        required: true
    }
})

mongoose.model("movie", Movie)