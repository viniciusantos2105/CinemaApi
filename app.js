//Carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    var handle = handlebars.create({defaultLayout: 'main'})
    const bodyParser = require("body-parser")
    const app = express()
    const catalog = require("./routes/catalog")
//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handle.engine);
        app.set('view engine', 'handlebars');
    //Mongoose

//Rotas
    app.get('/', (req, res) =>{
        res.send("Rota principal")
    })

    app.use('/catalog', catalog)
//Outros
const PORT = 8081
app.listen(PORT, () =>{
    console.log("Servidor rodando")
})