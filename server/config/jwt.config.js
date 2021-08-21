const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secretKey, (error, payload) => {
        if(error){
            res.status(400).json({verified: false});
        } else {
            next();
        }
    })
}

module.exports = {secretKey, authenticate};