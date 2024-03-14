import React from 'react'
import './css/admin.css'
import {Form,Row,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useNavigate,useParams } from "react-router-dom"
import  { useState,useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

function Updateproducts() {
    const [loading,setloading] = useState(false);
    const [ImageUrl,setImageUrl]=useState("");
    const [title,settitle]=useState("");
    const [Brand,setBrand]=useState("");
    const [Price,setPrice]=useState("");
    const [Rating,setRating]=useState("");
    const [category,setcategory]=useState("");
    const [stock,setstock]=useState("");
    const [details,setdetails]=useState("");
    const [error,seterror]=useState(0);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        const auth=localStorage.getItem('user');
        if(JSON.parse(auth).email !== "admin@admin.com"){
            navigate("/");
        }
        getproductdetails();
    }, [])
    
    const getproductdetails=async ()=>{
        await axios.get(`http://localhost:5000/updateproduct/${params.id}`)
        .then(res=>{
        setImageUrl(res.data.ImageUrl)
        settitle(res.data.title)
        setBrand(res.data.Brand)
        setPrice(res.data.Price)
        setRating(res.data.Rating)
        setstock(res.data.stock)
        setdetails(res.data.details)
        setcategory(res.data.category)
        })
    }

    const collectdata= async (e)=>{
      if(ImageUrl && title && Price && Rating && Brand){
        await axios.put(`http://localhost:5000/updateproduct/${params.id}`,{ImageUrl,Brand,title,Price,Rating,details,category,stock})
        navigate("/admin/")
      }else{
          seterror(1);
      }
  }
  return (
  <>
  {
    loading? <Spinner className='loading' animation="border" /> :
    <>
    <div className='group'>
  <Row>
      {/* <h1 className='text-center bg-dark text-light p-2'>Admin Pannel</h1> */}
      <Col md={4}>
      <ButtonGroup className='btn_nav' style={{minHeight:'90px'}}>
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
                                <Form.Control onChange={(e)=>setImageUrl(e.target.value)} value={ImageUrl} placeholder="update ImageUrl" />
                            </Form.Group>
                            <Row className="mb-3">
                            <Form.Group  as={Col}  className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={(e)=>settitle(e.target.value)} value={title} placeholder="update Title" />
                            </Form.Group>
                            <Form.Group  as={Col}  className="mb-3" controlId="formGridAddress2">
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
                                    <Form.Control onChange={(e)=>setBrand(e.target.value)} value={Brand}  />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={(e)=>setPrice(e.target.value)} value={Price} placeholder="update Price" />
                                </Form.Group>  <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control onChange={(e)=>setRating(e.target.value)} value={Rating} placeholder="update Rating" />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Details</Form.Label>
        <Form.Control onChange={(e)=>setdetails(e.target.value)} value={details} as="textarea" rows={3} />
        </Form.Group>
                            {error === 1 && <span className='errortext1'>Enter All Details</span>}
                            <input onClick={(e)=>collectdata()} type="button" className="loginbtn" value="Update Product" />
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

export default Updateproducts
