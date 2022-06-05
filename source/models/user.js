const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone:{
      type:String,
      required: true,

  },

  email: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true,
  },

  birthday:{
      type: Date,
      required: true,
  },
  address:{
    type: String,
    required: true,
 },
  IdCard:{
    type: String,
    // required: true,

  },
  OnCard:{
    type: String,
  },
  BottomCard:{
    type:String,
  },

  username:{
      type: String
  },
  password:{
      type: String,
  },
  active:{
    type: Number,
  },
  Nchangepass:{
    type: Number,
  },
  Avatar:{
    type: String,
  },
 
  resetLink:{
    type:String,
    default: "",
  },
  loginfail:{
    type:Number,

  },
  abnormallogin:{
    type: Number,
  },
  wallet:{
    type: Number,
    default: 0,
  }, 
  role:{
    type: String,
    default: "user",
    enum:["user", "admin","Fresher"]
  },
  time:{
    type: String,
  },
  announcement:{
  type: Number,
  default: 0,
}
//   bottomIdCard:{
//     data: Buffer,
//     contentType: String,
//     // required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

}, {timestamp: true});

// const User = mongoose.model("user", userSchema) 
// module.exports = User;
module.exports = mongoose.models['user'] || mongoose.model('user', userSchema)
