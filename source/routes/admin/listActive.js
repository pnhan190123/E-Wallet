var express = require('express');

var router = express.Router();
const passport = require("passport");

const ControllerListUser =  require('../../controller/admin/ControllerListUser');
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
router.get('/', checkAuthenticated, isAdmin, ControllerListUser.getHome)
router.get('/listActive/waiting-line', checkAuthenticated, isAdmin, ControllerListUser.getWaitingLine)
router.get('/listActive/acept/:id', checkAuthenticated, isAdmin, ControllerListUser.getAceptWaitingline)
router.get('/listActive/disable/:id', checkAuthenticated, isAdmin, ControllerListUser.getDisableWaitingLine)
router.get('/listActive/supplyIdCard/:id', checkAuthenticated, isAdmin, ControllerListUser.getSupplyIdCard)
router.get('/listActive/done', checkAuthenticated, isAdmin, ControllerListUser.getListActiveDone)
router.get('/listActive/disable', checkAuthenticated, isAdmin, ControllerListUser.getListDisable)
router.get('/listActive/block', checkAuthenticated, isAdmin, ControllerListUser.getListBlock)
router.get('/viewDetailUser/:id', checkAuthenticated, isAdmin, ControllerListUser.getviewDetailUser)
router.get('/listActive/acceptCard/:id', checkAuthenticated, isAdmin, ControllerListUser.acceptIdCard)
router.get('/listActive/blockUser/:id', checkAuthenticated, isAdmin, ControllerListUser.getBlockUser)



module.exports = router;
