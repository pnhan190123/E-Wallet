var db = require('../config/db')
const Credit = require('../models/credits')
const User = require('../models/user')
const HistoryTrade = require('../models/historytrade')
const OTP = require('../models/otp')
let transporter = require('../middlewares/transporter')
const http = require('http')
const { default: mongoose } = require('mongoose')
exports.getHome = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.user.id)

    res.render("../views/index", { infor: req.user });
}
exports.getCreditCard = (req, res, next) => {
    const id = req.user._id
    db.collection('credits').find({ "idUser": id }).toArray((err, result) => {
        if (result[0]) {
            res.render('../views/credit-card/credit-card', { infor: result[0] });

        } else {

            res.render('../views/credit-card/credit-card')

        }
    })
}
exports.postCreditCard = (req, res, next) => {
    const { card, name, expirationdate, securitycode } = req.body;
    // const expDateFormatter = expirationdate.replace(/\//g, "").substring(0, 2) +
    //     (expirationdate.length > 2 ? '/' : '') +
    //     expirationdate.replace(/\//g, "").substring(2, 4);
    //     console.log(expDateFormatter);
    //   const id =  req.user._id
    //   const userFound = await Credit.findOne({ id });
    // //   console.log(userFound)
    //   if(userFound){
    //       error = "Tài khoản đã liên kết thẻ tín dụng"
    //       res.render('credit-card/credit-card', { errorMessage: error, infor: userFound })

    //   }else{
    if (card == "111111") {
        if (expirationdate == "2022-10-10") {
            if (securitycode == "411") {

                try {

                    db.collection('credits').insertOne({
                        cardNumber: card,
                        Name: name,
                        CVV: securitycode,
                        ExpiresEnd: expirationdate,
                        idUser: req.user._id,
                    })

                    // error = 'Liên kết thành công'
                    // res.render('credit-card/credit-card', { errorMessage: error })
                    res.redirect('/credit-card')



                } catch (error) {
                    error = 'Thẻ không hợp lệ hoặc bị sai'
                    res.render('credit-card/credit-card', { errorMessage: error })
                }



            }
        }
    } else if (card == "222222") {
        if (expirationdate == "2022-11-11") {
            if (securitycode == "443") {

                try {
                    db.collection('credits').insertOne({
                        cardNumber: card,
                        Name: name,
                        CVV: securitycode,
                        ExpiresEnd: expirationdate,
                        idUser: req.user._id,
                    })

                    res.redirect('/credit-card')


                } catch (error) {
                    error = 'Thẻ không hợp lệ hoặc bị sai'
                    res.render('credit-card/credit-card', { errorMessage: error })
                }
            }
        }
    } else if (card == "333333") {
        if (expirationdate == "2022-12-12") {
            if (securitycode == "577") {

                try {
                    db.collection('credits').insertOne({
                        cardNumber: card,
                        Name: name,
                        CVV: securitycode,
                        ExpiresEnd: expirationdate,
                        idUser: req.user._id,
                    })

                    res.redirect('/credit-card')

                    return
                } catch (error) {
                    error = 'Thẻ không hợp lệ hoặc bị sai'
                    res.render('credit-card/credit-card', { errorMessage: error })
                }
            }
        }
    } else {
        error = 'Thẻ không tồn tại'
        res.render('credit-card/credit-card', { errorMessage: error })
    }
    //   }


}
exports.geteditCreditCard = async(req, res, next) => {
    const id = req.user._id
    const userFound = await Credit.findOne({ id })
    if (userFound) {
        res.render('../views/credit-card/credit-card', {infor: userFound });

    } else {

        res.render('../views/credit-card/credit-card')

    }

}
exports.posteditCreditCard = async(req, res, next) => {
    const { card, name, expirationdate, securitycode } = req.body;
    // const expDateFormatter = expirationdate.replace(/\//g, "").substring(0, 2) +
    //     (expirationdate.length > 2 ? '/' : '') +
    //     expirationdate.replace(/\//g, "").substring(2, 4);
    const id = req.user._id

    
    const creditsFound = await Credit.findOne({ id })
    if (card == "111111") {
        if (expirationdate == "2022-10-10") {
            if (securitycode == "411") {


                db.collection('credits').updateOne({
                    _id: creditsFound._id
                }, {
                    $set: {
                        "cardNumber": card,
                        "ExpiresEnd": expirationdate,
                        "CVV": securitycode,
                        "idUser": req.user._id,

                    },
                }, { upsert: true })

                error = 'Cập nhật thành công'
                res.redirect('/edit-credit-card');







            } else {


                error = 'Thẻ không hợp lệ hoặc bị sai'
                res.render('../views/credit-card/credit-card', { errorMessage: error })
            }
        } else {


            error = 'Thẻ không hợp lệ hoặc bị sai'
            res.render('../views/credit-card/credit-card', { errorMessage: error })
        }
    } else if (card == "222222") {
        if (expirationdate == "2022-11-11") {
            if (securitycode == "443") {



                db.collection('credits').updateOne({
                    _id: creditsFound._id
                }, {
                    $set: {
                        "cardNumber": card,
                        "ExpiresEnd": expirationdate,
                        "CVV": securitycode,
                        "idUser": req.user._id,

                    },
                }, { upsert: true })

                error = 'Cập nhật thành công'
                res.redirect('/edit-credit-card');

            } else {


                error = 'Thẻ không hợp lệ hoặc bị sai'
                res.render('../views/credit-card/credit-card', { errorMessage: error })
            }
        } else {


            error = 'Thẻ không hợp lệ hoặc bị sai'
            res.render('credit-card/credit-card', { errorMessage: error })
        }
    } else if (card == "333333") {
        if (expirationdate == "2022-12-12") {
            if (securitycode == "577") {


                db.collection('credits').updateOne({
                    _id: creditsFound._id
                }, {
                    $set: {
                        "cardNumber": card,
                        "ExpiresEnd": expirationdate,
                        "CVV": securitycode,
                        "idUser": req.user._id,

                    },
                }, { upsert: true })

                error = 'Cập nhật thành công'
                // const infor = {
                //     "cardNumber": card,
                //     "ExpiresEnd": expirationdate,
                //     "CVV": securitycode,
                //     "Name": req.user._id,

                // }
                res.redirect('/edit-credit-card');
            } else {


                error = 'Thẻ không hợp lệ hoặc bị sai'
                res.render('../views/credit-card/credit-card', { errorMessage: error })
            }
        } else {


            error = 'Thẻ không hợp lệ hoặc bị sai'
            res.render('../views/credit-card/credit-card', { errorMessage: error })
        }
    } else {
        error = 'Thẻ không tồn tại'
        res.render('../views/credit-card/credit-card', { errorMessage: error })
    }
}
exports.getPayment = async(req, res, next) => {
    res.render('../views/credit-card/payment');

}
exports.postPayment = async(req, res, next) => {
    const { valuemoney } = req.body;
    const id = mongoose.Types.ObjectId(req.user.id)
    const user = await User.findOne({ _id: id })
    var total = parseInt(user.wallet) + parseInt(valuemoney)
    const date_obj = new Date()
    const date = date_obj.toLocaleString();
    db.collection('credits').find({ 'idUser': id }).toArray(async(req, result) => {
        const nameuser = await User.find({ _id: result[0].idUser })
        if (result[0]) {
            if (result[0].cardNumber == 111111) {
                db.collection('users').updateOne({
                    _id: id
                }, {
                    $set: {
                        "wallet": total,
                    },
                }, { upsert: true })


                db.collection('historytrades').insertOne({
                    typetrade: "Nạp Tiền",
                    idUser: user._id,
                    value: valuemoney,
                    date: date,
                    status: 1,
                })
                db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Nạp Tiền' }, { 'date': date }] }).toArray(async(err, result) => {
                    if (result[0]) {
                        db.collection('historyrecharges').insertOne({
                            idTrade: result[0]._id,
                            time: date,
                            CardNumber: "111111",
                            CardName: nameuser[0].name
                        })
                    } else {
                        error = 'Không tìm thấy thẻ tín dụng'
                        res.render('credit-card/payment', { errorMessage: error })
                    }
                })


                error = 'Nạp tiền thành công'
                res.render('credit-card/payment', { errorMessage: error })
                let mailOptions = {
                    from: process.env.userMail,
                    to: user.email,
                    subject: "Payment success",
                    text: "Sir/ Madam payment success " + valuemoney + "VND to" + user.username

                }
                transporter.sendMail(mailOptions, function(err, success) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email send Succesfull")
                    }

                })



            } else if (result[0].cardNumber == 222222) {
                if (valuemoney <= 1000000) {
                    db.collection('users').updateOne({
                        _id: id
                    }, {
                        $set: {
                            "wallet": total,
                        },
                    }, { upsert: true })
                    db.collection('historytrades').insertOne({
                        typetrade: "Nạp Tiền",
                        idUser: user._id,
                        value: valuemoney,
                        date: date,
                    })

                    db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Nạp Tiền' }, { 'date': date }, { 'value': valuemoney }] }).toArray(async(err, result) => {
                        // console.log(result)
                        db.collection('historyrecharges').insertOne({
                            idTrade: result[0]._id,
                            time: date,
                            CardNumber: "222222",
                            CardName: nameuser[0].name
                        })
                    })

                    error = 'Nạp tiền thành công'
                    res.render('credit-card/payment', { errorMessage: error })
                    let mailOptions = {
                        from: process.env.userMail,
                        to: user.email,
                        subject: "Payment success",
                        text: "Sir/ Madam payment success " + valuemoney + "VND to" + user.username

                    }
                    transporter.sendMail(mailOptions, function(err, success) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Email send Succesfull")
                        }

                    })
                } else {
                    error = 'Chỉ được phép nạp dưới hoặc 1 triệu / 1 lần'
                    res.render('credit-card/payment', { errorMessage: error })
                }
            } else if (result[0].cardNumber == 333333) {

                error = 'Nạp tiền thất bại, thẻ hết tiền'
                res.render('credit-card/payment', { errorMessage: error })
                let mailOptions = {
                    from: process.env.userMail,
                    to: user.email,
                    subject: "Payment fail",
                    text: "Sir/ Madam credit card without money"

                }
                transporter.sendMail(mailOptions, function(err, success) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email send Succesfull")
                    }

                })

            }

        } else {

        }
    })


}
exports.getHistoryTrade = async(req, res, next) => {
    const id = mongoose.Types.ObjectId(req.user.id)
    db.collection('historytrades').find({ 'idUser': id }).toArray((err, result) => {
        res.render('../views/history-trade/index', { history: result })
    })

}
exports.getHistoryTradeDetail = async(req, res, next) => {
    const id = req.params.id;
    const idTrade = mongoose.Types.ObjectId(id)

    const data = await HistoryTrade.find()
    var ten = []
    var twenty = []
    var fity = []
    var onehun = []

    for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id && data[i].typetrade == "Mua thẻ điện thoại") {
            db.collection('historybuycards').find({ 'idTrade': idTrade }).toArray(async(err, result) => {
                const demon = result[0].denominations.toString();

                for (var x = 0; x < demon[0]; x++) {
                    //    console.log(l)
                    ten.push(result[0].idCard[x].toString())

                }
                var count = (parseInt(demon[1]) + parseInt(demon[0]))
                // console.log(count)
                for (var y = parseInt(demon[0]); y < count; y++) {
                    //    console.log(l)
                    twenty.push(result[0].idCard[y])

                }
                var count2 = parseInt(demon[0]) + parseInt(demon[1]) + parseInt(demon[2])
                for (var z = count; z < count2; z++) {
                    //    console.log(l)
                    fity.push(result[0].idCard[z].toString())

                }
                var count3 = parseInt(demon[0]) + parseInt(demon[1]) + parseInt(demon[2]) + parseInt(demon[3])
                for (var g = count2; g < count3; g++) {
                    //    console.log(l)
                    onehun.push(result[0].idCard[g].toString())

                }

                var tenJSON = {
                    demon: "10000",
                    idCard: ten,
                    amount: result[0].denominations[0]
                }
                var twentyJSON = {
                    demon: "20000",
                    idCard: twenty,
                    amount: result[0].denominations[1]
                }
                var fityJSON = {
                    demon: "50000",
                    idCard: fity,
                    amount: result[0].denominations[2]
                }
                var onehunJSON = {
                    demon: "100000",
                    idCard: onehun,
                    amount: result[0].denominations[3]
                }



                const check = demon.split("");
                var total = 0
                for (var i = 0; i < check.length; i++) {
                    total += parseInt(check[i])
                }

                res.render('../views/history-trade/profile-buy-card', { data: result[0], checkten: tenJSON, checktwenty: twentyJSON, checkfity: fityJSON, checkonehun: onehunJSON, total: total });

            })
        } else if (data[i]._id == id && data[i].typetrade == "Chuyển tiền") {
            db.collection('historysendmoneys').find({ 'idTrade': idTrade }).toArray(async(req, result) => {
                // console.log(result[0])
                const idcheck = result[0].idReceiver
                const userscheck = await User.find({ _id: idcheck })
                const Tradecheck = await HistoryTrade.find({ _id: idTrade })
                const usersend = await User.find({ _id: Tradecheck[0].idUser })
                const fee = (parseInt(Tradecheck[0].value) * 5) / 100
                res.render('history-trade/profile-send-money', { data: result[0], userReceiver: userscheck[0], trade: Tradecheck[0], fee: fee, usersend: usersend[0] });

            })
        } else if (data[i]._id == id && data[i].typetrade == "Rút tiền") {

            db.collection('historywithdraws').find({ 'idTrade': idTrade }).toArray(async(req, result) => {
                const value = await HistoryTrade.find({ _id: result[0].idTrade })
                const feewithdraw = (parseInt(value[0].value) * 5) / 100
                res.render('../views/history-trade/profile-withdraw', { data: result[0], value: value[0].value, feewithdraw: feewithdraw });


            })

        } else if (data[i].id == id && data[i].typetrade == "Nạp Tiền") {
            db.collection('historyrecharges').find({ 'idTrade': idTrade }).toArray(async(req, result) => {
                const id = result[0].idTrade
                const idTrade = await HistoryTrade.findOne({ _id: result[0].idTrade })
                // console.log(idTrade)

                res.render('../views/history-trade/profile-recharge', { data: result[0], idTrade: idTrade });

            })
        }
    }


}
exports.getWithDraw = async(req, res, next) => {
    res.render('../views/withdraw-money/withdraw-money')

}
exports.postWithDraw = async(req, res, next) => {
    const { card, name, expirationdate, securitycode, note, valuemoney } = req.body;
    const id = req.user._id
    const user = await User.findOne({ _id: id })
    const tmp = parseInt(user.wallet) - parseInt(valuemoney);
    console.log(tmp);
    const wallet = tmp - (valuemoney * 0.05);
    console.log(wallet);
    var checkWallet = parseInt(user.wallet) - parseInt(valuemoney)
    let date_ob = new Date();
    const datecheck = date_ob.toLocaleString()
    const datareal = datecheck.substring(0, datecheck.lastIndexOf(", "))
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var oneday = 86400;
    var realtime = seconds + (minutes * 60) + (hours * 60 * 60)
    var check = oneday - realtime;
    // const checkwithdraw = await HistoryTrade.findOne({"idUser": id,"typetrade": "Mua thẻ điện thoại"})
    db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Rút tiền' }] }).toArray(async(err, result) => {

        // const tradeid =  await HistoryTrade.findOne({_id: result[0]._id})
        // const timedbcheck =  (tradeid.time).substring(0, (tradeid.time).lastIndexOf(", "))
        // if(timedbcheck === )
        if (result[0]) {
            const timedb = result[0].time
            const datedb = timedb.substring(0, timedb.lastIndexOf(", "))
            if (datareal == datedb) {
                if (card == "111111") {
                    if (expirationdate == "2022-10-10") {
                        if (securitycode == "411") {
                            if (checkWallet >= 0) {


                                if (check >= 0) {
                                    db.collection('historywithdraws').find({}).sort({ "slot": -1 }).limit(1).toArray((err, resultcheck) => {
                                        if (resultcheck[0].slot < 2) {
                                            if (valuemoney % 50000 == 0) {
                                                if (realtime >= 0 && realtime <= oneday) {

                                                    if (valuemoney <= 5000000) {

                                                        db.collection('historytrades').insertOne({
                                                            "typetrade": "Rút tiền",
                                                            "idUser": id,
                                                            // "receiver": name,
                                                            "value": valuemoney,
                                                            // "note": note,
                                                            "status": 1,
                                                            // "slot": 2,
                                                            "time": datecheck,
                                                        })
                                                        db.collection('historytrades').find({ $and: [{ "idUser": id }, { "time": datecheck }, { "typetrade": "Rút tiền" }] }).toArray((err, historydb) => {
                                                            db.collection('historywithdraws').insertOne({
                                                                idTrade: historydb[0]._id,
                                                                NameCard: name,
                                                                time: datecheck,
                                                                note: note,
                                                                slot: 2,
                                                            })

                                                        })



                                                        db.collection('users').updateOne({
                                                            _id: user._id
                                                        }, {
                                                            $set: {
                                                                "wallet": wallet
                                                            },
                                                        }, { upsert: true })




                                                        let mailOptions = {
                                                            from: process.env.userMail,
                                                            to: user.email,
                                                            subject: "Withdraw Successfull",
                                                            text: "Quý khách đã rút " + valuemoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + "  về tài khoản thành công"

                                                        }
                                                        transporter.sendMail(mailOptions, function(err, success) {
                                                            if (err) {
                                                                console.log(err)
                                                            } else {
                                                                console.log("Email send Succesfull")
                                                            }

                                                        })
                                                        error = 'Rút tiền về tài khoản thành công'
                                                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                                    } else {

                                                        db.collection('historytrades').insertOne({
                                                            "typetrade": "Rút tiền",
                                                            "idUser": id,
                                                            // "receiver": name,
                                                            "value": valuemoney,
                                                            // "note": note,

                                                            "status": 0,
                                                            // "slot": 2,
                                                            "time": datecheck,
                                                        })

                                                        db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'time': datecheck }, { "typetrade": "Rút tiền" }] }).toArray((err, result) => {
                                                            db.collection('historywithdraws').insertOne({
                                                                idTrade: result[0]._id,
                                                                NameCard: name,
                                                                note: note,
                                                                time: datecheck,
                                                                slot: 2,
                                                            })

                                                        })


                                                        db.collection('historytrades').find({ "idUser": id }).sort({ status: 1 }).limit(1).toArray((err, result) => {
                                                            // console.log(result[0].status)
                                                            if (result[0].status == 1) {
                                                                db.collection('users').updateOne({
                                                                    _id: user._id
                                                                }, {
                                                                    $set: {
                                                                        "wallet": wallet
                                                                    },
                                                                }, { upsert: true })
                                                            } else {
                                                                error = 'Số tiền rút hơn 5 triệu đang chờ admin xử lý'
                                                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                                            }

                                                        })


                                                        let mailOptions = {
                                                            from: process.env.userMail,
                                                            to: user.email,
                                                            subject: "Withdraw Successfull",
                                                            text: "Quý khách đã rút 1 BTC VND về tài khoản thành công"

                                                        }
                                                        transporter.sendMail(mailOptions, function(err, success) {
                                                            if (err) {
                                                                console.log(err)
                                                            } else {
                                                                console.log("Email send Succesfull")
                                                            }

                                                        })
                                                        error = 'Số tiền rút hơn 5 triệu đang chờ admin xử lý'
                                                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                                    }
                                                } else {
                                                    error = 'Qúy khách đã hết lượt rút tiền vào hôm nay'
                                                    res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                                }
                                            } else {
                                                error = 'Số tiền phải là bội của 50.000'
                                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                            }

                                        } else {
                                            error = 'Qúy khách đã hết lượt rút tiền vào hôm nay'
                                            res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                        }

                                    })


                                } else {
                                    checkwithdraw.slot = 0

                                }
                            } else {
                                error = 'Tài khoản quý khách không đủ! Vui lòng nạp thêm'
                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                            }
                        } else {
                            error = 'Số CVV bị sai hoặc không hợp lệ'
                            res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                        }
                    } else {
                        error = 'Ngày hết hạn bị sai hoặc không hợp lệ'
                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                    }
                } else {
                    error = 'Thẻ không tồn tại'
                    res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                }

            } else {
                error = 'Khác ngày'
                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
            }
        } else {
            if (card == "111111") {
                if (expirationdate == "2022-10-10") {
                    if (securitycode == "411") {
                        if (check >= 0) {
                            if (valuemoney % 50000 == 0) {
                                if (parseInt(realtime) >= 0 && parseInt(realtime) <= parseInt(oneday)) {
                                    if (valuemoney <= 5000000) {
                                        db.collection('historytrades').insertOne({
                                            "typetrade": "Rút tiền",
                                            "idUser": id,
                                            // "receiver": name,
                                            "value": valuemoney,
                                            // "note": note,
                                            "status": 1,
                                            // "slot": 1,
                                            "time": datecheck,
                                        })



                                        db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Rút tiền' }, { "time": datecheck }] }).toArray(async(err, result) => {
                                            if (result[0]) {
                                                db.collection('historywithdraws').insertOne({
                                                    idTrade: result[0]._id,
                                                    NameCard: name,
                                                    note: note,
                                                    time: datecheck,
                                                    slot: 1,
                                                })
                                            } else {
                                                error = 'Số tiền rút hơn 5 triệu đang chờ admin xử lý'
                                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                            }
                                        })

                                        db.collection('users').updateOne({
                                            _id: user._id
                                        }, {
                                            $set: {
                                                "wallet": wallet
                                            },
                                        }, { upsert: true })
                                        let mailOptions = {
                                            from: process.env.userMail,
                                            to: user.email,
                                            subject: "Withdraw Successfull",
                                            text: "Quý khách đã rút " + valuemoney + " VND về tài khoản thành công"

                                        }
                                        transporter.sendMail(mailOptions, function(err, success) {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log("Email send Succesfull")
                                            }

                                        })
                                        error = 'Rút tiền về tài khoản thành công'
                                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                    } else {
                                        db.collection('historytrades').insertOne({
                                            "typetrade": "Rút tiền",
                                            "idUser": id,
                                            // "receiver": name,
                                            "value": valuemoney,
                                            // "note": note,
                                            "status": 0,
                                            // "slot": 1,
                                            "time": datecheck,
                                        })

                                        db.collection('historytrades').find({ "idUser": id }).sort({ status: 1 }).limit(1).toArray((err, checkwalletuser) => {
                                            // console.log(checkwalletuser[0].status)
                                            if (checkwalletuser[0].status == 1) {
                                                db.collection('users').updateOne({
                                                    _id: user._id
                                                }, {
                                                    $set: {
                                                        "wallet": wallet
                                                    },
                                                }, { upsert: true })
                                            } else {
                                                error = 'Số tiền rút hơn 5 triệu đang chờ admin xử lý'
                                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                            }

                                        })

                                        db.collection('users').updateOne({
                                            _id: user._id
                                        }, {
                                            $set: {
                                                "wallet": wallet
                                            },
                                        }, { upsert: true })

                                        let mailOptions = {
                                            from: process.env.userMail,
                                            to: user.email,
                                            subject: "Withdraw Successfull",
                                            text: "Quý khách đã rút" + valuemoney + " VND về tài khoản thành công"

                                        }
                                        transporter.sendMail(mailOptions, function(err, success) {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log("Email send Succesfull")
                                            }

                                        })
                                        error = 'Số tiền rút hơn 5 triệu đang chờ admin xử lý'
                                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                    }
                                } else {
                                    error = 'Qúy khách đã hết lượt rút tiền vào hôm nay'
                                    res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                                }
                            } else {
                                error = 'Số tiền phải là bội của 50.000'
                                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                            }
                        }
                    } else {
                        error = 'Số CVV bị sai hoặc không hợp lệ'
                        res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                    }
                } else {
                    error = 'Ngày hết hạn bị sai hoặc không hợp lệ'
                    res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
                }
            } else {
                error = 'Thẻ không tồn tại'
                res.render('../views/withdraw-money/withdraw-money', { errorMessage: error })
            }

        }
    })


    // for (var x = 0; x < checkwithdraw.length; x++) {
    //     if (checkwithdraw[x].idUser == id && checkwithdraw[x].typetrade == "Rút tiền") {
    //         const datetmp = checkwithdraw[x].time.toString();
    //         const datetmp2 = datetmp.substring(0, datetmp.lastIndexOf(", "))
    //         if (datetmp2 == datareal) {
    //             const a = checkwithdraw[x]._id
    //             const b = await HistoryTrade.findOne({_id: a})

    //         }
    //     }

    // }
    // console.log(b)
    //   if(b){
    //       console.log("a")
    //   }else{
    //       console.log("check")
    //   }



}
exports.getSendMoney = async(req, res, next) => {
    res.render('../views/send-money/sendMoney');

}
exports.postSendMoney = async(req, res, next) => {

    let userpayfee;
    const { phone, note, valuemoney, payfee } = req.body;

    const id = mongoose.Types.ObjectId(req.user.id)
    // console.log(id);
    const obj_date = new Date();
    var feeuser = parseInt((valuemoney * 5) / 100)
    const date = obj_date.toLocaleString();
    var charset = "0123456789";
    var otp = "";
     db.collection('users').find({"_id":id}).toArray((err, user) => {
        if(user[0].phone ==  phone){
            error = 'Không thể tự chuyển cho chính mình'

            res.render('../views/send-money/sendMoney', {  errorMessage: error }); 
        }
    })
    db.collection('users').find({ "phone": phone }).toArray((err, user) => {
        if (parseInt(payfee) == 2) {
            userpayfee = mongoose.Types.ObjectId(req.user.id)
            console.log(userpayfee);

        } else {
            userpayfee = user[0]._id
            console.log(userpayfee);

        }
        // console.log(payfee);
        //     console.log("CHEC "+userpayfee);

        var check = parseInt(valuemoney) + parseInt((valuemoney * 5) / 100)
        const idReceiver = user[0]._id
        for (var y = 0; y < 6; y++) {
            otp += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        if (user[0]) {
            db.collection('users').find({ '_id': id }).toArray(async(err, result) => {
                if (check <= parseInt(result[0].wallet)) {

                    const wallet = result[0].wallet
                    var x = parseInt(wallet) - parseInt(valuemoney)
                    if (x >= 0) {
                        if (valuemoney <= 5000000) {
                            db.collection('historytrades').insertOne({
                                typetrade: "Chuyển tiền",
                                idUser: id,
                                value: valuemoney,
                                status: 0,
                                time: date,
                            })
                            db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Chuyển tiền' }, { "time": date }] }).toArray(async(err, historytrade) => {

                                db.collection('historysendmoneys').insertOne({
                                    idTrade: historytrade[0]._id,
                                    idReceiver: user[0]._id,
                                    note: note,
                                    time: date,
                                    userpayfee: userpayfee,
                                    fee: parseInt((valuemoney * 5) / 100)
                                })


                            })
                            db.collection('otps').insertOne({
                                idUser: req.user._id,
                                OTP: otp,
                                status: 0,
                                time: date,
                            })


                            error = 'Tìm kiếm người nhận thành công'

                            res.render('../views/send-money/sendMoney', { user: user[0], note, feeuser, valuemoney, errorMessage: error });
                        } else {
                            db.collection('historytrades').insertOne({
                                typetrade: "Chuyển tiền",
                                idUser: id,
                                value: valuemoney,
                                status: 0,
                                time: date,

                            })
                            db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'typetrade': 'Chuyển tiền' }, { "time": date }] }).toArray(async(err, historytrade) => {
                                if (parseInt(payfee) == 1) {
                                    userpayfee = id
                                } else {
                                    userpayfee = idReceiver

                                }
                                db.collection('historysendmoneys').insertOne({
                                    idTrade: historytrade[0]._id,
                                    idReceiver: user[0]._id,
                                    note: note,
                                    time: date,
                                    userpayfee: userpayfee,
                                    fee: parseInt((valuemoney * 5) / 100)
                                })
                            })
                            db.collection('otps').insertOne({
                                idUser: req.user._id,
                                OTP: otp,
                                status: 0,
                                time: date,
                            })
                            error = 'Số tiền của bạn không đủ'
                            res.render('../views/send-money/sendMoney', { user: user[0], feeuser, note, valuemoney, errorMessage: error });
                        }

                    } else {
                        error = 'Số tiền của bạn không đủ'
                        res.render('send-money/sendMoney', { errorMessage: error });
                    }
                } else {
                    error = 'Số tiền của bạn không đủ'
                    res.render('send-money/sendMoney', { errorMessage: error });
                }


            })


        } else {
            error = 'User không tồn tại'
            res.render('send-money/sendMoney', { errorMessage: error });
        }

    })



}
exports.getotp = async(req, res, next) => {

    const id = mongoose.Types.ObjectId(req.user.id)
    db.collection('otps').find({ "idUser": id }).toArray((err, result) => {



        if (result[0]) {
            let mailOptions = {
                from: process.env.userMail,
                to: req.user.email,
                subject: "OTP",
                text: "OTP:" + result[0].OTP

            }
            transporter.sendMail(mailOptions, function(err, success) {
                if (err) {
                    console.log(err)
                } else {

                    console.log("Email send Succesfull")
                }

            })
            res.render('../views/send-money/otp');

        } else {
            error = 'Nều không nhận được mã OTP thì nhấn resend OTP'
            res.render('../views/send-money/otp', { errorMessage: error });

        }

    })






}
exports.postotp = async(req, res, next) => {
    const { otp } = req.body;
    const id = mongoose.Types.ObjectId(req.user.id)

    db.collection('otps').find({ "idUser": id }).toArray((err, users) => {
        if (users[0]) {
            if (users[0].OTP == otp) {
                db.collection('historytrades').find({ $and: [{ 'idUser': id }, { 'status': 0 }] }).toArray((err, result) => {
                    db.collection('users').find({ '_id': id }).toArray(async(err, walletusers) => {
                        db.collection('historysendmoneys').find({ "idTrade": result[0]._id }).toArray((err, data) => {

                            if (result[0].value <= 5000000) {
                                db.collection('users').find({ "_id": data[0].userpayfee }).toArray((err, payfee) => {
                                    
                                    // var feesendmoney = parseInt(payfee[0].wallet) - parseInt(data[0].fee)

                                    // db.collection('users').updateOne({

                                    //     _id: data[0].userpayfee
                                    // }, {
                                    //     $set: {
                                    //         "wallet": feesendmoney
                                    //     },
                                    // }, {
                                    //     upsert: true
                                    // })


                                    db.collection('users').find({ "_id": result[0].idUser }).toArray((err, usersender) => {
                                        var wallersender = parseInt(usersender[0].wallet) - parseInt(result[0].value)
                                        db.collection('users').updateOne({

                                            _id: usersender[0]._id
                                        }, {
                                            $set: {
                                                "wallet": wallersender
                                            },
                                        }, {
                                            upsert: true
                                        })
                                        db.collection('users').find({ "_id": data[0].idReceiver }).toArray((err, userReceiver) => {
                                            var walletReceiver = parseInt(userReceiver[0].wallet) + (parseInt(result[0].value) - parseInt(data[0].fee))
                                            db.collection('users').updateOne({

                                                _id: userReceiver[0]._id
                                            }, {
                                                $set: {
                                                    "wallet": walletReceiver
                                                },
                                            }, {
                                                upsert: true
                                            })



                                            db.collection('historytrades').updateOne({
                                                _id: result[0]._id
                                            }, {
                                                $set: {
                                                    "status": 1
                                                },
                                            }, { upsert: true })





                                            var wallet = parseInt(walletusers[0].wallet) - parseInt(result[0].value)
                                            if (wallet >= 0) {
                                                db.collection('users').updateOne({
                                                    _id: id
                                                }, {
                                                    $set: {
                                                        "wallet": wallet
                                                    }

                                                }, { upsert: true })
                                            }
                                            db.collection('otps').deleteOne({
                                                "idUser": id
                                            })

                                            let mailOptions = {
                                                from: process.env.userMail,
                                                to: userReceiver[0].email,
                                                subject: "Nhận Tiền Chuyển Khoản Từ" + usersender[0].name,
                                                text: "Quý khách vừa nhận được " + (result[0].value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),

                                            }
                                            transporter.sendMail(mailOptions, function(err, success) {
                                                if (err) {
                                                    console.log(err)
                                                } else {

                                                    console.log("Email send Succesfull")
                                                }

                                            })
                                        })

                                    })

                                })


                                return res.redirect("/");

                            } else {
                                db.collection('historytrades').updateOne({
                                    _id: result[0]._id
                                }, {
                                    $set: {
                                        "status": -1
                                    },
                                }, { upsert: true })
                                db.collection('otps').deleteOne({
                                    "idUser": id
                                })

                                db.collection('users').find({ "_id": result[0].idUser }).toArray((err, usersender) => {
                                    db.collection('users').find({ "_id": data[0].idReceiver }).toArray((err, userReceiver) => {

                                        let mailOptions = {
                                            from: process.env.userMail,
                                            to: userReceiver[0].email,
                                            subject: "Nhận Tiền Chuyển Khoản Từ" + usersender[0].name,
                                            text: "Quý khách vừa nhận được " + (result[0].value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),

                                        }
                                        transporter.sendMail(mailOptions, function(err, success) {
                                            if (err) {
                                                console.log(err)
                                            } else {

                                                console.log("Email send Succesfull")
                                            }

                                        })
                                    })


                                })

                                return res.redirect("/");
                            }


                        })
                    })





                })





            } else {
                error = 'OTP sai'
                res.render('../views/send-money/otp', { errorMessage: error });
            }

        } else {
            error = 'OTP không tồn tại'
            res.render('../views/send-money/otp', { errorMessage: error });

            // }
        }
    })



}

exports.getresendOTP = async(req, res, next) => {
    res.render('../views/send-money/otp');

}
exports.postresendOTP = async(req, res, next) => {

    const id = mongoose.Types.ObjectId(req.user.id)
    const date_obj = new Date()
    const date = date_obj.toLocaleString()
    var otp = "";
    var charset = "0123456789";
    for (var y = 0; y < 6; y++) {
        otp += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    db.collection('otps').find({ "idUser": id }).toArray((err, users) => {
        db.collection('otps').deleteOne({
            _id: users[0]._id
        })
        db.collection('otps').insertOne({
            idUser: req.user._id,
            OTP: otp,
            status: 0,
            time: date,
        })



        let mailOptions = {
            from: process.env.userMail,
            to: req.user.email,
            subject: "OTP",
            text: "OTP:" + otp

        }
        transporter.sendMail(mailOptions, function(err, success) {
            if (err) {
                console.log(err)
            } else {

                console.log("Email send Succesfull")
            }

        })

        res.render('../views/send-money/otp');
    })


}
exports.getBuyCard = async(req, res, next) => {
    res.render('../views/buy-card/index');

}
exports.postBuyCard = async(req, res, next) => {
    const { card, ten, twenty, fity, onehun } = req.body;
    
    const id = req.user._id
    const date_obj = new Date()
    const date = date_obj.toLocaleString();
    const user = await User.find({ id })

    var wallet = parseInt(user[0].wallet)

    if (!card) {
        error = 'Vui lòng chọn nhà mạng'
        res.render('../views/buy-card/index', { errorMessage: error });
    }else{
        if (ten && ten != 0) {
            checkten = ten
        } else {
            checkten = '0'
        }
        if (twenty) {
            checktwenty = twenty
        } else {
            checktwenty = '0'
        }
        if (fity) {
            checkfity = fity
        } else {
            checkfity = '0'
        }
        if (onehun) {
            checkonehun = onehun
        } else {
            checkonehun = '0'
        }
    
        var total = parseInt(checkten) + parseInt(checktwenty) + parseInt(checkfity) + parseInt(checkonehun)
        const checktotal = checkten + checktwenty + checkfity + checkonehun
    
        if (wallet > 0) {
            if (total <= 5) {
    
                if (parseInt(checkten) >= 0 || parseInt(checkten) <= 5) {
                    var tendb = parseInt(checkten) * 10000
                    if (parseInt(checktwenty) >= 0 || parseInt(checktwenty) <= 5) {
                        var twentydb = parseInt(checktwenty) * 20000
                        if (parseInt(checkfity) >= 0 || parseInt(checkfity) <= 5) {
    
                            var fitydb = parseInt(checkfity) * 50000
    
                            if (parseInt(checkonehun) >= 0 || parseInt(checkonehun) <= 5) {
    
                                var onehundb = parseInt(checkonehun) * 100000
                            } else {
                                onehundb = parseInt(0)
                            }
                        } else {
                            fitydb = parseInt(0)
                        }
                    } else {
                        twentydb = parseInt(0)
                    }
    
                } else {
                    tendb = parseInt(0)
                }
                var totalCheck = tendb + twentydb + fitydb + onehundb
                    // console.log(wallet)
                    // console.log(totalCheck)
                if (totalCheck <= wallet && wallet >= 0) {
                    var x = wallet - totalCheck;
                    db.collection('historytrades').insertOne({
                        idUser: req.user._id,
                        typetrade: "Mua thẻ điện thoại",
                        value: totalCheck,
                        time: date,
                        status: 1
                    })
    
    
                    db.collection('users').updateOne({
                        _id: user[0]._id
                    }, {
                        $set: {
                            "wallet": x,
                        },
                    }, { upsert: true })
                    const value = checktotal.split('');
    
                    error = 'Thành công'
                    res.render('../views/buy-card/index', { errorMessage: error });
                    var idCard = ""
    
                    if (card == "vietel") {
                        idCard = "11111"
                    }
                    if (card == "mobiphone") {
                        idCard = "22222"
    
                    }
                    if (card == "vinaphone") {
                        idCard = "33333"
    
                    }
                    // console.log(idCard)
                    var charset = "0123456789";
                    var arraylist = []
    
    
                    let html = '<table border="1" style="border-collapse:collapse";><th>Nhà Mạng</th><th>Mệnh Giá</th><th>Số lượng</th><th>Mã thẻ</th><th>Thành tiền</th>'
    
                    for (let i = 0; i < value.length; i++) {
                        html += '<tr>'
    
                        if (value[i] != 0) {
    
    
                            if (i == 0) {
                                denom = 10000 * parseInt(value[i])
                                if (value[i] == 1) {
                                    for (var y = 0; y < 5; y++) {
                                        idCard += charset.charAt(Math.floor(Math.random() * charset.length));
                                    }
                                    arraylist.push(idCard)
    
                                    html += '<td>' + card + '</td>' + '<td>' + 10000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + idCard + '</td>' + '<td>' + denom + '</td>'
                                } else {
                                    var j = []
                                    for (var p = 0; p < value[i]; p++) {
                                        for (var y = 0; y < 5; y++) {
    
                                            idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                        }
    
                                        // console.log(idCard)
                                        j.push(idCard)
                                        if (j[p].length > 10) {
                                            j[p] = j[p].toString();
                                            const first = j[p].substring(0, 5)
                                            const last = j[p].substring(j[p].length - 5, j[p].length)
                                            j[p] = first + last
    
                                            arraylist.push(j[p])
                                        } else {
                                            arraylist.push(idCard)
                                        }
    
                                    }
                                    if (j[0]) {
                                        html += '<td rowspan="' + value[i] + '">' + card + '</td>' + '<td rowspan="' + value[i] + '">' + 10000 + '</td>' + '<td rowspan="' + value[i] + '">' + value[i] + '</td>' + '<td>' + j[0] + '</td>' + '<td rowspan="' + value[i] + '">' + denom + '</td></tr>'
    
                                    }
                                    var lengthArr = parseInt(checkten)
                                    for (var xo = 1; xo < lengthArr; xo++) {
                                        if (j[xo]) {
                                            html += '<tr><td>' + j[xo] + '</td></tr>'
                                        }
                                    }
                                }
                            }
                            if (i == 1) {
                                denom = 20000 * parseInt(value[i])
                                if (value[i] == 1) {
                                    for (var y = 0; y < 5; y++) {
                                        idCard += charset.charAt(Math.floor(Math.random() * charset.length));
                                    }
    
    
                                    if (idCard.length > 10) {
                                        const first = idCard.substring(0, 5)
                                        const last = idCard.substring(idCard.length - 5, idCard.length)
                                        Card = first + last
                                        arraylist.push(Card)
    
                                        html += '<td>' + card + '</td>' + '<td>' + 20000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + Card + '</td>' + '<td>' + denom + '</td>'
    
                                    } else {
                                        html += '<td>' + card + '</td>' + '<td>' + 20000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + idCard + '</td>' + '<td>' + denom + '</td>'
    
                                    }
    
    
                                } else {
                                    var j = []
                                    for (var p = 0; p < value[i]; p++) {
                                        for (var y = 0; y < 5; y++) {
    
                                            idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                        }
                                        j.push(idCard)
                                        if (j[p].length > 10) {
                                            j[p] = j[p].toString();
                                            const first = j[p].substring(0, 5)
                                            const last = j[p].substring(j[p].length - 5, j[p].length)
                                            j[p] = first + last
    
                                            arraylist.push(j[p])
    
                                        } else {
                                            arraylist.push(idCard)
    
                                        }
                                    }
    
                                    if (j[0]) {
                                        html += '<td rowspan="' + value[i] + '">' + card + '</td>' + '<td rowspan="' + value[i] + '">' + 20000 + '</td>' + '<td rowspan="' + value[i] + '">' + value[i] + '</td>' + '<td>' + j[0] + '</td>' + '<td rowspan="' + value[i] + '">' + denom + '</td></tr>'
                                    }
                                    var twentylenght = parseInt(checktwenty)
                                    for (var xo = 1; xo < twentylenght; xo++) {
                                        if (j[xo]) {
                                            html += '<tr><td>' + j[xo] + '</td></tr>'
                                        }
                                    }
    
    
    
                                }
    
    
                            }
    
                            if (i == 2) {
                                denom = 50000 * parseInt(value[i])
                                if (value[i] == 1) {
                                    for (var z = 0; z < 5; z++) {
                                        idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                    }
    
                                    if (idCard.length > 10) {
                                        const first = idCard.substring(0, 5)
                                        const last = idCard.substring(idCard.length - 5, idCard.length)
                                        Card = first + last
    
                                        arraylist.push(Card)
    
                                        html += '<td>' + card + '</td>' + '<td>' + 50000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + Card + '</td>' + '<td>' + denom + '</td>'
    
                                    } else {
    
                                        html += '<td>' + card + '</td>' + '<td>' + 50000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + idCard + '</td>' + '<td>' + denom + '</td>'
                                    }
    
                                } else {
                                    var j = []
                                    for (var p = 0; p < value[i]; p++) {
                                        for (var y = 0; y < 5; y++) {
    
                                            idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                        }
                                        j.push(idCard)
                                        if (j[p].length > 10) {
                                            j[p] = j[p].toString();
                                            const first = j[p].substring(0, 5)
                                            const last = j[p].substring(j[p].length - 5, j[p].length)
                                            j[p] = first + last
    
                                            arraylist.push(j[p])
    
                                        } else {
                                            arraylist.push(idCard)
    
                                        }
                                    }
    
                                    if (j[0]) {
                                        html += '<td rowspan="' + value[i] + '">' + card + '</td>' + '<td rowspan="' + value[i] + '">' + 50000 + '</td>' + '<td rowspan="' + value[i] + '">' + value[i] + '</td>' + '<td>' + j[0] + '</td>' + '<td rowspan="' + value[i] + '">' + denom + '</td></tr>'
                                    }
                                    var fitylenght = parseInt(checkfity)
                                    for (var xo = 1; xo < fitylenght; xo++) {
                                        if (j[xo]) {
                                            html += '<tr><td>' + j[xo] + '</td></tr>'
                                        }
                                    }
                                }
                            }
    
                            if (i == 3) {
                                denom = 100000 * parseInt(value[i])
                                if (value[i] == 1) {
                                    for (var q = 0; q < 5; q++) {
                                        idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                    }
    
                                    if (idCard.length > 10) {
                                        const first = idCard.substring(0, 5)
                                        const last = idCard.substring(idCard.length - 5, idCard.length)
                                        Card = first + last
                                        arraylist.push(Card)
    
                                        html += '<td>' + card + '</td>' + '<td>' + 100000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + Card + '</td>' + '<td>' + denom + '</td>'
    
                                    } else {
                                        html += '<td>' + card + '</td>' + '<td>' + 100000 + '</td>' + '<td>' + value[i] + '</td>' + '<td>' + idCard + '</td>' + '<td>' + denom + '</td>'
                                    }
    
                                } else {
                                    var j = []
                                    for (var p = 0; p < value[i]; p++) {
                                        for (var y = 0; y < 5; y++) {
    
                                            idCard += charset.charAt(Math.floor(Math.random() * charset.length));
    
                                        }
                                        j.push(idCard)
                                        if (j[p].length > 10) {
                                            j[p] = j[p].toString();
                                            const first = j[p].substring(0, 5)
                                            const last = j[p].substring(j[p].length - 5, j[p].length)
                                            j[p] = first + last
    
                                            arraylist.push(j[p])
    
                                        } else {
                                            arraylist.push(idCard)
    
                                        }
                                    }
    
                                    if (j[0]) {
                                        html += '<td rowspan="' + value[i] + '">' + card + '</td>' + '<td rowspan="' + value[i] + '">' + 50000 + '</td>' + '<td rowspan="' + value[i] + '">' + value[i] + '</td>' + '<td>' + j[0] + '</td>' + '<td rowspan="' + value[i] + '">' + denom + '</td></tr>'
                                    }
                                    var onehunlenght = parseInt(checkonehun)
                                    for (var xo = 1; xo < onehunlenght; xo++) {
                                        if (j[xo]) {
                                            html += '<tr><td>' + j[xo] + '</td></tr>'
                                                // console.log(j[xo])
    
                                        }
                                    }
    
    
    
                                }
    
                            }
    
    
                        }
    
    
                        html += '</tr>'
                    }
                    html += '</table>'
    
                    // console.log(arraylist)
                    const check = await HistoryTrade.find()
    
                    for (var i = 0; i < check.length; i++) {
                        if (check[i].idUser == id && check[i].time == date) {
                            db.collection('historybuycards').insertOne({
                                idTrade: check[i]._id,
                                SupplyCard: card,
                                total: totalCheck,
                                time: date,
                                denominations: checktotal,
                                idCard: arraylist,
    
                            })
                        }
                    }
                    let mailOptions = { 
                        from: process.env.userMail,
                        to: req.user.email,
                        subject: "Mua thẻ điện thoại thành công",
                        text: "Hello " + user[0].name,
                        html: html
                    }
                    transporter.sendMail(mailOptions, function(err, success) {
                        if (err) {
                            console.log(err)
                        } else {
    
                            console.log("Email send Succesfull")
                        }
    
                    })
    
    
    
                } else {
                    error = 'Tài khoản quý khách không đủ để thực hiện giao dịch.Vui lòng nạp thêm'
                    res.render('../views/buy-card/index', { errorMessage: error });
                }
            } else {
                error = 'Qúy khách chỉ được giao dịch tối đa 5 thẻ/1 lần'
                res.render('../views/buy-card/index', { errorMessage: error });
            }
    
    
    
        } else {
            error = 'Tài khoản quý khách hiện còn 0  vui lòng nạp thêm'
            res.render('../views/buy-card/index', { errorMessage: error });
        }
    
    }

   


}
exports.getChangePass = async(req, res, next) => {
    res.render('../views/change_pass', { newpass: '', cfmpass: '', infor: req.user })

}