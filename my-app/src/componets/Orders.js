import React from 'react'
import './css/admin.css'
import {Row,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useNavigate} from "react-router-dom"
import  { useState,useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import axios from "axios"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';

function Orders() {

    const [loading,setloading] = useState(false);
    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
        useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(JSON.parse(auth).email !== "admin@admin.com"){
            navigate("/");
        }else{
          axios.get("http://localhost:5000/getconformorder")
          .then(res=>{
            setdata(res.data)
          })
        }
    })

    const conform=async (id)=>{
      await axios.put(`http://localhost:5000/conformorder/${id}`)
      .then(res=>{
        alert(res.data.acknowledged);
      })
    }
  return (
  <>
  
  {
    loading? <Spinner className='loading' animation="border" /> :
    <>
    <div className='group'>
    <Row>
        {/* <h1 className='text-center bg-dark text-light p-2'>Orders</h1> */}
        <Col md={4}>
        <ButtonGroup className='btn_nav' style={{minHeight:'80px'}}>
        <Button onClick={() => navigate("/admin/")}>All Product</Button>
                            <Button onClick={() => navigate("/admin/addproduct")}>ADD Product</Button>
                            <Button onClick={() => navigate("/admin/userlist")}>User List</Button>
                            <Button onClick={() => navigate("/admin/orders")}>Orders</Button>
        </ButtonGroup>
        </Col>
        <Col md={8}>
        <Table className='order_detail' striped bordered hover size="sm">
      <thead className='head'>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>title</th>
          <th>Price</th>
          <th>size</th>
          <th>Quantity</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Adress</th>
          <th>City</th>
          <th>Pincode</th>
          <th>Phone no</th>
          <th>Country</th>
          <th>State</th>
          <th>Conform Order</th>
          <th>For Order Conformation</th>
        </tr>
      </thead>
      {
        data.map((item,i)=>{
          return(
            <>
            <tbody>
        <tr>
          <td>{i+1}</td>
          <td><img className='list_img' src={item.ImageUrl} alt=""/></td>
          <td>{item.title}</td>
          <td>{item.Price}</td>
          <td>{item.size}</td>
          <td>{item.quantity}</td>
          <td>{item.Name}</td>
          <td>{item.email}</td>
          <td>{item.adress}</td>
          <td>{item.city}</td>
          <td>{item.pincode}</td>
          <td>{item.phoneno}</td>
          <td>{item.country}</td>
          <td>{item.state}</td>
          <td>{item.__v===0 ? <CancelIcon className='cancle'/> :<CheckBoxIcon color="success"/>}</td>
          <td><Button color="secondary" onClick={(e)=>{conform(item._id)}}>click here</Button></td>
        </tr>
      </tbody>
            </>
          )
        })
      }
      
    </Table>
        </Col>
    </Row>
    </div>
    </>
  }
   
  </>
  )
}

export default Orders
