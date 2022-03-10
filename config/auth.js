const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//User
require("../models/User");
const user = mongoose.model("users");

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField: 'username'}, (username,pw,done) => {
        user.findOne({username: username}).then((userFound) => {
            if(!userFound) {
                return done(null,false, {message: "Conta não existe."})
            }

            bcrypt.compare(pw, userFound.pw, (erro, batem) => {
                if(batem) {
                    return done(null,userFound);
                } else {
                    return  done(null,false,{message: "Senha errada!"});
                }
            })
        })
    }));

    passport.serializeUser((userFound,done) => {
      done(null,userFound.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id,(err,user) => {
            done(err,user);
        })
    });

};
