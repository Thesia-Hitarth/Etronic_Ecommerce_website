import React, { useEffect, useState } from 'react'
import "./css/profile.css"
import { Form, Row, Col } from 'react-bootstrap'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Profile() {
  const navigate=useNavigate()
  const [data,setdata]=useState([]);
  const [email,setemail]=useState();
  const auth = localStorage.getItem('user');
  const str = JSON.parse(auth).Name;
const firstLetter = str[0];
  useEffect(()=>{
    call()
    getdata()
  })
  const call=()=>{
    setemail(JSON.parse(auth).email)
  }
  const getdata=()=>{
    axios.post("http://localhost:5000/getuserorder",{email})
    .then(res=>{
        setdata(res.data)
    })
  }

  return (
    <>
    <Button className='button' style={{marginBottom:"-150px"}} onClick={(e)=>{navigate("/")}} variant="outline-secondary">Back</Button>
    <div className='profile'>   
          <div className='left'>
          <h1>My Profile</h1>
          {/* <AccountBoxOutlinedIcon className='acc_logo' color="primary" sx={{ fontSize: 400 }}/>  */}
          <div className='acc_logo'><span>{firstLetter}</span></div>
          <button className="btn" onClick={(e)=>{navigate("/updateprofile")}}>Edit Profile</button>
          <button className="btn btn1">View Orders</button>
          </div>
          <div className="vl"></div>
          <div className='right'>
          <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder={data.Name} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control placeholder={data.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Adress</Form.Label>
          <Form.Control placeholder={data.adress} disabled />
          </Form.Group>
          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control placeholder={data.country} disabled />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control  placeholder={data.state} disabled/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control  placeholder={data.city} disabled/>
                                </Form.Group>
                            </Row>
          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control  placeholder={data.phoneno} disabled />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Pin code</Form.Label>
                                    <Form.Control  placeholder={data.pincode} disabled/>
                                </Form.Group>
                            </Row>
          </div>
    </div>
    </>
  )
}

export default Profile
