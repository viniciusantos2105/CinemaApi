//Carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    var handle = handlebars.create({defaultLayout: 'main'})
    const bodyParser = require("body-parser")
    const app = express()
    const catalog = require("./routes/catalog")
    const admin = require("./routes/admin")
    const mongoose = require("mongoose")
    require("./models/Movie")
    const Movie = mongoose.model("movie")
//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handle.engine);
        app.set('view engine', 'handlebars');
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://127.0.0.1:27017/cinemaapi?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.1", {   
            useNewUrlParser:true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("MongoDB Conectado...")
        }).catch((err) => {
            console.log("Houve um erro ao se conectar ao mongoDB: "+ err)
        })
//Rotas
    app.get('/', (req, res) =>{
        Movie.find().lean().sort({date: "desc"}).limit(8).then((movies) =>{
            res.render("main", {movies: movies})
        })
    })

    app.get("/movie/:id", (req, res)=>{
       Movie.findById({_id: req.params.id}).lean().then((movie)=>{
        res.render("movie/main", {movie: movie})
       })
    })

    app.use('/admin', admin)
    app.use('/catalog', catalog)
//Outros
const PORT = 8081
app.listen(PORT, () =>{
    console.log("Servidor rodando")
})