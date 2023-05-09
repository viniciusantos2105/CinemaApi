//Carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const mongoose = require("mongoose")
    const app = express()
//Configurações

//Rotas

//Outros
const PORT = 8081
app.listen(PORT, () =>{
    console.log("Servidor rodando")
})