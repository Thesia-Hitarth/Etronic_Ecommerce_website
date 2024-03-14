const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    ImageUrl:String,
    Brand:String,
    title:String,
    Price:Number,
    Rating:Number,
    details:String,
    category:String,
    stock:Number
});

module.exports=mongoose.model("products",productSchema);