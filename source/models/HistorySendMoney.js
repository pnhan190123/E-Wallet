const mongoose =  require("mongoose")
const userSchema =  new mongoose.Schema({
    idTrade:{
        type:String,
    },
    idReceiver:{
        type:String,
    },
    fee:{
        type:Number,
    },
    userpayfee:{
        type: String,
    },
    note:{
        type:String,
    },
    time:{  
        type:String,
    }

})
const HistorySendMoney = mongoose.model("historysendmoney", userSchema)
module.exports = HistorySendMoney