const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/user.models");

//Autenticación comun del usuario
const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secretKey, (error, payload) => {
        if(error){
            res.status(401).json({verified:false})
        } else {
            next();
        }
    })
}

//Autenticación del admin
const authenticateAdmin = (req, res, next) => {
    User.findOne({_id: req.params.id})
        .then( result => {
            if(result.rol === 0){
                res.json({message: "Acceso al administrador denegado"})
            } else{
                next();
            }
        })
        .catch(error => res.json({error: error, message: "Algo salió mal"}))
}

module.exports = {secretKey, authenticate, authenticateAdmin};
