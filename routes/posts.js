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
let para4text="";
let para4url="";
let para4title="";
let para5text="";
let para5url="";
let para5title="";
let para6text="";
let para6url="";
let para6title="";
let para7text="";
let para7url="";
let para7title="";
let para8text="";
let para8url="";
let para8title="";
let para9text="";
let para9url="";
let para9title="";

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
            category:blog.categoryid,
            catname:blog.categoryname,
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
    para1text=req.body.para1text;
    para1url=req.body.para1url;
    para1title=req.body.para1title;
    para2text=req.body.para2text;
    para2url=req.body.para2url;
    para2title=req.body.para2title;
    para3text=req.body.para3text;
    para3url=req.body.para3url;
    para3title=req.body.para3title;
    para4text=req.body.para4text;
    para4url=req.body.para4url;
    para4title=req.body.para4title;
    para5text=req.body.para5text;
    para5url=req.body.para5url;
    para5title=req.body.para5title;
    para6text=req.body.para6text;
    para6url=req.body.para6url;
    para6title=req.body.para6title;
    para7text=req.body.para7text;
    para7url=req.body.para7url;
    para7title=req.body.para7title;
    para8text=req.body.para8text;
    para8url=req.body.para8url;
    para8title=req.body.para8title;
    para9text=req.body.para9text;
    para9url=req.body.para9url;
    para9title=req.body.para9title;
     
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
            if(para4text==null||para4text==""){
                para4text=blog.paragraph[3].paratext;
            }
            if(para4url==null||para4url==""){
                para4url=blog.paragraph[3].paraurl;
            }
            if(para4title==null||para4title==""){
                para4title=blog.paragraph[3].paratitle;
            }
            if(para5text==null||para5text==""){
                para5text=blog.paragraph[4].paratext;
            }
            if(para5url==null||para5url==""){
                para5url=blog.paragraph[4].paraurl;
            }
            if(para5title==null||para5title==""){
                para5title=blog.paragraph[4].paratitle;
            }
            if(para6text==null||para6text==""){
                para6text=blog.paragraph[5].paratext;
            }
            if(para6url==null||para6url==""){
                para6url=blog.paragraph[5].paraurl;
            }
            if(para6title==null||para6title==""){
                para6title=blog.paragraph[5].paratitle;
            }
            if(para7text==null||para7text==""){
                para7text=blog.paragraph[6].paratext;
            }
            if(para7url==null||para7url==""){
                para7url=blog.paragraph[6].paraurl;
            }
            if(para7title==null||para7title==""){
                para7title=blog.paragraph[6].paratitle;
            }
            if(para8text==null||para8text==""){
                para8text=blog.paragraph[7].paratext;
            }
            if(para8url==null||para8url==""){
                para8url=blog.paragraph[7].paraurl;
            }
            if(para8title==null||para8title==""){
                para8title=blog.paragraph[7].paratitle;
            }
            if(para9text==null||para9text==""){
                para9text=blog.paragraph[8].paratext;
            }
            if(para9url==null||para9url==""){
                para9url=blog.paragraph[8].paraurl;
            }
            if(para9title==null||para9title==""){
                para9title=blog.paragraph[8].paratitle;
            }
            
            blog.authname=blog.authname,
           blog.blogtitle=blogtitle,
            blog.blogurl=blogurl,
            blog.categoryid=category,
            blog.categoryname=catname,
            blog.tag=tag,
            blog.userid=userID,
            blog.blogdesc=blogdesc,
           blog.paragraph=[{paratext:para1text,paraurl:para1url,paratitle:para1title},
                       {paratext:para2text,paraurl:para2url,paratitle:para2title},
                       {paratext:para3text,paraurl:para3url,paratitle:para3title},
                       {paratext:para4text,paraurl:para4url,paratitle:para4title},
                      {paratext:para5text,paraurl:para5url,paratitle:para5title},
                      {paratext:para6text,paraurl:para6url,paratitle:para6title},
                      {paratext:para7text,paraurl:para7url,paratitle:para7title},
                      {paratext:para8text,paraurl:para8url,paratitle:para8title},
                      {paratext:para9text,paraurl:para9url,paratitle:para9title}]
            
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