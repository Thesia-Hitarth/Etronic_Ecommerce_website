import React from 'react'
import "./css/profile.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
import { Form, Row, Col } from 'react-bootstrap'


function Updateprofile() {
    const navigate=useNavigate();
    const [iduser, setiduser] = useState();
    const [iduserdetail, setiduserdetail] = useState();
    const [email, setemail] = useState();
    const [Name, setName] = useState();
    const [adress, setadress] = useState();
    const [city, setcity] = useState();
    const [country, setcountry] = useState();
    const [state, setstate] = useState();
    const [phoneno, setphoneno] = useState();
    const [pincode, setpincode] = useState();
    
    useEffect(() => {
        const auth = localStorage.getItem('user');
        setemail(JSON.parse(auth).email)
        getdetail()
        axios.get(`http://localhost:5000/getuserdata/${email}`)
        .then(res=>{
            setName(res.data.Name)
        })
    },[email] )
    const getdetail = () => {
        axios.get(`http://localhost:5000/getuserorder/${email}`)
            .then(res => {
                console.log(res.data)
                setiduserdetail(res.data._id)
                setName(res.data.Name)
                setemail(res.data.email)
                setadress(res.data.adress)
                setcity(res.data.city)
                setpincode(res.data.pincode)
                setphoneno(res.data.phoneno)
                setcountry(res.data.country)
                setstate(res.data.state)
            })
    }
    const up=async (id)=>{
        // if(id){

        await axios.put(`http://localhost:5000/updateuserprofile/${email}`,{Name,email})
        .then(res=>{
        axios.put(`http://localhost:5000/updateuserdetails/${email}`,{Name,email,adress,city,pincode,phoneno,country,state})
        .then(res=>{
            alert("Your Profile Has Been Updated")
            navigate("/profile")
        })
        })
        
        // }else{
        //     alert("Faild")
        //     window.location.reload(false);
        // }
        
    }
    return (
        <div className='profile1'>
        <div className='heading'>Update Profile</div>
        <Row>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e)=>{setName(e.target.value)}} value={Name}/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control onChange={(e)=>{setemail(e.target.value)}} value={email}/>
            </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Adress</Form.Label>
                <Form.Control  onChange={(e)=>{setadress(e.target.value)}} value={adress}/>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Country</Form.Label>
                    <Form.Control  onChange={(e)=>{setcountry(e.target.value)}} value={country}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>State</Form.Label>
                    <Form.Control onChange={(e)=>{setstate(e.target.value)}} value={state}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={(e)=>{setcity(e.target.value)}} value={city}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={(e)=>{setphoneno(e.target.value)}} value={phoneno}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Pin code</Form.Label>
                    <Form.Control onChange={(e)=>{setpincode(e.target.value)}} value={pincode}/>
                </Form.Group>
            </Row>
            <button className='btn' onClick={(e)=>{up(iduserdetail)}}>Update Your Profile</button>
        </div>
    )
}

export default Updateprofile
