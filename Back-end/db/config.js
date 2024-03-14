const mongoose=require('mongoose')
const DB="mongodb://127.0.0.1:27017/E-tronic";

    try {
    const connect=  mongoose.connect(DB,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("C")
        console.log(result);
    } catch (error) {
        console.log(error)
    }