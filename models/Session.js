const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Session = new Schema({
    hour: {
        type: String,
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie",
        required: true
    },
    movieTheater: {
        type: Schema.Types.ObjectId,
        ref: "movieTheater",
        required: true
    },
    audio: {
        type: String,
        required: true
    }
})

mongoose.model("session", Session)