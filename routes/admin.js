const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Movie")
const Movie = mongoose.model("movie")
require("../models/MovieTheater")
const MovieTheater = mongoose.model("movieTheater")
require("../models/Session")
const Session = mongoose.model("session")
const {eAdmin} = require("../helpers/eAdmin")

router.get("/controller", eAdmin, (req, res)=>{
    res.render("admin/allRegistres")
})

router.get('/register/movie', eAdmin, (req, res) =>{
    res.render("admin/addMovie")
})

router.post("/register/movie/new", eAdmin, (req, res) =>{

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

router.get("/register/movieTheater", eAdmin, (req, res) =>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{
        res.render("admin/addMovieTheather", {movies: movies})
    })
})

router.post("/register/movieTheater/new", eAdmin, (req, res)=>{

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

router.get("/register/session", eAdmin, (req, res)=>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{
        MovieTheater.find().lean().then((movietheather) =>{
            res.render("admin/addSession", {movies: movies, movietheather: movietheather})
        }).catch((err)=>{
            console.log(err)
        })
    })
})

router.post("/register/session/new", eAdmin, (req, res)=>{

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

        MovieTheater.findById(req.body.movieTheater).lean().then((movieTheater)=>{
            newSession.type = movieTheater.type
            newSession.seats = movieTheater.seats
            new Session(newSession).save().then(()=>{
                console.log("Sessão salva com sucesso!")
                res.redirect("/")
            }).catch((err) =>{
                console.log(err)
                console.log("Erro ao salvar filme")
            })
        })
        
    }

})

router.get("/edit", eAdmin, (req, res)=>{
    Session.find().lean().then((session)=>{
        Movie.find().lean().sort({date: "desc"}).then((movies) =>{
            res.render("admin/movies", {movies: movies})
        })
    })
})

router.get("/edit/movie/:id", eAdmin, (req, res)=>{
    Movie.findById({_id: req.params.id}).lean().then((movie)=>{
        if(movie){
            Session.find({movie: movie._id}).lean().then((session) =>{
                res.render("admin/editMovie", {movie: movie, session: session})
            }).catch((err) =>{
                console.log(err)
                res.redirect("/")
            })
        }
        else{
            res.redirect("/")
        }
       })
})

router.post("/edit/movie/update", eAdmin, (req, res)=>{
    Movie.findOne({_id: req.body.id}).then((movie)=>{
        movie.name = req.body.name,
        movie.classification = req.body.classification,
        movie.gender = req.body.gender,
        movie.synopsis = req.body.synopsis,
        movie.wallpaper = req.body.wallpaper
    

        movie.save().then(()=>{
            res.redirect("/admin/edit")
        }).catch((err)=>{
            console.log(err)
            res.redirect("/")
        })
    })
})

router.get("/edit/session/:id", eAdmin, (req, res)=>{
    Movie.find().lean().sort({date: "desc"}).then((movies) =>{
        MovieTheater.find().lean().then((movietheather) =>{
            Session.findById({_id: req.params.id}).lean().then((session)=>{
                const str = session.movieTheater
                MovieTheater.findById({_id: str.toString()}).lean().then((theater)=>{
                    const string = session.movie
                    Movie.findById({_id: string.toString()}).lean().then((onemovie)=>{
                        res.render("admin/editSession", {session: session, movies: movies, movietheather: movietheather, theater: theater, onemovie: onemovie})  
                    })
                })
            }).catch((err) =>{
                console.log(err)
                res.redirect("/")
            })  
        })

    })
})

router.post("/edit/session/update", eAdmin, (req, res)=>{
    MovieTheater.findById({_id: req.body.movieTheater}).lean().then((movieTheater)=>{
        Session.findOne({_id: req.body.id}).then((session)=>{
            session.hour = req.body.hour,
            session.movie = req.body.movie,
            session.type = movieTheater.type,
            session.movieTheater = req.body.movieTheater,
            session.audio = req.body.audio,
            session.seats = movieTheater.seats

            session.save().then(()=>{
                res.redirect("/admin/edit")
                console.log(session)
            }).catch((err) =>{
                console.log(err)
                res.redirect("/")
                })  
            })
        })
})


module.exports = router