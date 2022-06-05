const mongoose =  require("mongoose")
const userSchema =  new mongoose.Schema({
    idUser:{
        type: String,
    },
    OTP:{
        type: String,
    },
    status:{
        type: Number,
    },
    time:{
        type:Number,
    },

})
const OPT =  mongoose.model("otp", userSchema);
module.exports =  OPT;