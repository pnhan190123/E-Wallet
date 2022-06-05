var express = require('express');

var router = express.Router();
const passport = require("passport");

const homeController =  require('../controller/homeController');
const initializePassport = require("../passport-config");

const {
    checkAuthenticated,
    checkNotAuthenticated,
    checkreset,
    isAdmin,
    isFresher
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
router.get('/', checkAuthenticated, homeController.getHome)
router.get('/', checkAuthenticated, homeController.getChangePass)

router.get('/credit-Card',isFresher, checkAuthenticated, homeController.getCreditCard)
router.post('/credit-card',isFresher, checkAuthenticated, homeController.postCreditCard)
router.get('/edit-credit-card',isFresher, checkAuthenticated, homeController.geteditCreditCard)
router.post('/edit-credit-card',isFresher, checkAuthenticated, homeController.posteditCreditCard)
router.get('/payment',isFresher, checkAuthenticated, homeController.getPayment)
router.post('/payment',isFresher, checkAuthenticated, homeController.postPayment)
router.get('/history-trade',isFresher, checkAuthenticated, homeController.getHistoryTrade)
router.get('/history-trade/:id',isFresher, checkAuthenticated, homeController.getHistoryTradeDetail)
router.get('/withdraw-money',isFresher,checkAuthenticated, homeController.getWithDraw)
router.post('/withdraw-money',isFresher,isFresher, checkAuthenticated, homeController.postWithDraw)
router.get('/sendMoney',isFresher, checkAuthenticated, homeController.getSendMoney)
router.post('/sendMoney',isFresher, checkAuthenticated, homeController.postSendMoney)
router.get('/otp',isFresher, checkAuthenticated, homeController.getotp)
router.post('/otp',isFresher, checkAuthenticated, homeController.postotp)
router.get('/buy-card',isFresher, checkAuthenticated, homeController.getBuyCard)
router.post('/buy-card',isFresher, checkAuthenticated, homeController.postBuyCard)
router.get('/otp/resend',isFresher, checkAuthenticated, homeController.getresendOTP)
router.post('/otp/resend',isFresher, checkAuthenticated, homeController.postresendOTP)

module.exports = router;

