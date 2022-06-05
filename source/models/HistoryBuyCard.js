const mongoose =  require("mongoose")
const userSchema  = new mongoose.Schema({
    idTrade:{
        type: String
    },
    SupplyCard:{
        type: String
    },

    total:{
        type: Number
    },
    time:{
        type:String
    },
    denominations:{
        type: Number,
    },
  
    idCard:{
        type:String,
    }

})
const HistoryBuyCard =  mongoose.model("historybuycards", userSchema)
module.exports=   HistoryBuyCard