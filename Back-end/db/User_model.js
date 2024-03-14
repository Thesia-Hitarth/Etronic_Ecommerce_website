const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    Name:String,
    email:String,
    password:String,
    Image:String
});

module.exports=mongoose.model("user",userSchema);