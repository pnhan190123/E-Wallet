const User =  require('../models/user')
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require('jsonwebtoken')


var db =  require('../config/db')


let transporter =  require('../middlewares/transporter');
const { isFresher } = require('../middlewares/auth');
exports.getRegiter = (req, res, next) =>{
    res.render("../views/register");
}
exports.getLogin =  async(req, res, next)=>{
    
    const text = "123456";
    
    const hashedPassword = await bcrypt.hash(text, 10);

    db.collection('users').find({$and:[{"username":"admin"},{ "role": "admin" }]}).toArray(async(err, result) => {
        if(result[0]){
            console.log(result[0]);
            console.log("Exist");
        }
        else if(!result[0]){
                db.collection('users').insertOne({
                    "username": "admin",
                    "password": hashedPassword,
                    "role": "admin",
                    "name": "admin",
                 
                })
                
            }

    })

            

    res.render("../views/login");
}
exports.postRegister = async(req, res, next)=>{

    const userFound = await User.findOne({ email: req.body.email });
    const checkphone = await User.findOne({ phone: req.body.phone });

    // console.log(userFound)

    const email =  req.body.email
    const phone =  req.body.phone

    // console.log(req.body.phone)
    const date_obj = new Date();
    const date = date_obj.toLocaleString()
    if(userFound){
        return res.json({msg:'Email đã tồn tại', success: false})

     }
     if(checkphone){
        return res.json({msg:'Phone đã tồn tại', success: false})

     }else{

   

    
    
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        }
        var tmp = "";
        var charset = "0123456789";
        for (var y = 0; y < 10; y++) {
            tmp += charset.charAt(Math.floor(Math.random() * charset.length));
        }

       
        const hashedPassword = await bcrypt.hash(text, 10);

        // try {
            db.collection('users').insertOne({
                "phone": req.body.phone,
                "email": req.body.email,
                "name": req.body.name,
                "birthday": req.body.birthday,
                "address": req.body.address,
                "username": tmp,
                "password": hashedPassword,
                "active": 0,
                "Nchangepass": 0,
                "Avatar": "",
                "wallet":0,
                "role": 'Fresher',
                "time": date,
                "announcement": 0,
                "OnCard": req.body.OnCard,
                "BottomCard": req.body.BottomCard,
            },(error, result)=>{
                 if(error){
                        console.log(error);
                        return res.json({msg:'Đăng kí thất bại', success: false})

                }else{
                    let mailOptions = {
                        from: process.env.userMail,
                        to: email,
                        subject: "Varity Account",
                        text: "Account:" + tmp +
                            "\nPassword:" + text
        
                    }
                    transporter.sendMail(mailOptions, function(err, success) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Email send Succesfull")
                        }
        
                    })
        
               
                    return res.json({msg: 'Đăng kí thành công', success: true})

                }
            })
           
     }  
          
        // } catch (error) {
        //     console.log(error);
        //     res.redirect("/users/register");
        // }
    
}
exports.postLogin =  async(req, res)=>{
    // const { username, password } = req.body;
    //     if (!username) {
    //         error = "Username is not null"
    
    //     }
    //     if (!passport) {
    //         error = "Password is not null"
    //     }
    //     db.collection('users').find({ "username": username }).toArray(async(err, result) => {
    //         if (result[0]) {
    //             const checkpass = await bcrypt.compare(password, result[0].password)
    //             if (!checkpass) {
    
    //                 error = "Sai mật khẩu"
    //                 if (i < 😎 {
    //                     i++;
    
    //                 }
    //                 if (i > 😎 {
    //                     i = 8
    //                 }
                  
    //                 if (error) {
    
    //                     res.render('../views/login', { user: result[0], errorMessage: error });
    
    //                     // console.log(i)
    
    //                     // db.collection('users').updateOne({
    //                     //     _id: result[0]._id
    //                     // }, {
    //                     //     $set: {
    //                     //         "loginfail": i
    //                     //     },
    //                     // }, { upsert: true })
    //                     // if (i == 3) {
    //                     //     db.collection('users').updateOne({
    //                     //         _id: result[0]._id
    //                     //     }, {
    //                     //         $set: {
    //                     //             "abnormallogin": 1
    //                     //         },
    //                     //     }, { upsert: true })
    //                     // }
    
    //                 }
    //             } else {
                    passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/users/login',
                        failureFlash: true
                    })(req, res); // <---- ADDD THIS
        //         }
    
        //     } else {
        //         error = 'User không tồn tại'
        //         res.render('login', { user: "", errorMessage: error });
        //     }
    
        // })
}
exports.getProfile = (req, res, next)=>{
        res.render("../views/profile", { infor: req.user });


}
exports.getbottomCard = (req, res, next)=>{
        res.render("../views/profile");

}
exports.postbottomCard = async(req, res, next)=>{
        const finduser = req.user._id
        const check =  req.body.imgBack
      
            db.collection('users').updateOne({
                _id: finduser
            }, {
                $set: {
                    "BottomCard": check
                },
            }, { upsert: true }, (err, result)=>{
                if(err){
                    console.log(err)
                    return res.json({msg:'Đăng kí thất bại', success: false})
                }
                return res.json({msg: 'Đăng kí thành công', success: true})
            })
    
            // res.redirect('/users/profile')
    
    
        
  

}
exports.getOnCard =  (req, res, next)=>{
    res.render("../views/profile");

}
exports.postOnCard = async(req, res, next)=>{
        const finduser = req.user._id
        const check =  req.body.imgOn
      
            db.collection('users').updateOne({
                _id: finduser
            }, {
                $set: {
                    "OnCard": check
                },
            }, { upsert: true }, (err, result)=>{
                if(err){
                    console.log(err)
                    return res.json({msg:'đăng kí thất bại', success: false})
                }
                return res.json({msg: 'Đăng kí thành công', success: true})
            })
    
            // res.redirect('/users/profile')
    
  

}
exports.postAvatar =  async(req, res)=>{
    const finduser = req.user._id
    const check =  req.body.Avatar
  
        db.collection('users').updateOne({
            _id: finduser
        }, {
            $set: {
                "Avatar": check
            },
        }, { upsert: true }, (err, result)=>{
            if(err){
                console.log(err)
                return res.json({msg:'Đăng kí thất bại', success: false})
            }
            return res.json({msg: 'Đăng kí thành công', success: true})
        })

        // res.redirect('/users/profile')

}
exports.postChangePass = async(req, res)=>{
        const finduser = req.user._id
        const userFound = await User.findOne({ finduser });
        const { pass, newpass, cfmpass } = req.body

        if (req.user.Nchangepass == 0) {
            const hashedPassword = await bcrypt.hash(newpass, 10);


            if (newpass === cfmpass) {
                db.collection('users').updateOne({
                    _id: finduser
                }, {
                    $set: {
                        "password": hashedPassword,
                        "Nchangepass": 1,
                    },
                }, { upsert: true })

                res.redirect('/')
            } else {
                error = 'Password not match confirm password'
                res.render('change_pass', { errorMessage: error })
            }
        } else {

            if (await bcrypt.compare(pass, userFound.password)) {
                if (newpass === cfmpass) {
                    const hashnewpass = await bcrypt.hash(newpass, 10);
                    db.collection('users').updateOne({
                        _id: finduser
                    }, {
                        $set: {
                            "password": hashnewpass,
                        },
                    }, { upsert: true })

                    res.redirect('/')
                } else {
                    error = 'Password not match confirm password'
                    res.render('change_pass', { errorMessage: error })
                }
            } else {
                error = 'Password not match present password'
                res.render('change_pass', { errorMessage: error, infor: req.user })
            }
        }

}
exports.getLogout = async(req, res)=>{
    User.findById(req.user._id).then((rUser)=>{
        rUser.online = false;
        rUser.save();
        });
      req.logout();
      res.redirect("/");
}
exports.getForgotPassword =  async(req, res)=>{
        res.render("../views/forgot-password")

}
exports.postForgotPassword =  async(req, res)=>{
    const { email } = req.body;
        const userFound = await User.findOne({ email });
    
        if (!userFound) {
            res.send('User not register')
            return
        } else {
            const secret = process.env.JWT_SECRET + userFound.password
            const payload = {
                email: userFound.email,
                id: userFound._id
            }
    
            const token = jwt.sign(payload, secret, { expiresIn: '15m' })
            const linkreset = `http://127.0.0.1:`+ process.env.PORT +`/users/reset-password/${userFound._id}/${token}`
            console.log(linkreset)
            let mailOptions = {
                from: process.env.userMail,
                to: email,
                subject: "Recover Password",
                html: "<a href ='" + linkreset + "'>Click to reset your password</a>"
    
    
            }
            transporter.sendMail(mailOptions, function(err, success) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Email send Succesfull")
                }
    
            })
            res.send('Password had been reset, please check the link in your email');
    
        }
}
exports.getresetPass =  async(req, res)=>{
    const { id, token } = req.params
        const userFound = await User.findOne({ id });
    
        if (!userFound) {
            res.send('Ivalid id...')
            return
        } else {
            const secret = process.env.JWT_SECRET + userFound.password;
            try {
                const payload = jwt.verify(token, secret)
                res.render('reset-password', { email: userFound.email })
            } catch (error) {
                console.log(error.message)
                res.send(error.message)
    
            }
        }
}
exports.postresetPass =  async(req, res)=>{
    const { pass, cfmpass } = req.body;

        const { id, token } = req.params
        const userFound = await User.findOne({ id });
    
        if (!userFound) {
            res.send('Ivalid id...')
            return
        } else {
            if (pass !== cfmpass) {
                req.flash("error", "Password not match");
    
    
            } else {
                const hashedPassword = await bcrypt.hash(pass, 10);
                console.log(hashedPassword)
                const secret = process.env.JWT_SECRET + userFound.password;
                try {
                    const payload = jwt.verify(token, secret)
                        // userFound.password =  hashedPassword;
    
                    db.collection('users').updateOne({
                        _id: userFound._id
                    }, {
                        $set: {
                            "password": hashedPassword,
                        },
                    }, { upsert: true })
    
                    res.redirect('/')
    
                } catch (error) {
                    console.log(error.message)
                    res.send(error.message)
    
                }
    
            }
    
        }
}