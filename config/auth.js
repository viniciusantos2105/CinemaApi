const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//Model de usuário
require("../models/Client")
const Client = mongoose.model("client")


module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done)=>{

        Client.findOne({email: email}).then((client) =>{
            if(!client){
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(password, client.password, (erro, batem) =>{

                if(batem){
                    return done(null, client)
                }
                else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((client, done) =>{

        done(null, client.id)
    })

    passport.deserializeUser((id, done) => {
        Client.findById(id)
             .then(user => {
                  done(null, user)
             })
             .catch(err => done(err))
   })
}