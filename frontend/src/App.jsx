import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Router } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import SignUp from './login/SignUp';
import ForgotPassword from './login/ForgotPassword';
import ChangePass from './login/ChangePass';
import AddProduct from './admin/AddProduct';
import Profile from './user/Profile';
import ViewProduct from './product/ViewProduct';
import { CartContext } from './context/CartContext';
import ViewCart from './cart/ViewCart';
import Checkout from './checkout/Checkout';
import PaymentSuccess from './checkout/PaymentSuccess';
import PaymentCancel from './checkout/PaymentCancel'
import AdminDashboard from './dashboard/AdminDashboard';
import { isLogin } from './Auth';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

function App() {
  
  const path = useNavigate();

  const [orders, setorders] = useState({});

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showcart, setshowcart] = useState(() => {
    const localdata = localStorage.getItem('cartdata');
    if(localdata){
      return localdata.length != 0 ? true : false;
    }
  });

  const [pprice, setpprice] = useState(() => {
    const localdt = localStorage.getItem('cartdata');
    let total = 0;
    if(localdt){
    const localtojson = JSON.parse(localdt);
    for (let i=0; i< localtojson.length; i++) {
      let quantity = parseInt(localtojson[i].quantity);
      let arraynum = parseInt(localtojson[i].price);
      let quantityprice = arraynum * quantity;
      // console.log(arraynum)
      total = total + quantityprice;
      // console.log(i)
    } }
    // console.log(total)
    return total ? total : 0 ;
    
  });

  const [cartdata, setcartdata] = useState(() => {
    const localData = localStorage.getItem('cartdata');
    return localData ? JSON.parse(localData) : [];
  });
  const [cartcount, setcartcount] = useState(() => {
    const localdatacount = localStorage.getItem('cartdata');
    const cdata =  JSON.parse(localdatacount)
    return localdatacount ? cdata.length : 0;
  });

  async function authenticate(){
    const log = await isLogin();
    if(log != false){
      console.log('already logged');
      setLoading(true);
      await axios.get('http://localhost:5555/users/showproducts').then(response => {
      setProduct(response.data);
      setLoading(false);
      // const binaryString = atob(tdc.split(',')[1]);
      // const blob = new Blob([binaryString], { type: 'image/jpeg' });
      }).catch(error => {
      console.log(error);
      })
    }
    else{
      path("/login")
    }
  }

  async function getOrders(){
    await axios.get('http://localhost:5555/products/vieworders').then(response => {
        // console.log(response.data)
        setorders(response.data);
        
    }).catch(error => {
        console.log('error fetching orders')
    })
  }

  useEffect(() => {
    localStorage.setItem('cartdata', JSON.stringify(cartdata));
  })

  return (
    <div>
    <CartContext.Provider value={{cartdata, setcartcount, cartcount, 
        setcartdata, pprice, setpprice, showcart, setshowcart, product, 
        setProduct, authenticate, loading, getOrders, orders}}>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/changepass' element={<ChangePass />}/>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/userprofile' element={<Profile />} />
        <Route path='/viewproduct/:id' element={<ViewProduct />} />
        <Route path='/cart' element={<ViewCart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path='/cancel' element={<PaymentCancel />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
      </Routes>
    </CartContext.Provider>
    </div>
  )
}

export default App
