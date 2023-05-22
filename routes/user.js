const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")
require("../models/MovieTheater")
const MovieTheater = mongoose.model("movieTheater")
require("../models/Session")
const Session = mongoose.model("session")
require("../models/Ticket")
const Ticket = mongoose.model("ticket")


router.get("/buy/ticket/:id", (req, res)=>{
    Session.findById({_id: req.params.id}).lean().then((session)=>{
        const str = session.movie
        Movie.findById({_id: str.toString()}).lean().then((movie)=>{
            const str = session.movieTheater
            MovieTheater.findById({_id: str.toString()}).lean().then((theater)=>{
                res.render("user/buyTicket", {session: session, movie: movie, theater: theater})
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
})

router.post("/buy/ticket", (req, res)=>{

    const newTicket = ({
        type: req.body.type,
        movie: req.body.movie,
        movieTheater: req.body.theater,
        hour: req.body.hour,
        quantity: req.body.quantity,
        price: 0
    })
    if(newTicket.type == 'INTEIRA' && newTicket.quantity > 1){
        newTicket.price = 32.00 * newTicket.quantity
        new Ticket(newTicket).save().then(()=>{
            console.log("Ticket comprado com sucesso")
            res.render("user/buySuccess")
        })
    }
    else if(newTicket.type == 'INTEIRA' && newTicket.quantity == 1){
        newTicket.price = 32.00 
        new Ticket(newTicket).save().then(()=>{
            console.log("Ticket comprado com sucesso")
            res.render("user/buySuccess")
        })
    }
    else if(newTicket.type == 'MEIA' && newTicket.quantity > 1){
        newTicket.price = 16.00 * newTicket.quantity
        new Ticket(newTicket).save().then(()=>{
            console.log("Ticket comprado com sucesso")
            res.render("user/buySuccess")
        })
    }
    else if(newTicket.type == 'MEIA' && newTicket.quantity == 1){
        newTicket.price = 16.00
        new Ticket(newTicket).save().then(()=>{
            console.log("Ticket comprado com sucesso")
            res.render("user/buySuccess")
        })
    }
})

module.exports = router