const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../config/jwt.config");

const findUser = (req, res) => {
    User.find({})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error:error, message:"Algo salió mal"})
            res.sendStatus(404);
        })
}

const findSingleUser = (req, res) => {
    User.findById({_id: req.params.id})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal"})
            res.sendStatus(404)
        })
}

const createUser = (req,res) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result){
                res.json({error: true, message:"El email ya se encuentra registrado"})
            } else {
                User.create(req.body)
                    .then(cuenta => res.json({data: cuenta}))
                    .catch(error => {
                        res.json({error: error, message:"Algo salió mal"});
                        res.sendStatus(500)
                    })
            }
        })
}

const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal"});
            res.sendStatus(500);
        })
}

const deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal"});
            res.json(202);
        })
}

const login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result === null){
                res.json({error: true, message: "Usuario no existe"})
            } else {
                bcrypt.compare(req.body.password, result.password)
                    .then(isValid => {
                        if(isValid){
                            const payload = {
                                _id: result.id,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email
                            }
                            const token = jwt.sign(payload, secretKey);
                            res.cookie("usertoken", token, secretKey, {httpOnly: true})
                                .json({message: "login", data: payload})
                        } else {
                            res.json({error: true, message: "Password inválido"})
                        }
                    })
                    .catch(error => res.json({error: error, message: "Usuario y contraseña inválidos"}))
            }

        })
        .catch(error => {
            res.json({error: error, message: "Usuario o contraseña invalidos"})
        })
}

module.exports = {findUser, findSingleUser, createUser, updateUser, deleteUser, login};

