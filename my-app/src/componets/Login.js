import React from 'react'
import './css/signin.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

function Login() {
    const [loading,setloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const [error, seterror] = useState(0);
    useEffect(()=>{
        setloading(true)
        setTimeout(()=>{
            setloading(false)
        },1000)
        const auth=localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    }, [])
    
    const collect = async (e) => {
        if( email && password){
            axios.post("http://localhost:5000/login",{email,password})
            .then(res=>{
                if(res.data.message === "Invalid Password"){
                    seterror(1)
                }else if(res.data.message === "Invalid Email"){
                    seterror(2)
                }else if(res.data.message === "Successfully Login"){
                    localStorage.setItem("user",JSON.stringify(res.data.user))
                    alert(res.data.message)
                    navigate("/")
                }else if(res.data.message === "Successfully Login As a Admin"){
                    localStorage.setItem("user",JSON.stringify(res.data.user))
                    alert(res.data.message)
                    navigate("/admin/")
                }
            })
        }else{
            seterror(3);
        }
        
    }
    return (
        <>
        {
            loading? <Spinner className='loading' animation="grow" />:
            <>
            <div className="center">
                <h1>Login</h1>
                <form>
                    {error === 2 && <span className='errortext'>Invalid Email,refresh and Try Again</span> }
                    {error === 3 && <span className='errortext'>Enter All Details</span> }
                    <div className="txt_field">
                        <input onChange={(e) => setemail(e.target.value)} value={email} type="text" required />
                        <span></span>
                        <label>E-mail</label>
                    </div>
                    {error === 1 && <span className='errortext'>Invalid Password,refresh and Try Again</span>}  
                    <div className="txt_field">
                        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input onClick={(e) => collect()} className="loginbtn" type="button" value="Login" />
                    <div className="signup_link">
                        Not a member? <Link to={"/signup"}>Signup</Link>
                    </div>
                </form>
            </div>
            </>
        }
        </>
    )
}

export default Login
