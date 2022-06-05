const mongoose =  require("mongoose")

const userSchema =  new mongoose.Schema({
    cardNumber:{
        type: Number,
    },
    ExpiresEnd:{
        type: String,
    },
    CVV:{
        type: Number
    },
    Name:{
        type: String,
    },
    idUser:{
        type:String,
    },
    status:{
        type: Number,
        default: 0,
    }
    
}, {timestamps: true})

const Credit = mongoose.model("credit", userSchema);
module.exports =  Credit;