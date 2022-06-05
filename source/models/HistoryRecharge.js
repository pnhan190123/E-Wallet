const mongoose = require("mongoose")
const userSchema =  new mongoose.Schema({
    idTrade:{
        type: String,
    },
    CardNumber:{
        type:String,
    },
    CardName:{
        type:String,
    },
    time:{
        type: String,
    }


})
const HistroryRecharge =  mongoose.model("historyrecharges", userSchema)
module.exports =  HistroryRecharge