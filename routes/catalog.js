const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")

router.get('/', (req, res) =>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{    
        res.render("catalog/index", {movies: movies})
    })
})

module.exports = router