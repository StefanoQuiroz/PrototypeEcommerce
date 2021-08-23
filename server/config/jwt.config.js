const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/user.models");

//Autenticación comun del usuario
const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secretKey, (error, payload) => {
        if(error){
            res.status(401).json({verified:false, message: "Acesso denegado"})
        } else {
            next();
        }
    })
}

//Autenticación del admin
const authenticateAdmin = (req, res, next) => {
   /*  try{
        const user = await User.findOne({
            _id: req.user.id
        })
        console.log(user.data)
        if(user.data.rol === 0)
        return res.status(400).json({message: "Acceso denegado al Administrador"})
         
        next();
    } catch(error){
        return res.status(500).json({message: "Algo salió mal de authenticate"})
    } */
    User.findById({_id: req.body.id})
        .then( result => {
            console.log("resultado", result)
            if(result.rol === 0){
                res.json({message: "Acceso denegado al Administrador"})
            } else{
                next();
            }
        })
        .catch(error => res.json({error: error, message: "Algo salió mal"}))
}

module.exports = {secretKey, authenticate, authenticateAdmin};
