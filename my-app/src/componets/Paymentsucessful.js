import React, { useState,useEffect } from 'react'
import "./css/payment.css"
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Paymentsucessful() {
  const [loading,setloading] = useState(false);
  useEffect(()=>{
    setloading(true)
    setTimeout(()=>{
        setloading(false)
    },1000)
  },[])
    const navigate=useNavigate()
  return (
   <>
    {
      loading? <Spinner className='loading' animation="border" /> :
      <>
         <div className='sus'>
         <VerifiedIcon color="success" sx={{ fontSize: 70 }}/>
        <h1>Your item Successfully Ordered</h1>
        <h3>Thank You for shoping</h3>
        <button onClick={(e)=>{navigate("/")}}>Shop Now</button>
        <br/>
        <button>View Order</button>
         </div>
      </>
    }
    </>
  )
}

export default Paymentsucessful
