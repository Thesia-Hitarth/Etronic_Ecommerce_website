import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import "./css/checkout.css"
import { Country, State } from 'country-state-city';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

function Checkout() {
    const navigate=useNavigate();
    const [adress, setadress] = useState("")
    const [city, setcity] = useState("")
    const [pincode, setpincode] = useState("")
    const [phoneno, setphoneno] = useState("")
    const [country, setcountry] = useState("")
    const [state, setstate] = useState("")
    const [email,setuderemail] = useState("")
    const [Name,setName] = useState("")
    const auth = localStorage.getItem('user');
    useEffect( ()=>{
        call();
        },[])
        const call=()=>{
            setName(JSON.parse(auth).Name)
            setuderemail(JSON.parse(auth).email)
        }
    const collect=async (e)=>{
        if(Name && email && adress && city && pincode && phoneno && country && state){
        await axios.post("http://localhost:5000/adduserorder",{Name,email,adress,city,pincode,phoneno,country,state})
        .then(res=>{
            alert(res.data.message)
            navigate(-1)
        })
    }else{
        alert("Enter All Details")
    }
    }
    return (
        <div className='shipping_form'>
        <h1 className='shipping_text text'>Shipping Detail</h1>
            <TextField value={adress} onChange={(e)=>{setadress(e.target.value)}} className='adress' id="outlined-basic" label="Adress" variant="outlined" />
            <br />
            <TextField value={city} onChange={(e)=>{setcity(e.target.value)}} className='city' id="outlined-basic" label="City" variant="outlined" />
            <br />
            <TextField value={pincode} onChange={(e)=>{setpincode(e.target.value)}} className='pincode' id="outlined-basic" label="Pin Code" variant="outlined" />
            <br />
            <TextField value={phoneno} onChange={(e)=>{setphoneno(e.target.value)}} className='phoneno' id="outlined-basic" label="Phone Number" variant="outlined" />
            <br />
            <Form.Select className='shipping_field' value={country} size="lg" aria-label="Default select example" onChange={(e)=>{setcountry(e.target.value)}}>
                <option className='select'>Choose Your Country</option>
                {
                    Country.getAllCountries().map((item) => {
                        return (<option key={item.isoCode} value={item.isoCode}>{item.name}</option>)
                    })
                }
            </Form.Select>
            <br/>
            <Form.Select className='shipping_field' value={state} onChange={(e)=>{setstate(e.target.value)}} size="lg" aria-label="Default select example">
                <option className='select'>Choose Your State</option>
                {
                    State.getStatesOfCountry(country).map((item) => {
                        return (<option key={item.isoCode} value={item.isoCode}>{item.name}</option>)
                    })
                }
            </Form.Select>
            <br/>
            <button type="button" onClick={(e)=>{collect()}}  className="btn_checkout " id="signup">Submit Your Details*</button>
        </div>
    )
}

export default Checkout
