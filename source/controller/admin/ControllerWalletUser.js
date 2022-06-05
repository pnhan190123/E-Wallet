var db = require('../../config/db')
const mongoose = require("mongoose");
const HistoryTrade = require('../../models/historytrade')
exports.getWalletListTrade = async(req, res) => {

    db.collection('historytrades').find({ "status": -1 }).toArray(async(err, result) => {
        if (result[0]) {
            const idUser = result[0].idUser
            db.collection('users').find({ $and: [{ "_id": idUser }, { role: "user" }] }).toArray(async(err, result1) => {
                if (result1[0]) {
                    const x = result1[0].name
                    res.render('../views/admin/wallet/listTrade', { data: result, name: x })

                } else {
                    const x = 0
                    res.render('../views/admin/wallet/listTrade', { data: result, name: x })

                }

            })

        } else {
            const idUser = 0
            db.collection('users').find({ "_id": idUser }).toArray(async(err, result1) => {
                res.render('../views/admin/wallet/listTrade', { data: [] })

            })

        }


    })
}
exports.getAceptWalletTrade = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    db.collection('historytrades').updateOne({
        _id: id
    }, {
        $set: {
            "status": 1
        }
    }, {
        upsert: true
    })
    const idTrade = await HistoryTrade.findOne({ "_id": id })
    const iduser = mongoose.Types.ObjectId(idTrade.idUser)

    db.collection('historysendmoneys').find({ "idTrade": idTrade._id }).toArray((err, result) => {
        db.collection('users').find({ "_id": result[0].userpayfee }).toArray((err, userpay) => {
            var total = parseInt(userpay[0].wallet) - (parseInt(result[0].fee))
            db.collection('users').updateOne({
                _id: result[0].userpayfee
            }, {
                $set: {
                    "wallet": total
                }
            }, {
                upsert: true
            })
            db.collection('users').find({ "_id": result[0].idReceiver }).toArray((err, receiver) => {

                var walletReceiver = parseInt(receiver[0].wallet) + parseInt(idTrade.value)
                db.collection('users').updateOne({
                    _id: result[0].idReceiver
                }, {
                    $set: {
                        "wallet": walletReceiver
                    }
                }, {
                    upsert: true
                })
            })
            db.collection('users').find({ "_id": iduser }).toArray((err, resultsender) => {
                var walletsender = parseInt(resultsender[0].wallet) - parseInt(idTrade.value)
                db.collection('users').updateOne({
                    _id: iduser
                }, {
                    $set: {
                        "wallet": walletsender
                    }
                }, {
                    upsert: true
                })
            })


        })
    })

    return res.redirect('/admin/wallet/listTrade')
}
exports.getListWalletDone = async(req, res) => {
    db.collection('historytrades').find({ "status": 1 }).toArray(async(err, result) => {
        if (result[0]) {
            const idUser = result[0].idUser
            db.collection('users').find({ $and: [{ "_id": idUser }, { role: "user" }] }).toArray(async(err, result1) => {
                if (result1[0]) {
                    const x = result1[0].name
                    res.render('../views/admin/wallet/done', { data: result, name: x })

                } else {
                    const x = 0
                    res.render('../views/admin/wallet/done', { data: result, name: x })

                }

            })

        } else {
            const idUser = 0
            db.collection('users').find({ "_id": idUser }).toArray(async(err, result1) => {
                res.render('../views/admin/wallet/done', { data: result })

            })

        }


    })
}
exports.getListWalletHistory = async(req, res) => {
    db.collection('historytrades').find({}).toArray((err, userresult) => {
        if (userresult.length) {


            res.render('../views/admin/wallet/historyTrade', { data: userresult })



        } else {
            res.render('../views/admin/wallet/historyTrade', { data: [] })
        }

    })
}