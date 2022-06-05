const mongoose = require("mongoose")
const userSchema =  new mongoose.Schema({
    typetrade:{
        type: String,
    },
    idUser:{
        type: String,
    },

    value:{
        type:Number
    },

    status:{
        type:Number,
    }, 

    date:{
        type: String,
    }
    
  
   
 })

const HistoryTrade =  mongoose.model("historytrade", userSchema);
module.exports =  HistoryTrade;


