const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Client = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    ticket: {
        type: Array,
        default: new Array(),
        required: true
    },
    admin:{
        type: Number,
        default: 0
    },
    password:{
        type: String,
        required: true
    }
})

mongoose.model("client", Client)