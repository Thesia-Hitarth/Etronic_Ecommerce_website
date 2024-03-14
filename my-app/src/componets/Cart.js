import React, { useEffect,useState } from 'react'
import './css/men_women_kid.css'
import './css/cart.css'
import './css/style.css'
import axios from "axios"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom'
// import Spinner from 'react-bootstrap/Spinner';

function Cart() {
    const navigate=useNavigate();
    const [orders,setorders] = useState([]);
    const [useremail,setuderemail] = useState("");
    const [email,setemail] = useState("");
    let total=0;
    const auth = localStorage.getItem('user');
    useEffect( ()=>{
        call();
        axios.post("http://localhost:5000/getorders",{useremail})
        .then(res=>{
            setorders(res.data)
        })
    }, [orders])
    const deleteorder=async (id)=>{
        await axios.delete(`http://localhost:5000/removeoreder/${id}`)
    }

    const call=()=>{
        setuderemail(JSON.parse(auth).email)
        setemail(JSON.parse(auth).email)
    }
    
    const checkout=()=>{
        if(total){
            axios.post("http://localhost:5000/getuserorder",{email})
            .then(res=>{
                console.warn(res.data)
                if(res.data.message === "no Found"){
                    navigate("/checkout")
                }else{
                    navigate("/payment")
                }
            })
        }else{
        alert("Your Cart Is Empty")
    }
    }
return (
    <div>
        <section id="header-cart">
                <h2>#Shop Now</h2>
                <p>Use Coupons To get Up to 50% Discount</p>
            </section>
            <section className="section_padding" id="cart">
        <table width="100%">
            <thead>
                <tr>
                    <td>Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Color</td>
                </tr>
            </thead>
            <tbody>
            {
                orders.map((item,index)=>{
                    total+=item.Price*item.quantity
                    return(
                        <>
                        <tr>
                    <td><RemoveCircleOutlineIcon onClick={() => deleteorder(item._id)} className='remove' /></td>
                    <td><img src={item.ImageUrl} alt=""/></td>
                    <td>{item.title}</td>
                    <td>{item.Price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.size}</td>
                        </tr>
                        </>
                    )
                })
            }
            </tbody>
        </table>
    </section>
    <section id='add_cart' className='section_padding'>
            <div className='total'>
                <h3>Cart Total</h3>
                <table>
                <tbody>
                    <tr>
                        <td>total Item</td>
                        <td>{orders.length}</td>
                    </tr>
                    <tr>
                        <td>Cart total</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>GST</td>
                        <td>{total*(0.05)}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{(total*(0.05))+total}</strong></td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" onClick={(e)=>{checkout()}} className="btn_checkout " id="signup">Proceed to Checkout</button>
            </div>
    </section>
    </div>
)
}

export default Cart
