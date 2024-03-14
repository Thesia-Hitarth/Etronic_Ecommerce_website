import React, { useEffect, useState } from 'react'
import './css/detail.css'
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Detail() {
    const auth = localStorage.getItem('user');
    const [loading,setloading] = useState(false);
    const [quantity,setquantity] = useState(1);
    const [useremail,setuderemail] = useState("");
    const [username,setusername] = useState("");
    const [item,setitem] = useState([]);
    const [size,setsize] = useState("");
    const [ImageUrl,setImageUrl] = useState("");
    const [title,settitle] = useState("");
    const [Price,setPrice] = useState("");
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        getproduct();
        if(auth){call()}
        
    }, [])
const call=()=>{
    setuderemail(JSON.parse(auth).email)
    setusername(JSON.parse(auth).Name)
}

    const getproduct=async ()=>{
        await axios.get(`http://localhost:5000/updateproduct/${params.id}`)
        .then(res=>{
            setitem(res.data)
            setImageUrl(res.data.ImageUrl)
            setPrice(res.data.Price)
            settitle(res.data.title)
        })
    }
    const goback=(e)=>{
            navigate(-1)
    }   
    const collect=async (e)=>{
        if(auth){
        if(quantity <= item.stock){
        await axios.post("http://localhost:5000/orders",{ImageUrl,title,Price,quantity,size,useremail,username})
        .then(res=>{
            alert(res.data.message)
            if(res.data.message==="Successfully Added"){
                navigate("/cart")
            }
        })
    }else{
        alert(":( soory Out Of Stock...")
    }
        }else{
            navigate("/login");
        }
    }
return (
        <>
        {
            loading ? <Spinner className='loading' animation="border" /> :
            <>
            <Button className='button' onClick={(e)=>{goback()}} variant="outline-secondary">Back</Button>{' '}
        <section id="pro_detail" className="section_padding">
    <div className="single_pro_img">
        <img src={ImageUrl} width="100%" id="main_img" alt="" />
        <div className="small_imgs">
            <div className="small_imgs_col">
                <img src="" width="100%" className="small_img" alt="" />
            </div>
            <div className="small_imgs_col">
                <img src="pro-3.png" width="100%" className="small_img" alt="" />
            </div>
            <div className="small_imgs_col">
                <img src="pro-4.png" width="100%" className="small_img" alt="" />
            </div>
            <div className="small_imgs_col">
                <img src="pro-5.png" width="100%" className="small_img" alt="" />
            </div>
        </div>
    </div>
    <div className="pro_details_text">
        <h6>{item.category}</h6>
        <h4>{title}</h4>
        <hr/>
        <h2>{Price}<i className="fa-solid fa-indian-rupee-sign"></i></h2>
        <select value={size} onChange={(e)=>{setsize(e.target.value)}}>
            <option >Select Color</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Pink">Pink</option>
            <option value="White">White</option>
        </select>
        <input onChange={(e)=>{setquantity(e.target.value)}} type="number" value={quantity} />
        <button onClick={(e)=>{collect()}}>Add To Cart</button>
        <hr/>
        <h4>Prouduct Details</h4>
        <span>{item.details}</span>
    </div>
</section>
            </>
        }
    </>

    
)
}

export default Detail
