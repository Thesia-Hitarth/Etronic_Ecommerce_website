import './App.css';
import Nav from './componets/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './componets/Home';
import Signup from './componets/Signup';
import Login from './componets/Login';
import Admin from './componets/Admin';
import Addproducts from './componets/Addproducts';
import Updateproducts from './componets/Updateproducts';
import Orders from './componets/Orders';
import Userlist from './componets/Userlist';
import Men from './componets/Men';
import Women from './componets/Women';
import Kid from './componets/Kid';
import Detail from './componets/Detail';
import Cart from './componets/Cart';
import Checkout from './componets/Checkout';
import Profile from './componets/Profile';
import Payment from './componets/Payment';
import Paymentsucessful from './componets/Paymentsucessful';
import Updateprofile from './componets/Updateprofile';






function App() {
  return (
    <> 
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kid' element={<Kid/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/paymentsucessful' element={<Paymentsucessful/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile' element={<Updateprofile/>}/>
        <Route path='/productdetails/:id' element={<Detail/>}/>
        <Route path='/login' element={<Login/>}/>  
        <Route path='/admin/' element={<Admin/>}/>   
        <Route path='/admin/addproduct' element={<Addproducts/>}/>   
        <Route path='/admin/updateproduct/:id' element={<Updateproducts/>}/>      
        <Route path='/admin/orders' element={<Orders/>}/>                                                                                                                                           
        <Route path='/admin/userlist' element={<Userlist/>}/>                                                                                                                                                                                                                                                                                
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
