const express=require("express")
const cors=require("cors")
require("./db/config");
const Users=require("./db/User_model");
const Product=require("./db/Product_model");
const Orders=require("./db/orders_model");
const Userorder=require("./db/userorder_model");
const Conformorder=require("./db/conformorder_model")
const { findOne } = require("./db/User_model");
const app=express();
app.use(express.json());
app.use(cors());

app.post("/signin",async (req,resp)=>{
    const{ username,email,password}=req.body;
    let Name=username;
    const olduser= await Users.findOne({email:email});
    if(olduser){
        resp.send({message: "User Already Signup"})
    }else{const user=new Users({
        Name:username,
        email,
        password
    })
    await user.save();
    resp.send({message:"Successfully Signup",user:{Name,email}})
}
})

app.post("/login",async (req,resp)=>{
    const{ email,password}=req.body;
    const user=await Users.findOne({email: email})
    if(email==="admin@admin.com"){
        let Name=user.Name;
        if(user.__v === 1){
        if(user.password===password){
            resp.send({message:"Successfully Login As a Admin",user:{Name,email}})
        }else{
            resp.send({message:"Invalid Password"});
        }
    }
    }else{
    if(user){
        let Name=user.Name;
        if(password === user.password){
            resp.send({message:"Successfully Login",user:{Name,email}})
        }else{
            resp.send({message:"Invalid Password"})
        }
    }else{
        resp.send({message:"Invalid Email"})
    }
}
})

app.get("/userlist",async (req,resp)=>{
    let result=await Users.find().select("-password");
    resp.send(result);
})

app.post("/addproduct",async (req,resp)=>{
    const {ImageUrl,Brand,title,Price,Rating,details,category,stock}=req.body;
    const product= await new Product({
        ImageUrl,
        Brand,
        title,
        Price,
        Rating,
        details,category,stock
    });
    await product.save();
    resp.send({message:"Successfully Added"});
})

app.get("/getproducts",async (req,resp)=>{
    const getproducts= await Product.find();
    resp.send(getproducts);
})

app.get("/search/:key",async (req,resp)=>{
    let result= await Product.find({
        "$or": [
            {
                title: { $regex: req.params.key }
            },
            {
                Brand :{ $regex: req.params.key}
            },
            {
                details :{ $regex: req.params.key}
            },
            {
                category:{ $regex:req.params.key}
            }
        ]
    })
    if(result.length!==0){
        resp.send(result);
    }else{
        resp.send({message:"No Result Found"})
    }
})

app.get("/updateproduct/:id",async (req,resp)=>{
    let result =await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }else{
        resp.send("nop")
    }
})

app.put("/updateproduct/:id",async (req,resp)=>{
    let result=await Product.updateOne({_id:req.params.id},
        { $set: req.body})
        resp.send(result)
})

app.delete("/deleteproduct/:id",async (req,resp)=>{
    let result=await  Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.post("/orders",async (req,resp)=>{
    const {ImageUrl,title,Price,quantity,size,useremail,username}=req.body;
    if(ImageUrl && title && Price && quantity && size){
    const orders= await new Orders({
        ImageUrl,
        title,
        Price,
        quantity,size,useremail,username
    });
    await orders.save();
    resp.send({message:"Successfully Added"});
    }else[
            resp.send({message:"Enter All Details"})
    ]
})

app.post("/getorders",async (req,resp)=>{
    const {useremail}=req.body
    let findorder= await  Orders.find({useremail});
    if(findorder){
        resp.send(findorder)
    }else(
        resp.send({message:"no result found"})
    )
})

app.delete("/removeoreder/:id",async(req,resp)=>{
    let result=await  Orders.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.post("/adduserorder",async (req,resp)=>{
    const {Name,email,adress,city,pincode,phoneno,country,state}=req.body;
    let olduserdetails= await  Userorder.findOne({email:email});
    if(olduserdetails){
            resp.send({message:"user already submited"})
    }else{
    const userorder= await new Userorder({
        Name,
        email,
        adress,
        city,
        pincode,
        phoneno,
        country,state
    });
    await userorder.save();
    resp.send({message:"Successfully Added"});
}
})

app.post("/getuserorder",async (req,resp)=>{
    const {email}=req.body
    let finduserorder= await Userorder.findOne({email});
    if(finduserorder){
        resp.send(finduserorder)
    }else{
        resp.send({message:"no Found"})
    }
})

app.get("/getuserorder/:email",async (req,resp)=>{
    let result =await Userorder.findOne({email:req.params.email})
    if(result){
        resp.send(result);
    }else{
        resp.send("nop")
    }
})

app.post("/addconformorder",async (req,resp)=>{
    const { ImageUrl,title,Price,size,quantity,Name,email,adress,city,pincode,phoneno,country,state}=req.body;
    const co=await new Conformorder({
        ImageUrl,title,Price,size,quantity,Name,email,adress,city,pincode,phoneno,country,state
    })
    await co.save();
    resp.send({message:"Successfully Added"})
})

app.get("/getconformorder",async (req,resp)=>{
    let gco=await Conformorder.find();
    if(gco){
        resp.send(gco)
    }
})

app.put("/conformorder/:id",async (req,resp)=>{
    let result=await Conformorder.updateOne({_id:req.params.id},
        { $set:
                {
                    __v : 1
                }
        })
        resp.send(result)
})

app.put("/updateuserprofile/:email",async (req,resp)=>{
    let result=await Users.updateOne({email:req.params.email},
        { $set: req.body})
        resp.send(result)
})

// app.put("/updateuserdetails/:email",async (req,resp)=>{
//     const {email}=req.body
//     let result=await Userorder.updateOne({email},
//         { $set: req.body})
//         resp.send(result)
// })

app.put("/updateuserdetails/:email",async (req,resp)=>{
    let result=await Userorder.updateOne({email:req.params.email},
        { $set: req.body})
        resp.send(result)
})
app.post("/getuserdata",async (req,resp)=>{
    const {email}=req.body
    const user=await Users.findOne({email: email})
    if(user){
        resp.send(user._id)
    }
})

app.get("/getuserdata/:email",async (req,resp)=>{
    let result =await Users.findOne({email:req.params.email})
    if(result){
        resp.send(result);
    }else{
        resp.send("nop")
    }
})

app.listen(5000);