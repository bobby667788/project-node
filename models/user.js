const mongoose=require('mongoose');

var userschema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
     username:{
        type:String,
        required:true
    },
    authimg:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    admin:{
        type:Number
    }
});
var User=module.exports=mongoose.model('User',userschema);