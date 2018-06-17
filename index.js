const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var expressValidator=require('express-validator');
var passport = require('passport');
var app=express();

mongoose.connect('mongodb://bobby667788:password@ds129770.mlab.com:29770/practice');

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log('Connected to MongoDB');
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.locals.errors=null;
app.locals.ishome=false;
app.locals.issignup=true;

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));


app.use(expressValidator({
        errorFormatter:function(param,msg,value){
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;
            while(namespace.lenght){
                formParam += '[' + namespace.shift() + ']';
            }
            return{
                param:formParam,
                msg: msg,
                value: value
            };
        }
}));

app.use(require('connect-flash')());
app.use(function(req,res,next){
    res.locals.messages=require('express-messages')(req,res);
    if(req.url=='/'){
      res.locals.ishome=true;  
    }
        
    else{
       res.locals.ishome=false; 
    }
    if(req.url=='/signup'){
      res.locals.issignup=true;  
    }
        
    else{
       res.locals.issignup=false; 
    }
    next();
});

require('./config/passport.js')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    if(req.user){
       res.locals.checkadmin=req.user.admin; 
       res.locals.nameofuser=req.user.username;
    }
    next();
});

var pages=require('./routes/pages.js');
var posts=require('./routes/posts.js');
app.use('/',pages);
app.use('/posts',posts);






app.listen(5000,function(){
console.log("Listening on port 5000..")
});