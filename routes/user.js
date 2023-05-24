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
require("../models/Client")
const Client = mongoose.model("client")
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.get("/login", (req, res)=>{
    res.render("user/login")
})

router.post("/login", (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        req.flash("success_msg", "Deslogado com sucesso")
        res.redirect('/')
      })
})

router.get("/register", (req, res)=>{
    res.render("user/registerUser")
})

router.post("/register/client", (req, res)=>{
    
    Client.findOne({email: req.body.email}).then((client)=>{
        if(client){
            req.flash("error_msg", "Já existe uma conta com este email")
            res.redirect("/user/register")
    }else{
        const newClient = new Client({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
    
        bcrypt.genSalt(10, (erro, salt) =>{
            bcrypt.hash(newClient.password, salt, (erro, hash) =>{
                if(erro){
                    req.flash("error_msg", "Houve um erro ao salvar usuario")
                    res.redirect("/")
                }

                newClient.password = hash

                newClient.save().then(() =>{
                    req.flash("success_msg", "Usuario criado com sucesso")
                    res.redirect("/")
                }).catch((err) =>{
                    req.flash("error_msg", "Houve um erro ao criar usuario")
                    res.redirect("/user/register")
                })
            })
        })

      }
    })
})

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
            res.redirect("/")
        })
    }
})

module.exports = router