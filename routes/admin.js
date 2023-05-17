const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")
require("../models/MovieTheater")
const MovieTheater = mongoose.model("movieTheater")
require("../models/Session")
const Session = mongoose.model("session")

router.get('/register/movie', (req, res) =>{
    res.render("admin/addMovie")
})

router.post("/register/movie/new", (req, res) =>{

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
        res.render("admin/register/movie", {erros: erros})
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

    if(erros.length > 0){
        res.render("admin/register/movieTheater", {erros: erros})
    }
    else{
        const newMovieTheather = {
            number: req.body.number,
            type: req.body.type,
            seats: req.body.seats,
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

router.get("/register/session", (req, res)=>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{
        MovieTheater.find().lean().then((movietheather) =>{
            res.render("admin/addSession", {movies: movies, movietheather: movietheather})
        }).catch((err)=>{
            console.log(err)
        })
    })
})

router.post("/register/session/new", (req, res)=>{

    var erros = []

    if(!req.body.hour || typeof req.body.hour == undefined || req.body.hour == null){
        erros.push({texto: "Hora inválida"})
    }

    if(!req.body.movie || typeof req.body.movie == undefined || req.body.movie == null){
        erros.push({texto: "Filme inválido"})
    }

    if(!req.body.movieTheater || typeof req.body.movieTheater == undefined || req.body.movieTheater == null){
        erros.push({texto: "Sala inválida"})
    }

    if(!req.body.audio || typeof req.body.audio == undefined || req.body.audio == null){
        erros.push({texto: "Audio inválido"})
    }

    if(erros.length > 0){
        res.render("admin/register/session", {erros: erros})
    }
    else{
        const newSession = ({
            hour: req.body.hour,
            movie: req.body.movie,
            movieTheater: req.body.movieTheater,
            audio: req.body.audio
        })

        new Session(newSession).save().then(()=>{
            console.log("Sessão salva com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
            console.log(err)
            console.log("Erro ao salvar filme")
        })
        
    }

})

module.exports = router