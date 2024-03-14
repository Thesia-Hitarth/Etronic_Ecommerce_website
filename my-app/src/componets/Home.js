import './css/style.css'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from './Footer';
import {useNavigate } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';

function Home() {
  const [loading,setloading] = useState(false);
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
      })
  }, [])

  return (
    <div>
    {
      loading?<Spinner className='loading' animation="grow" />:
      <>
      <section id="header">
        <h4>Trade-In-Offer</h4>
        <h2>Super Value Deal</h2>
        <h1><strong>On All Products</strong> </h1>
        <p>Find a deal that makes you smile </p>
        <div className="btn_header" id="btn_header"><strong>Shop Now</strong></div>
      </section>
      <h1 className="feature_heading"><strong>Features</strong></h1>
      <section id="feature" className="section_padding">
        <div className="box">
          <img className="imgs_1" src="images/feature-1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="box">
          <img className="imgs_2" src="images/feature-2.png" alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="box">
          <img className="imgs_3" src="images/feature-3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="box">
          <img className="imgs_4" src="images/feature-4.png" alt="" />
          <h6>return oreder</h6>
        </div>
        <div className="box">
          <img className="imgs_5" src="images/feature-5.png" alt="" />
          <h6>Best Seller</h6>
        </div>
        <div className="box">
          <img className="imgs_6" src="images/feature-6.png" alt="" />
          <h6>24/7 Service</h6>
        </div>
      </section>
      <section id="Product1" className="section_padding">
        <h2 className="Product1_heading"><strong>Best Selling Products</strong></h2>
        <div className="pro-container">
          {
            data && data.map((item, index) => {
              return (
                <>
                  {index < 16 && <>
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
                  </>}
                </>
              )
            })
          }
        </div>
      </section>
      <section id="discount" className="section_margin">
        <h4>Best Deales</h4>
        <h2>Up to <span>50% off</span> All Mobiles & Laptops</h2>
        <button type="button" className="btn btn-outline-danger btn-lg">Explore More</button>
      </section>
      <section id="Product1" className="section_padding">
        <h2 className="Product1_heading"><strong>New Arrivals</strong></h2>
        <p>Summer and Winter Collection New Morden Design</p>
        <div className="pro-container">
          {
            data && data.map((item, index) => {
              return (
                <>
                  {index < 8 && <>
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
                  </>}
                </>
              )
            })
          }
        </div>
      </section>
      <section id="fotter_banner_1" className="section_padding">
        <div className="banner-box banner-box1">
          <h4>Crazy Deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>Electronic items are on sales at E-tronic</span>
          <button type="button" className="btn_banner btn_banner1">Buy Now</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>New Arrivals</h4>
          <h2>Upcomming Season</h2>
          <span>All Assesories are available at E-tronic</span>
          <button type="button" className="btn_banner btn_banner2">Collection</button>
        </div>
      </section>
      <section id="fotter_banner_2" className="section_padding">
        <div className="banner-box_2 banner-box-21">
          <h2>Exclusive Collection</h2>
          <h3>New arrival - limited offer</h3>
        </div>
        <div className="banner-box_2 banner-box-22">
          <h2>Mordern and Elegant</h2>
          <h3>your choice</h3>
        </div>
        <div className="banner-box_2 banner-box-23">
          <h2></h2>
          <h3>The time is yours</h3>
        </div>
      </section>
      <Footer/>
      </>
    }
  
    </div>
  )
}

export default Home
