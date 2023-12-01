import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../home/NavBar';
import Footer from '../home/Footer';
import ProductShowSpinner from '../components/ProductShowSpinner';

const ViewProduct = () => {

  const { id } = useParams();
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      const productdata = await axios.get(`http://localhost:5555/products/viewproduct/${id}`);
      if (productdata != false) {
        // console.log(productdata.data)
        setProduct(productdata.data);
      }
      setLoading(false);
    }
    getProduct();
  }, [])

  return (

    <div>
      <NavBar />
      { loading == true ? <ProductShowSpinner /> :
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className='lg:grid w-full md:grid-w-full grid-cols-2'>
          <img src={product.pimg} alt="" className='lg:w-full md:w-full sm:w-full rounded-md' />
          <div className=''>
            <h1 className='font-bold text-4xl'>{product.pname}</h1>
            <p className='font-light px-10 mt-10'>{product.pdesc}</p>
            <h2 className='font-bold mt-10 text-2xl'>{product.price}$</h2>
            <button
              type="submit"
              className="w-4/5 mx-auto mt-10 rounded-md border-2 border-indigo-600 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            // onClick={productsubmit}
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="w-4/5 mx-auto mt-8 rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            // onClick={productsubmit}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>}
      <Footer />
    </div>
  )
}

export default ViewProduct