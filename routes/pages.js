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
    var authname=''
    var blogtitle=''
    var blogid=''
    var blogurl=''
    var blogdesc=''
    var catname=''
    var tag=''
    var category=''
    
    res.render('index',{
        authname:authname,
        blogtitle:blogtitle,
        blogid:blogid,
        category:category,
        blogurl:blogurl,
        blogdesc:blogdesc,
        catname:catname,
        tag:tag
    });
});


var emailexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function veri(email) {
    return emailexp.test(email);
}

//post route for signup 
router.post('/signup',(req,res)=>{
    var fullname=req.body.fullname;
    var address=req.body.address;
    var authimg=req.body.blogurl;
    var email=req.body.email;
    var password=req.body.password; 
    var username=req.body.username; 
    if(authimg==''){
        authimg='http://www.recipublic.com/assets/empty_user-64c8b958119d4e6577491dc53c8b31df46f01db36f6b8b893534cb5cf0bd2b8a.png'
    }
    req.checkBody('fullname','Please provide your fullname').notEmpty();
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
                    authimg:authimg,
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
    if(url==undefined){
        return false
    }
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
    req.checkBody('blogtitle','Please provide the title of the blog').notEmpty();
    req.checkBody('blogid','Please provide the id of the blog').notEmpty();
    req.checkBody('blogdesc','Please provide a description of the blog').notEmpty();
    
     var blogtitle=req.body.blogtitle;
     var blogid=req.body.blogid.replace(/[&\/\\#! ,_=+()$~%.'":*?<>{}]/g,'-').toLowerCase();
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
    var para4text=req.body.para4text;
    var para4url=req.body.para4url;
    var para4title=req.body.para4title;
    var para5text=req.body.para5text;
    var para5url=req.body.para5url;
    var para5title=req.body.para5title;
    var para6text=req.body.para6text;
    var para6url=req.body.para6url;
    var para6title=req.body.para6title;
    var para7text=req.body.para7text;
    var para7url=req.body.para7url;
    var para7title=req.body.para7title;
    var para8text=req.body.para8text;
    var para8url=req.body.para8url;
    var para8title=req.body.para8title;
    var para9text=req.body.para9text;
    var para9url=req.body.para9url;
    var para9title=req.body.para9title;
    var x;
    var errors=req.validationErrors();

    x=checkURL(blogurl)
    if(!x){
       req.flash('danger','Please provide a valid image URL');
        User.findById(id,(err,user)=>{
           res.render('index',{
            user:user,
           errors:errors,
           authname:user.authname,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            blogdesc:blogdesc,
            catname:catname,
            tag:tag,
            category:category,
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
           authname:user.authname,
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
           authname:user.authname,
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
            user: 'your email',
            pass: 'your password'
          }
        });

        var mailOptions = {
          from: user.email,
          to: 'your email',
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
          var blog=new Blog({
           authname:user.name,
           blogtitle:blogtitle,
            blogid:blogid,
            blogurl:blogurl,
            userid:id,
            authurl:user.authimg,
            blogdesc:blogdesc,
            categoryname:catname,
            categoryid:category,
            tag:tag,
            paragraph:[{paratext:para1text,paraurl:para1url,paratitle:para1title},
                       {paratext:para2text,paraurl:para2url,paratitle:para2title},
                       {paratext:para3text,paraurl:para3url,paratitle:para3title},
                       {paratext:para4text,paraurl:para4url,paratitle:para4title},
                      {paratext:para5text,paraurl:para5url,paratitle:para5title},
                      {paratext:para6text,paraurl:para6url,paratitle:para6title},
                      {paratext:para7text,paraurl:para7url,paratitle:para7title},
                      {paratext:para8text,paraurl:para8url,paratitle:para8title},
                      {paratext:para9text,paraurl:para9url,paratitle:para9title}]
        });
        blog.save((err)=>{
            if (err){
                return console.log(err);
            }
            req.flash('success','Blog Created');
            res.redirect('/');
        });   
        });
        
       
    }      
});


    
module.exports=router;
