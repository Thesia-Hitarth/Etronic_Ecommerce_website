const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    Name:String,
    email:String,
    adress:String,
    city:String,
    pincode:Number,
    phoneno:Number,
    country:String,
    state:String
});

module.exports=mongoose.model("userorder",userSchema);