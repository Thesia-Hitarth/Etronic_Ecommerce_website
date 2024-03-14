const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    ImageUrl:String,
    title:String,
    Price:Number,
    quantity:Number,
    size:String,
    useremail:String,
    username:String
});

module.exports=mongoose.model("orders",productSchema);