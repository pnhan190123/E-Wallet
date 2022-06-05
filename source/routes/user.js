var express = require('express');

const User = require("../models/user");

var router = express.Router();
const passport = require("passport");

const controllerUser =  require('../controller/controllerUser');
const initializePassport = require("../passport-config");





const {
    checkAuthenticated,
    checkNotAuthenticated,
    isFresher,
    
    
} = require("../middlewares/auth");
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

router.get('/register',checkNotAuthenticated,controllerUser.getRegiter)
router.get('/login',checkNotAuthenticated ,controllerUser.getLogin)
router.post('/register', checkNotAuthenticated, controllerUser.postRegister)
router.post('/login', checkNotAuthenticated, controllerUser.postLogin)
router.get('/profile', checkAuthenticated, controllerUser.getProfile)
router.get('/profile/bottomCard', checkAuthenticated, controllerUser.getbottomCard)
router.post('/profile/bottomCard',checkAuthenticated,controllerUser.postbottomCard)
router.get('/profile/OnCard', checkAuthenticated, controllerUser.getOnCard)
router.post('/profile/OnCard', checkAuthenticated, controllerUser.postOnCard)
router.post('/profile/Avatar', checkAuthenticated, controllerUser.postAvatar)
router.post('/change-pass', checkAuthenticated, controllerUser.postChangePass)
router.get('/logout', checkAuthenticated, controllerUser.getLogout)
router.get('/forgot-password',checkNotAuthenticated, controllerUser.getForgotPassword)
router.post('/forgot-password',checkNotAuthenticated, controllerUser.postForgotPassword)
router.get('/reset-password/:id/:token', checkNotAuthenticated, controllerUser.getresetPass)
router.post('/reset-password/:id/:token',checkNotAuthenticated, controllerUser.postresetPass)
module.exports = router;
