require("dotenv").config();
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/user");

var path = require('path'); 

const userRoute = require('./routes/user')
const homeRoute = require('./routes/home')
const AdminRoutelist = require('./routes/admin/listActive')
const AdminRouteWalletlist = require('./routes/admin/listWallet')

const app = express();

app.set('views', path.join(__dirname, 'views'));


const initializePassport = require("./passport-config");


initializePassport(
    passport,
    async(username) => {
        const userFound = await User.findOne({ username });
        return userFound;

    },
    async(id) => {
        const userFound = await User.findOne({ _id: id });
        return userFound;
    }

);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));


app.use('/users',userRoute);
app.use('/', homeRoute)
app.use('/admin', AdminRoutelist)
app.use('/admin', AdminRouteWalletlist)


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});









