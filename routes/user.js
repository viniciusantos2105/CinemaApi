const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")
require("../models/MovieTheater")
const MovieTheater = mongoose.model("movieTheater")
require("../models/Session")
const Session = mongoose.model("session")

router.get("/buy/ticket/:id", (req, res)=>{
    Session.findById({_id: req.params.id}).lean().then((session)=>{
        const str = session.movie
        Movie.findById({_id: str.toString()}).lean().then((movie)=>{
            const ticket = ({
                price: req.body.price,
                type: req.body.type,
                movie: req.body.movie,
                movieTheater: req.body.movieTheater,
                hour: req.body.hour,
                quantity: req.body.quantity
            })
            if(req.body.type == "INTEIRA"){

                ticket.price = 35
                res.render("user/buyTicket", {session: session, movie: movie, ticket: ticket})
            }else{
                ticket.price = 17.50
                res.render("user/buyTicket", {session: session, movie: movie, ticket: ticket})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router