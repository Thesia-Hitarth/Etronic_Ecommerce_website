const mongoose=require('mongoose')

const conformorder= new mongoose.Schema({
    ImageUrl:String,
    title:String,
    Price:Number,
    size:String,
    quantity:Number,
    Name:String,
    email:String,
    adress:String,
    city:String,
    pincode:Number,
    phoneno:Number,
    country:String,
    state:String
});

module.exports=mongoose.model("conformorder",conformorder);