const Category = require("../models/category.models");

const findCategory = (req, res) => {
    Category.find({})
        .then(result => res.json({data: result}))
        .catch(error => {
           res.json({error: error, message: "Categoria no encontrada"});
           res.sendStatus(404); 
        })
}

module.exports = {findCategory};