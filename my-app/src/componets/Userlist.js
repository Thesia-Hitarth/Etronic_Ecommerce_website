import { useState,useEffect } from 'react'
import './css/admin.css'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

function Userlist() {
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    useEffect(() => {
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        const auth = localStorage.getItem('user');
        if (JSON.parse(auth).email !== "admin@admin.com" || JSON.parse(auth).email === null) {
            navigate("/");
        }else{
        axios.get("http://localhost:5000/userlist")
        .then(res => {
        setdata(res.data)
        })}
    }, [])
return (
<>
{
    loading? <Spinner className='loading' animation="border" /> :
    <>
    <div className='group'>
                <Row>
                    {/* <h1 className='text-center bg-dark text-light p-2'>Userlist</h1> */}
                    <Col md={4}>
                        <ButtonGroup className='btn_nav'  style={{ minHeight: '80px' }}>
                            <Button onClick={() => navigate("/admin/")}>All Product</Button>
                            <Button onClick={() => navigate("/admin/addproduct")}>ADD Product</Button>
                            <Button onClick={() => navigate("/admin/userlist")}>User List</Button>
                            <Button onClick={() => navigate("/admin/orders")}>Orders</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={8}>
                        <Table className='userlist' striped bordered hover size="sm">
                            <thead className='head'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Admin</th>
                                    <th>Id</th>
                                </tr>
                            </thead>
                            {
                                data && data.map((item,index)=>{
                                    return(
                                        <>
                                        <tbody>
                                    <tr className='td'>
                                    <td>{index+1}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.__v}</td>
                                    <td>{item._id}</td>
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

export default Userlist
