const mongoose=require('mongoose');

var blogschema=mongoose.Schema({
    authname:{
        type:String,
        required:true
    },
    blogtitle:{
        type:String,
        required:true
    },
    blogid:{
        type:String,
        required:true
    },
    userid:{
        type:String
    },
    blogurl:{
        type:String
    },
    blogdesc:{
        type:String,
        required:true
    }, 
     categoryid:{
        type:String     
    },   
     categoryname:{
        type:String
    },
    tag:{
        type:String
    },
    visible:{
        type:Boolean,
        default:false
    },
    paragraph:[{
        paratext:{type:String},
        paraurl:{type:String},
        paratitle:{type:String}
    }]
          
});

var Blog=module.exports=mongoose.model('Blog staging',blogschema);
