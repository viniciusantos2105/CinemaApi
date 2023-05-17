const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")
require("../models/MovieTheater")
const MovieTheater = mongoose.model("movieTheater")

router.get('/register', (req, res) =>{
    res.render("admin/addMovie")
})

router.post("/register/movie", (req, res) =>{

    var erros = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.gender || typeof req.body.gender == undefined || req.body.gender == null){
        erros.push({texto: "Gênero inválido"})
    }

    if(!req.body.wallpaper || typeof req.body.wallpaper == undefined || req.body.wallpaper == null){
        erros.push({texto: "Link inválido"})
    }

    if(!req.body.synopsis || typeof req.body.synopsis == undefined || req.body.synopsis == null){
        erros.push({texto: "Sinopse inválida"})
    }

    if(req.body.name.length < 2){
        erros.push({texto: "Nome do filme é muito pequeno"})
    }

    if(req.body.synopsis.length < 2){
        erros.push({texto: "Sinopse é muito curta"})
    }

    if(req.body.wallpaper.length < 10){
        erros.push({texto: "Link do wallpaper filme é inválido"})
    }

    if(erros.length > 0){
        res.render("admin/register", {erros: erros})
    }
    else{
        const newMovie = {
            name: req.body.name,
            classification: req.body.classification,
            synopsis: req.body.synopsis,
            gender: req.body.gender,
            wallpaper: req.body.wallpaper
        }

        new Movie(newMovie).save().then(() =>{
            console.log("Filme salvo com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
            console.log("Erro ao salvar filme")
        })
    }
})

router.get("/register/movieTheater", (req, res) =>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{
        res.render("admin/addMovieTheather", {movies: movies})
    })
})

router.post("/register/movieTheater/new", (req, res)=>{

    var erros = []

    if(!req.body.number || typeof req.body.number == undefined || req.body.number == null){
        erros.push({texto: "Numero inválido"})
    }

    if(!req.body.type || typeof req.body.type == undefined || req.body.type == null){
        erros.push({texto: "Tipo inválido"})
    }

    if(!req.body.seats || typeof req.body.seats == undefined || req.body.seats == null){
        erros.push({texto: "Numero de assentos inválido"})
    }

    if(!req.body.price || typeof req.body.price == undefined || req.body.price == null){
        erros.push({texto: "Preço inválido"})
    }

    if(!req.body.audio || typeof req.body.audio == undefined || req.body.audio == null){
        erros.push({texto: "Audio inválido"})
    }

    if(erros.length > 0){
        res.render("admin/register", {erros: erros})
    }
    else{
        const newMovieTheather = {
            number: req.body.number,
            type: req.body.type,
            seats: req.body.seats,
            movie: req.body.movie,
            price: req.body.price,
            audio: req.body.audio
        }

        new MovieTheater(newMovieTheather).save().then(() =>{
            console.log("Sala salva com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
            console.log(err)
            console.log("Erro ao salvar filme")
        })
    }
})

module.exports = router