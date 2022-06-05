var express = require('express');

var router = express.Router();
const passport = require("passport");

const ControllerWalletUser =  require('../../controller/admin/ControllerWalletUser');
const initializePassport = require("../../passport-config");

const {
    checkAuthenticated,
    checkNotAuthenticated,
    
    isAdmin,
} = require("../../middlewares/auth");
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
router.get('/wallet/listTrade', checkAuthenticated, isAdmin, ControllerWalletUser.getWalletListTrade)
router.get('/wallet/acept/:id', checkAuthenticated, isAdmin, ControllerWalletUser.getAceptWalletTrade)


router.get('/wallet/done', checkAuthenticated, isAdmin, ControllerWalletUser.getListWalletDone)
router.get('/wallet/historyTrade', checkAuthenticated, isAdmin, ControllerWalletUser.getListWalletHistory)
module.exports = router;
