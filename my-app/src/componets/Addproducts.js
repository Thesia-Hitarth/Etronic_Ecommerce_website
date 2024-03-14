import React from 'react'
import './css/admin.css'
import './css/signin.css'
import { Form, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

function Addproducts() {
    const [loading,setloading] = useState(false);
    const [ImageUrl,setImageUrl]=useState("");
    const [title,settitle]=useState("");
    const [Brand,setBrand]=useState("");
    const [Price,setPrice]=useState("");
    const [category,setcategory]=useState("");
    const [stock,setstock]=useState("");
    const [details,setdetails]=useState("");
    const [Rating,setRating]=useState("");
    const [error,seterror]=useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        const auth = localStorage.getItem('user');
        if (JSON.parse(auth).email !== "admin@admin.com") {
            navigate("/");
        }
    }, [])
    const collectdata=(e)=>{
        // console.warn(ImageUrl,title,Price,Rating,Brand)
        if(ImageUrl && title && Price && Rating && Brand && details && stock && category){
        axios.post("http://localhost:5000/addproduct",{ImageUrl,Brand,title,Price,Rating,details,category,stock})
        .then(res=>{if(res.data.message === "Successfully Added"){
            alert(res.data.message)
            navigate("/admin/")
        }})
        }else{
            seterror(1);
        }
    }
    return (
        <>
        {
            loading?<Spinner className='loading' animation="border" /> :
            <>
            <div className='group'>
                <Row>
                    {/* <h1 className='text-center bg-dark text-light p-2'>Add Product</h1> */}
                    <Col md={4}>
                        <ButtonGroup className='btn_nav' style={{ minHeight: '80px' }}>
                        <Button onClick={() => navigate("/admin/")}>All Product</Button>
                            <Button onClick={() => navigate("/admin/addproduct")}>ADD Product</Button>
                            <Button onClick={() => navigate("/admin/userlist")}>User List</Button>
                            <Button onClick={() => navigate("/admin/orders")}>Orders</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={8}>
                        <div className='center1'>
                        <Form className='addform'>
                            <Form.Group className="mb-3 topside" controlId="formGridAddress1">
                                <Form.Label>ImageUrl</Form.Label>
                                <Form.Control onChange={(e)=>setImageUrl(e.target.value)} value={ImageUrl} placeholder="Enter ImageUrl" />
                            </Form.Group>
                            <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={(e)=>settitle(e.target.value)} value={title} placeholder="Enter Title" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                                <Form.Label>category</Form.Label>
                                <Form.Control onChange={(e)=>setcategory(e.target.value)} value={category} placeholder="Enter Category" />
                            </Form.Group>
                            </Row>
                            <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control onChange={(e)=>setstock(e.target.value)} value={stock} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control onChange={(e)=>setBrand(e.target.value)} value={Brand} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={(e)=>setPrice(e.target.value)} value={Price} />
                                </Form.Group>  <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control onChange={(e)=>setRating(e.target.value)} value={Rating} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Details</Form.Label>
        <Form.Control onChange={(e)=>setdetails(e.target.value)} value={details} as="textarea" rows={2} />
        </Form.Group>
                            </Row>
                            {error === 1 && <span className='errortext1'>Enter All Details</span>}
                            <input onClick={(e)=>collectdata()} type="button" className="loginbtn" value="Add Product" />
                        </Form>
                        </div>
                    </Col>
                </Row>
            </div>
            </>
        }
        </>
    )
}

export default Addproducts
