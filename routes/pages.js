var express=require('express');
var router=express.Router();
var Blog=require('../models/blog staging.js');
var passport=require('passport');
var bcrypt=require('bcryptjs');
var User=require('../models/user.js');
var nodemailer = require('nodemailer');

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    res.redirect('/');
});


function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/')
}


router.get('/',(req,res)=>{
    res.render('index');
});


var emailexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function veri(email) {
    return emailexp.test(email);
}

//post route for signup 
router.post('/signup',(req,res)=>{
    var fullname=req.body.fullname;
    var address=req.body.address;
    var email=req.body.email;
    var password=req.body.password; 
    var username=req.body.username; 
    req.checkBody('fullname','Please provide your fullname').notEmpty();
    req.checkBody('address','Please provide a valid address').notEmpty();
    req.checkBody('username','Please provide a username').notEmpty();
    req.checkBody('email','Please provide your email id').notEmpty();
    req.checkBody('password','Please provide a password').notEmpty();
    req.checkBody('password2','Password do not match').equals(password);
    req.checkBody('email','Please provide your email id')
    
    var errors=req.validationErrors();
    var az=veri(email)
    
    if(!az){
        req.flash('danger','Please provide a valid email')
        res.render('signup',{
            user:false,
            errors:errors
        });
        return;
    }

    if(errors){
        res.render('signup',{
            user:false,
            errors:errors
        });
    }
    
    
    else{
        User.findOne({username:username},function(err,user){
            if (err) console.log(err);
            if(user){
                req.flash('danger','A user with same username exists!');
                res.render('signup');
            }
            else{
                var user=new User({
                    name:fullname,
                    email:email,
                    username:username,
                    address:address,
                    password:password,
                    admin:0
                });
                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(user.password,salt,function(err,hash){
                        if(err) console.log(err);
                        user.password=hash;
                        user.save(function(err){
                            if(err){
                                console.log(err);
                            }
                            else{
                                req.flash('success','You are now registered!');
                                res.redirect('/');
                            }
                        });
                    });
                });
            }
        });
    }
 
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

//check for valid image

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

router.get('/login',(req,res)=>{
    res.render('login');
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','You are logged out!');
    res.render('login');
});


//post route for the blog submission

router.post('/:id',(req,res)=>{
    var id=req.params.id;
    req.checkBody('authname','Please provide the name of the author').notEmpty();
    req.checkBody('blogtitle','Please provide the title of the blog').notEmpty();
    req.checkBody('blogid','Please provide the id of the blog').notEmpty();
    req.checkBody('blogdesc','Please provide a description of the blog').notEmpty();
    
    var authname=req.body.authname;
     var blogtitle=req.body.blogtitle;
     var blogid=req.body.blogid.replace(/\s+/g,'-').toLowerCase();
     var blogurl=req.body.blogurl;
     var blogdesc=req.body.blogdesc;
    var category=req.body.category;
    var catname=req.body.catname;
    var tag=req.body.tag;
    var para1text=req.body.para1text;
    var para1url=req.body.para1url;
    var para1title=req.body.para1title;
    var para2text=req.body.para2text;
    var para2url=req.body.para2url;
    var para2title=req.body.para2title;
    var para3text=req.body.para3text;
    var para3url=req.body.para3url;
    var para3title=req.body.para3title;
    var x;
    var errors=req.validationErrors();
    
    x=checkURL(blogurl)
    if(!x){
       req.flash('danger','Please provide a valid image URL');
        User.findById(id,(err,user)=>{
           res.render('index',{
            user:user,
           errors:errors,
           authname:authname,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            blogdesc:blogdesc,
            catname:catname,
            tag:tag,
            para1text:para1text,
            para1url:para1url,
            para1title:para1title,
            para2text:para2text,
            para2url:para2url,
            para2title:para2title,
            para3text:para3text,
            para3url:para3url,
            para3title:para3title
        });
       }); 
    }
    
    else if(blogdesc.length>200){
        req.flash('danger','Blog is too big please try to write in brief');
        User.findById(id,(err,user)=>{
           res.render('index',{
            user:user,
           errors:errors,
           authname:authname,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            blogdesc:blogdesc,
            catname:catname,
            tag:tag,
            para1text:para1text,
            para1url:para1url,
            para1title:para1title,
            para2text:para2text,
            para2url:para2url,
            para2title:para2title,
            para3text:para3text,
            para3url:para3url,
            para3title:para3title
        });
       });
    }
    
   else if (errors){
       User.findById(id,(err,user)=>{
           res.render('index',{
            user:user,
           errors:errors,
           authname:authname,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            blogdesc:blogdesc,
            catname:catname,
            tag:tag,
            para1text:para1text,
            para1url:para1url,
            para1title:para1title,
            para2text:para2text,
            para2url:para2url,
            para2title:para2title,
            para3text:para3text,
            para3url:para3url,
            para3title:para3title
        });
       });
        
    }
    else{
        //please provide your mail id and password here
        console.log('Success..');
        User.findById(id,function(err,user){
            if(err) console.log(err);
          var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'gokuverma94@gmail.com',
            pass: 'Judgmentday@667788'
          }
        });

        var mailOptions = {
          from: user.email,
          to: 'gokuverma94@gmail.com',
          subject: 'A new blog posted by user',
          text: 'A blog was created by username '+user.username
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        }); 
            
        });
        
        var blog=new Blog({
           authname:authname,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            userid:id,
            blogdesc:blogdesc,
            categoryname:catname,
            categoryid:category,
            tag:tag,
            paragraph:[{paratext:para1text,paraurl:para1url,paratitle:para1title},
                       {paratext:para2text,paraurl:para2url,paratitle:para2title},
                       {paratext:para3text,paraurl:para3url,paratitle:para3title}]
        });
        blog.save((err)=>{
            if (err){
                return console.log(err);
            }
            req.flash('success','Blog Created');
            res.redirect('/');
        });
    }      
});


    
module.exports=router;
