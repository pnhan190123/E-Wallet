const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { render } = require("ejs");
const { db } = require("./models/user");

function initialize(passport, getUserByUsername, getUserById, x = 0) {
    const authenticateUser = async(username, password, done) => {
        const user = await getUserByUsername(username);
        // console.log(user)
        if (user == null) {
            return done(null, false, { message: "Tài Khoản Không Tồn Tại" });
        }


        try {
            if(user.role != "admin"){
                if( (user.loginfail == 8)||(user.active == 3 )) {

                    return done(null, false, { message: "Tài Khoản Bị Khóa Vĩnh Viễn" });
                }
                if(user.active == 2){
                    return done(null, false, { message: "Account be disable! Please contact admin"});
    
                }
    
                if (await bcrypt.compare(password, user.password)) {
    
    
                    db.collection('users').updateOne({
                        _id: user._id
                        
                    }, {
                        $set: {
                            "loginfail": 0
                        },
                    }, { upsert: true })
                    return done(null, user);
    
                } else {
    
                    x += 1
                    if (x > 0 && x <= 8) {
    
                        if( x <= 3 ||  x >=5 && x < 8){
                            db.collection('users').updateOne({
                            _id: user._id
                        }, {
                            $set: {
                                "loginfail": x
                            },
                        }, { upsert: true })
                        
                        return done(null, false, { message: "Sai Mật Khẩu" });
                        }
                      
                        if (user.loginfail == 3 && x == 4) {
                          db.collection('users').updateOne({
                              _id: user._id
                          }, {
                              $set: {
                                "loginfail": x,
                                "abnormallogin": 1
                              },
                          }, { upsert: true })
                          return done(null, false, { message: "Tài Khoản Bị Khóa 1 Phút!!" });
      
                          
      
                      }
                      if(x == 8 && user.loginfail == 7){
                        db.collection('users').updateOne({
                          _id: user._id
                      }, {
                          $set: {
                            "loginfail": x,
                          },
                      }, { upsert: true })
                      return done(null, false, { message: "Tài Khoản Bị Khoá Vĩnh Viễn" });
                      } if(x > 8){
                        x = 8
                      }
      
                    }
                }
            }else{
                if (await bcrypt.compare(password, user.password)) {
    
    
               
                    return done(null, user);
    
                }else{
                    return done(null, false, { message: "Sai mật khẩu" });

                }
            }

          


        } catch (err) {
            return done(err);
        }


    };



    passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async(id, done) => {
        return done(null, await getUserById(id));
    });
}


module.exports = initialize;