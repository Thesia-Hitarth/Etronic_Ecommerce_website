import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/payment.css"
import axios from "axios"

function Payment() {
    const navigate=useNavigate()
    const [useremail,setuderemail] = useState("");
    const [cardholder,setcardholder]=useState();
    const [cardname,setcardname]=useState();
    const [date,setdate]=useState();
    const [cvv,setcvv]=useState();
    const [orders,setorders] = useState([]);
    // const [detail,setdetail]=useState();
    // const [ImageUrl,setImageurl]=useState();
    // const [size,setsize]=useState();
    // // const [title,settitle]=useState();
    // const [Price,setPrice]=useState();
    // const [quantity,setquantity]=useState();
    const [Name,setName]=useState();
    const [email,setemail]=useState();
    const [adress,setadress]=useState();
    const [city,setcity]=useState();
    const [pincode,setpincode]=useState();
    const [phoneno,setphoneno]=useState();
    const [country,setcountry]=useState();
    const [state,setstate]=useState();
    const auth = localStorage.getItem('user');
    useEffect(()=>{
        call()
        getproduct()
        getdtail()
    },)
    const call=()=>{
        setemail(JSON.parse(auth).email)
        setuderemail(JSON.parse(auth).email)
        setName(JSON.parse(auth).Name)
        console.log(useremail)
    }
    const getproduct=async ()=>{
        await axios.post("http://localhost:5000/getorders",{useremail})
        .then(res=>{
            setorders(res.data)
            console.warn(orders)
        })
    }
    const getdtail=()=>{
        axios.post("http://localhost:5000/getuserorder",{email})
        .then(res=>{
            setadress(res.data.adress)
            setcity(res.data.city)
            setpincode(res.data.pincode)
            setphoneno(res.data.phoneno)
            setcountry(res.data.country)
            setstate(res.data.state)
        })
    }
    const done= async(e)=>{
            // orders.map((item,i)=>{
            //     let id=item.quantity
            //     console.warn(id)
            // })
        if(cardholder && cardname && date && cvv){
            await orders.map( (item,i)=>{
                let ImageUrl=item.ImageUrl
                let title=item.title
                let Price=item.Price
                let size=item.size
                let quantity=item.quantity
                return(
                    axios.post("http://localhost:5000/addconformorder",{ImageUrl,title,Price,size,quantity,Name,email,adress,city,pincode,phoneno,country,state})
                    .then(res=>{
                        // alert(res.data.message)
                        if(res.data.message==="Successfully Added"){
                            
                            let id=item._id
                            axios.delete(`http://localhost:5000/removeoreder/${id}`)
                        }
                    })
                )
            })
            navigate("/paymentsucessful")
        }else{
            alert("Enter All Details")
        }
    }
    return (
        <div>
            <div className="wrapper">p
                <div className="payment">
                    <div className="payment-logo">
                        <p>p</p>
                    </div>
                    <h2>Payment Gateway</h2>
                    <div className="form">
                        <label className="label">Card holder:</label>
                        <div className="card space icon-relative">
                            <input type="text" value={cardholder} onChange={(e)=>{setcardholder(e.target.value)}} className="input" placeholder="Card holder" />
                            <i className="fas fa-user"></i>
                        </div>
                        <label className="label">Card number:</label>
                        <div className="card space icon-relative">
                            <input type="text" className="input" value={cardname} onChange={(e)=>{setcardname(e.target.value)}} data-mask="0000 0000 0000 0000" placeholder="Card Number" />
                            <i className="far fa-credit-card"></i>
                        </div>
                        <div className="card-grp space">
                            <div className="card-item icon-relative">
                                <label className="label">Expiry date:</label>
                                <input type="text" name="expiry-data" value={date} onChange={(e)=>{setdate(e.target.value)}} className="input" placeholder="00 / 00" />
                                <i className="far fa-calendar-alt"></i>
                            </div>
                            <div className="card-item icon-relative">
                                <label className="label">CVC:</label>
                                <input type="text" className="input" value={cvv} onChange={(e)=>{setcvv(e.target.value)}} data-mask="000" placeholder="0000" />
                                <i className="fas fa-lock"></i>
                            </div>
                        </div>
                        <div className="btn" onClick={(e)=>{done()}}>
                            Pay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
