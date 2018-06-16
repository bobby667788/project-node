var User=require('../models/user.js');
var localstrategy = require('passport-local').Strategy;
var bcrypt=require('bcryptjs');

module.exports=function(passport){
    
    passport.use(new localstrategy(function(username,password,done){
        User.findOne({username:username},function(err,user){
                 if(err) console.log(err);
        if(!user){
            return done(null,false,{message:'Unknown user'+username});
        }
        bcrypt.compare(password,user.password,function(err,isMatch){
            if(err) console.log(err);
            if(isMatch){
                console.log('Logged in!!');
                return done(null,user);
            }
            else{
                console.log('Invalid Password');
                return done(null,false,{message:'Invalid password'});
            }
        });
        });
   
    }));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user); 
    });
});

     }
