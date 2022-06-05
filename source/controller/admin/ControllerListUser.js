var db =  require('../../config/db')
const mongoose = require("mongoose");
const User =  require('../../models/user');
exports.getHome = async(req, res)=>{
        db.collection('users').find({$and :[{"active": 0 }, {'role': 'Fresher'}]}).toArray((err, result)=>{
            res.render('../views/admin/index', {user: result.length});

        })

    
}


exports.getviewDetailUser =  async(req, res)=>{
    const id = mongoose.Types.ObjectId(req.params.id)

    const user = await User.findOne({ _id: id })
    res.render('../views/admin/listActive/DetailUser', {infor: user})
}
exports.acceptIdCard =  async(req, res)=>{
    const id = mongoose.Types.ObjectId(req.params.id)

    if (id) {
        const user = await User.findOne({ _id: id })
        db.collection('users').updateOne({
            _id: user._id
        }, {
            $set: {
                "announcement": 0,
                // "active": 1
            }
        }, {
            upsert: true
        })
        return res.redirect('/admin/viewDetailUser/'+id);
    } else {
        res.send("User không tồn tại")
    }    
    // res.render('../views/admin/listActive/DetailUser', {infor: user})
}
exports.getWaitingLine =  async(req, res)=>{
    db.collection('users').find({$and :[{"active": 0 }, {'role': 'Fresher'}]}).toArray(async(err, result) => {
        res.render('../views/admin/listActive/index', { user: result })
    })

}

exports.getAceptWaitingline =  async(req, res)=>{
        const id = mongoose.Types.ObjectId(req.params.id)
        if (id) {
            const user = await User.findOne({ _id: id })
            db.collection('users').updateOne({
                _id: user._id
            }, {
                $set: {
                    "announcement": 0,
                    "active": 1,
                    "role":"user",
                }
            }, {
                upsert: true
            })
            return res.redirect('/admin/listActive/waiting-line')
        } else {
            res.send("User không tồn tại")
        }
}
exports.getDisableWaitingLine =  async(req, res)=>{
        const id = mongoose.Types.ObjectId(req.params.id)
        if (id) {
            const user = await User.findOne({ _id: id })
            db.collection('users').updateOne({
                _id: user._id
            }, {
                $set: {
                    "active": 2
                }
            }, { upsert: true })
        }
        return res.redirect('/admin/listActive/disable')
}
exports.getSupplyIdCard =  async(req, res)=>{
    const id_user = mongoose.Types.ObjectId(req.params.id)
    if (id_user) {
        const user = await User.findOne({ _id: id_user })
        db.collection('users').updateOne({
            _id: user._id
        }, {
            $set: {
                "announcement": 1,
            }
        }, {
            upsert: true
        })
        return res.redirect('/admin/viewDetailUser/'+id_user);
    } else {
        res.send("Nguời dùng không tồn tại")
    }
}
exports.getListActiveDone =  async(req, res)=>{
    db.collection('users').find({$and:[{'role': "user"},{ 'active': 1 }]}).toArray(async(err, result) => {
        res.render("../views/admin/listActive/done", { user: result })

    })
}
exports.getListDisable = async(req, res)=>{
    db.collection('users').find({$and:[{'role': "user"},{ 'active': 2 }]}).toArray(async(err, result) => {
        res.render('../views/admin/listActive/disable', { user: result })

    })
}
exports.getBlockUser =  async(req, res)=>{
    const id_user = mongoose.Types.ObjectId(req.params.id)
    if (id_user) {
        const user = await User.findOne({ _id: id_user })
        db.collection('users').updateOne({
            _id: user._id
        }, {
            $set: {
                "active": 3
            }
        }, {
            upsert: true
        })
        return res.redirect('/admin/listActive/block');
    } else {
        res.send("Nguời dùng không tồn tại")
    }
}
exports.getListBlock = async(req, res)=>{

    db.collection('users').find({ $or : [{'loginfail': 8 },{active: 3} ] }).toArray(async(err, result) => {
        res.render('../views/admin/listActive/block', { user: result })

    })
}
