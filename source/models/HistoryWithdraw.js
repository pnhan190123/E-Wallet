const mongoose = require("mongoose")
const userSchema =  new mongoose.Schema({
  
    idTrade:{
        type: String,
    },
    NameCard:{
        type: String
    },
    note:{
        type: String
    },
    time: {
        type: String
    },
    slot:{
        type: Number
    }
    })
    const HistoryWithdraw =  mongoose.model("historywithdraws",userSchema)
    module.exports = HistoryWithdraw
