const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: "test28150106@gmail.com",
        pass: "0987574201"
    },
    tls: {
        rejectUnauthorized: false,
    }
})
module.exports  =  transporter