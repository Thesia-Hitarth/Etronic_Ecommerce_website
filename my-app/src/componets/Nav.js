/* eslint-disable jsx-a11y/anchor-is-valid */
import './css/style.css'
import { Link, useNavigate } from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { useEffect, useState } from 'react';


function Nav() {
    const navigate = useNavigate();
    const [email, setemail] = useState();
    const [Name, setName] = useState();
    const auth = localStorage.getItem('user');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (auth) {
            setemail(JSON.parse(auth).email)
            axios.get(`http://localhost:5000/getuserdata/${email}`)
            .then(res=>{
            setName(res.data.Name)
        })
        }
    },)
    const logout = () => {
        localStorage.clear();
        navigate("/signin")
    }
    const profile = () => {
        axios.post("http://localhost:5000/getuserorder", { email })
            .then(res => {
                console.warn(res.data)
                if (res.data.message === "no Found") {
                    navigate("/checkout")
                } else {
                    navigate("/profile")
                }
            })
    }
    
    return (
        <section id="navbar_">
            <Link to={"/"}><a className="heading"><h1>E-tronic</h1></a></Link>
            <div id="navbr">
                <ul id="nav">
                    {
                        auth ? JSON.parse(auth).email === "admin@admin.com" ? <>
                            <li className="hover text"><Link to={"/admin/"}>Dashboard</Link></li>
                        </> : <></> : <></>
                    }
                    <li className="hover text"><Link to={"/"}>Home</Link></li>
                    <li className="hover text" id="men"><Link to={"/men"}>Mobiles</Link></li>
                    <li className="hover text" id="women"><Link to={"/women"}>Laptops</Link></li>
                    <li className="hover text" id="kid"><Link to={"/kid"}>Products</Link></li>
                    <li className="hover text"><Link>About</Link></li>
                    {
                        auth && <li className="hover text" style={{marginLeft:"-15px"}}><Link to={"/cart"}><LocalMallIcon fontSize="large" /></Link></li>
                    }
                    {
                        auth ? <>
                            <DropdownButton className='drop' variant="secondary" title={"Hi," + Name}>
                                <Dropdown.Item className='drop_profile' onClick={(e) => { profile() }}><AccountCircleIcon /> Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='drop_order' >My Orders</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='drop_logout'><Link onClick={() => logout()} to={"/signup"}><button type="button" className="btn_log " id="login" >logout</button></Link></Dropdown.Item>
                            </DropdownButton>
                        </> : <>
                            <li><Link to={"/login"}><button type="button" className="btn_log " id="login" >Log-In</button></Link></li>
                            <li><Link to={"/signup"}><button type="button" className="btn_sign " id="signup">Sign-Up</button></Link></li>
                        </>
                    }

                    <a href="###" id="close"><i className="fa-solid fa-xmark fa-xl"></i></a>
                </ul>
            </div>
            <div id="mobile">
                <a href="###"><i className="fa-solid fa-bag-shopping"></i></a>
                <i id="slidebar" className="fas fa-outdent"></i>
            </div>
        </section>
    )
}

export default Nav
