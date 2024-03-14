import React from 'react'
import './css/signin.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

function Signup() {
    const [loading,setloading] = useState(false);
    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState(0);
    const navigate = useNavigate();
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
    const collect=async ()=>{
        if(username && email && password){
            axios.post("http://localhost:5000/signin",{username,email,password})
            .then(res=>{if(res.data.message==="User Already Signup"){
                seterror(1)
            }else{
                localStorage.setItem("user",JSON.stringify(res.data.user))
                navigate('/')
            }
        })
        }else{
            seterror(2)
        }
        
    }
    return (
        <div>
        {
            loading? <Spinner className='loading' animation="grow" />:
            <>
            <div className="center">
                <h1>Signup</h1>
                <form>
                {error === 1 && <span className='errortext'>User already signup</span> }
                {error === 2 && <span className='errortext'>Enter All Details</span> }
                    <div className="txt_field">
                        <input onChange={(e)=>setusername(e.target.value)} value={username} type="text" required />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input onChange={(e)=>setemail(e.target.value)} value={email} type="text" required />
                        <span></span>
                        <label>E-mail</label>
                    </div>
                    <div className="txt_field">
                        <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input onClick={(e)=>collect()} type="button" className="loginbtn" value="Signup" />
                    <div className="signup_link">
                        Already Login Then Go Here! <Link to={"/login"}>Login</Link>
                    </div>
                </form>
            </div>
            
            </>
        }
        </div>
    )
}

export default Signup
