import { useState,useEffect } from 'react'
import './css/admin.css'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import Rating from '@mui/material/Rating';
import axios from "axios"
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
// import Spinner from 'react-bootstrap/Spinner';

function Admin() {

    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
        if (JSON.parse(auth).email !== "admin@admin.com" || JSON.parse(auth).email === null) {
            navigate("/");
        }else{
        axios.get("http://localhost:5000/getproducts")
        .then(res => {
        setdata(res.data)
        })}
    }
    }, )

    const deleteproduct=async (id)=>{
        alert("You Want Delete This Product Then Press Ok");
        await axios.delete(`http://localhost:5000/deleteproduct/${id}`)
    }

    return (
        <>
            <div className='group'>
                <Row>
                    
                    <Col md={4}>
                        <ButtonGroup className='btn_nav'  style={{ minHeight: '80px' }}>
                            <Button onClick={() => navigate("/admin/")}>All Product</Button>
                            <Button onClick={() => navigate("/admin/addproduct")}>ADD Product</Button>
                            <Button onClick={() => navigate("/admin/userlist")}>User List</Button>
                            <Button onClick={() => navigate("/admin/orders")}>Orders</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={8}>
                        <Table className='list' striped bordered hover size="sm">
                            <thead className='head'>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>title</th>
                                    <th>details</th>
                                    <th>Rating</th>
                                    <th>category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>stock</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            {
                                data && data.map((item,index)=>{
                                    return(
                                        <>
                                        <tbody>
                                    <tr  className='td'>
                                    <td>{index+1}</td>
                                    <td><img className='list_img' src={item.ImageUrl} alt='' /></td>
                                    <td>{item.title}</td>
                                    <td id='detail'>{item.details}</td>
                                    <td><Rating className='star' name="half-rating-read" defaultValue={item.Rating} precision={0.5} readOnly /></td>
                                    <td>{item.category}</td>
                                    <td>{item.Brand}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.stock}</td>
                                    <td><AiFillEdit onClick={() => navigate("/admin/updateproduct/"+ item._id)} className='edit' />   &nbsp; <AiFillDelete onClick={() => deleteproduct(item._id)} className='edit' /> </td>
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
    )
}

export default Admin
