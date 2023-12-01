import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './NavBar';
import Footer from './Footer';
import ProductCard from '../product/ProductCard';
import { CartContext } from '../context/CartContext';

const Home = () => {
  
  const {product, authenticate, loading} = useContext(CartContext);

  useEffect(() =>{
    authenticate();
  },[]);

  return (
    
    <div>
      <NavBar />
      {/* <h1>Hi {location.state.id} </h1> */}
      {/* <h2>Welcome to home</h2> */}
    <ProductCard products={product} loading={loading} />
    <Footer />
    </div>
  )
}

export default Home