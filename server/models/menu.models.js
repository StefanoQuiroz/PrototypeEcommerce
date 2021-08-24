const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Este campo es obligatorio"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Este campo es obligatorio"]
    },
    category: { //tipo de plato
        type: String,
        required: [true, "Este campo es obligatorio"]
    },
    price: {
        type: Number,
        required: [true, "Este campo es obligatorio"]
    },
    image: {
        type: Object,
        required: [true, "Este campo es obligatorio"]
    },
    status: { //checked
        type: Boolean,
        default: false
    },
    prepared: { //sold
        type: Number,
        default: 0
    }

}, {timestamps: true});

const Menu = mongoose.model('Menus', MenuSchema);

module.exports = Menu;