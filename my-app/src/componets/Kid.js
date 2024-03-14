import './css/style.css'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from './Footer';
import './css/men_women_kid.css'
import {useNavigate } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';

function Men() {
    const [loading,setloading] = useState(false);
    const [detail, setdetail] = useState(0);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    useEffect(() => {
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        axios.get("http://localhost:5000/getproducts")
            .then(res => {
                setdata(res.data)
                setpdperpage(8)
            })
    }, [])

    const[currentpage,setcurrentpage]=useState(1)
    const[pdperpage,setpdperpage]=useState(0)
    const lastpdIndex=currentpage * pdperpage
    const firstpdIndex=lastpdIndex - pdperpage
    const currentpds=data.slice(firstpdIndex,lastpdIndex)
    const pages=[];
        for(let i=1; i<=Math.ceil(data.length/pdperpage);i++){
            pages.push(i);
        }
        const nextpage=(page)=>{
            setloading(true)
            setTimeout(()=>{
                setloading(false)
            },1000)
            setcurrentpage(page) 
    }
    const searchhandle=async (event)=>{
        setdetail(1);
        let key=event;
        console.log(key)
        await axios.get(`http://localhost:5000/search/${key}`)
        .then(res=>{
                setdata(res.data)
                if(res.data.message==="No Result Found"){
                    alert("No Result Found");
                        window.location.reload();
                }
        }) 
    }
    return (
        <>
        {
            loading ? <Spinner className='loading' animation="grow" /> :

            <>
            <section id="header-kid">
  <h2>#All Products</h2>
  <p>Save More With Coupons & Up to 50%</p>
</section>
<section id='serach' className="section_padding">
            <h1>Serach Your Product</h1>
            <div class="search-box">
    <button class="btn-search"><i class="fas fa-search"></i></button>
    <input type="text" class="input-search" onChange={(e)=>{searchhandle(e.target.value)}} placeholder="Type to Search..."/>
    </div>
            </section>
            <section id="Product1" className="section_padding">
                <div className="pro-container">
                    {
                        detail===0 ?
                        currentpds && currentpds.map((item, index) => {
                            return (
                                <>
                                        <div onClick={() => navigate("/productdetails/"+ item._id)} className="pro">
                                            <img src={item.ImageUrl} alt="" />
                                            <div className="des">
                                                <span className='brand'>{item.Brand}</span>
                                                <h5>{item.title}</h5>
                                                <Rating className='star' name="half-rating-read" defaultValue={item.Rating} precision={0.5} readOnly />
                                                <h4>{item.Price}<i className="fa-solid fa-indian-rupee-sign"></i></h4>
                                            </div>
                                            <ShoppingCartIcon sx={{ fontSize: 40 }} className='fa-solid pro-cart' />
                                        </div>
                                </>
                            )
                        }) :
                        data && data.map((item, index) => {
                            return (
                                <>
                                        <div onClick={() => navigate("/productdetails/"+ item._id)} className="pro">
                                            <img src={item.ImageUrl} alt="" />
                                            <div className="des">
                                                <span className='brand'>{item.Brand}</span>
                                                <h5>{item.title}</h5>
                                                <Rating className='star' name="half-rating-read" defaultValue={item.Rating} precision={0.5} readOnly />
                                                <h4>{item.Price}<i className="fa-solid fa-indian-rupee-sign"></i></h4>
                                            </div>
                                            <ShoppingCartIcon sx={{ fontSize: 40 }} className='fa-solid pro-cart' />
                                        </div>
                                </>
                            )
                        })
                        
                    }
                </div>
            </section>
            <section id="page_no" className="section_padding section_margin">
            {
                detail ===0 ?
                pages.map((page,index)=>{
                return <button onClick={()=>{nextpage(page)}} key={index}>{page}</button>
            }) :
            <></>
            }
</section>
            <Footer />
            </>
        }
            
        </>
    )
}

export default Men
