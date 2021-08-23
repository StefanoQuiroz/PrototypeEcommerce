const Category = require("../models/category.models");

const findCategory = (req, res) => {
    Category.find({})
        .then(result => res.json({data: result}))
        .catch(error => {
           res.json({error: error, message: "Categoria no encontrada"});
           res.sendStatus(404); 
        })
}

const createCategory = async (req, res) => {
    try{
        res.json("Todo OK")

    } catch(error) {
       return res.status(500).json({message:"algo salio mal de createCategory"}) 
    }
    /* Category.create(req.body)
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500)
        }) */
} 
module.exports = {findCategory, createCategory};