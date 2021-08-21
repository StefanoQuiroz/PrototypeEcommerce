const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName :{ 
        type: String,
        required : [true, "Nombre obligatorio"],
        trim: true //para eliminar los espacions en ambos lados
    },
    
    lastName :{ 
        type: String,
        required : [true, "Apellido obligatorio"],
        trim: true //para eliminar los espacions en ambos lados
    },
    
    email :{ 
        type: String,
        required : [true, "Email obligatorio"],
        trim: true //para eliminar los espacions en ambos lados
    },
    
    password :{ 
        type: String,
        required : [true, "Contraseña obligatoria"],
        trim: true //para eliminar los espacions en ambos lados
    },
    //rol usuario comun o administrador
    role : {
        type: Number,
        default: 0
    },
    //Para el carrito de platillos por usuario
    cart : { 
        type: Array,
        default: []
    }
    

}, {timestamps: true})

//ConfirmPassword
UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Las contraseñas deben de coincidir");
    }
    next();
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

const User = mongoose.model('User', UserSchema);

module.exports = User;