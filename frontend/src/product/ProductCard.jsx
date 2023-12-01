import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {CartContext} from '../context/CartContext';
import ViewCart from '../cart/ViewCart';

const ProductCard = ({products, loading}) => {

    const [iconcolor, seticoncolor] = useState(-1);

    const {cartdata, setcartcount, setshowcart} = useContext(CartContext);

  return (
    
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading == false ? products.map((product,index) => (
            <div key={product._id} className="group relative">
              <Link to={`/viewproduct/${product._id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.pimg}
                  alt={product.imageAlt}
                  className="h-full w-full object-scale-down object-center lg:h-full lg:w-full cursor-pointer"
                />
              </div></Link>
              
              <div className="mt-4 flex justify-between">
                <div>
                
                  <h3 className="text-sm text-gray-700">
                      {product.pname}
                  </h3> 
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                
                <p className="text-sm font-medium text-gray-900">
                {product.price}
                </p>
              </div>
              <div className='flex justify-between mt-4'>
                <div className='group relative'>
                {index != iconcolor ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke='#3949AB' strokeWidth={1} className="w-6 h-6 absolute ml-2 mt-2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke='white' strokeWidth={1} className="w-6 h-6 absolute ml-2 mt-2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>}
                <button href="#" className="rounded-md border-2 border-indigo-600 px-3 py-2 text-indigo-600 cursor-pointer pl-9 hover:bg-indigo-600 hover:text-white"
                onMouseEnter={() => seticoncolor(index)} onMouseLeave={() => seticoncolor(-1)} onClick={() => { 
                            const found = cartdata.find((item) => item._id == product._id);
                            // console.log(found);
                            if(!found){
                                product.quantity=1;
                                cartdata.push(product);
                                setcartcount(cartdata.length);
                                // console.log(cartdata);
                                setshowcart(true)
                            }
                            
                    } }
                >Add to Cart</button>
                </div>
                <button
                  type="submit"
                  className="flex w-35 justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Buy Now
                </button>
            </div>
            </div>
            
          )) : [12, 3, 6, 6, 6, 9, 9, 7].map((_, index) => <Spinner key={index}/> )}

        </div>
      </div>
    </div>
  )
}

export default ProductCard