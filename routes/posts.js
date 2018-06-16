var express=require('express');
var router=express.Router();
var Blog=require('../models/blog staging.js');
var passport=require('passport');
var bcrypt=require('bcryptjs');
var User=require('../models/user.js');
var nodemailer = require('nodemailer');

let userID="";
let para1text="";
let para1url="";
let para1title="";
let para2text="";
let para2url="";
let para2title="";
let para3text="";
let para3url="";
let para3title="";

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/')
}

//get posts if user is admin then show all posts else show only the posts which are posted by user

router.get('/:id',ensureAuthenticated,(req,res)=>{
    userID=res.locals.user._id;
    var id=req.params.id;
    if(res.locals.checkadmin){
          Blog.find({}).exec(function(err,post){
        res.render('posts',{
            posts:post
        });
    });
   
    }else{
         Blog.find({userid:id}).exec(function(err,post){
        res.render('posts',{
            posts:post
        });
    });
  
    }     
});

//show the edit page and autofill the previous values

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{ 
    var id=req.params.id;
    Blog.findById(id,function(err,blog){
        if(err) console.log(err);
        res.render('edit',{
            blogID:req.params.id,
            authname:blog.authname,
           blogtitle:blog.blogtitle,
            blogid:blog.blogid,
            blogurl:blog.blogurl,
            category:blog.category,
            catname:blog.catname,
            tag:blog.tag,
            blogdesc:blog.blogdesc,
            para1text:blog.para1text,
            para1url:blog.para1url,
            para1title:blog.para1title,
            para2text:blog.para2text,
            para2url:blog.para2url,
            para2title:blog.para2title,
            para3text:blog.para3text,
            para3url:blog.para3url,
            para3title:blog.para3title
        });
    });
    
});

//post route for edit page

router.post('/edit/:id',ensureAuthenticated,(req,res)=>{ 
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
    para1text=req.body.para1text;
    para1url=req.body.para1url;
    para1title=req.body.para1title;
    para2text=req.body.para2text;
    para2url=req.body.para2url;
    para2title=req.body.para2title;
    para3text=req.body.para3text;
    para3url=req.body.para3url;
    para3title=req.body.para3title;
     
     var errors=req.validationErrors();
    
     if (blogdesc.length>200){
            req.flash("danger", "Main blog description is too big please write briefly");
          res.redirect('/posts/'+userID);
        }
   
    if (errors){
       
        req.flash("danger", "Please provide the necessary fields and try again");
        res.redirect('/posts/'+userID);
    }
    else{
        Blog.findById(id,function(err,blog){
            
            if(err) console.log(err);
            if(para1text==null||para1text==""){
                para1text=blog.paragraph[0].paratext;
            }
            if(para1url==null||para1url==""){
                para1url=blog.paragraph[0].paraurl;
            }
            if(para1title==null||para1title==""){
                para1title=blog.paragraph[0].paratitle;
            }
            
            if(para2text==null||para2text==""){
                para2text=blog.paragraph[1].paratext;
            }
            if(para2url==null||para2url==""){
                para2url=blog.paragraph[1].paraurl;
            }
            if(para2title==null||para2title==""){
                para2title=blog.paragraph[1].paratitle;
            }
            
            if(para3text==null||para3text==""){
                para3text=blog.paragraph[2].paratext;
            }
            if(para3url==null||para3url==""){
                para3url=blog.paragraph[2].paraurl;
            }
            if(para3title==null||para3title==""){
                para3title=blog.paragraph[2].paratitle;
            }
            
            blog.authname=authname,
           blog.blogtitle=blogtitle,
            blog.blogurl=blogurl,
            blog.category=category,
            blog.catname=catname,
            blog.tag=tag,
            blog.userid=userID,
            blog.blogdesc=blogdesc,
           blog.paragraph=[{paratext:para1text,paraurl:para1url,paratitle:para1title},
                       {paratext:para2text,paraurl:para2url,paratitle:para2title},
                       {paratext:para3text,paraurl:para3url,paratitle:para3title}]
            
            blog.save(function(err){
                if(err) console.log(err);
                req.flash('success','Blog updated');
                res.redirect('/posts/'+userID);
            });
        });
    }
});

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


router.get('/delete/:id',ensureAuthenticated,(req,res)=>{
    var id=req.params.id;
    Blog.findByIdAndRemove(id).exec(function(err){
    if(err) console.log(err);
     req.flash('success','Blog Deleted Successfully');
      res.redirect('/posts/'+userID);
    });
    
});

//get route for view blog page

router.get('/viewblog/:id',ensureAuthenticated,(req,res)=>{
    var id=req.params.id;
        Blog.findById(id,function(err,blog){
        if(err) console.log(err);
        res.render('viewblog',{
            authname:blog.authname,
           blogtitle:blog.blogtitle,
            blogid:blog.blogid,
            blogurl:blog.blogurl,
            category:blog.category,
            catname:blog.catname,
            tag:blog.tag,
            blogdesc:blog.blogdesc,
            para1text:blog.para1text,
            para1url:blog.para1url,
            para1title:blog.para1title,
            para2text:blog.para2text,
            para2url:blog.para2url,
            para2title:blog.para2title,
            para3text:blog.para3text,
            para3url:blog.para3url,
            para3title:blog.para3title
        });

    });
    
});

module.exports=router;