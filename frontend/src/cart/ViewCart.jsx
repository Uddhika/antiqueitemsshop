import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import NavBar from '../home/NavBar';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { product } from '../../../backend/datamodel';

const ViewCart = () => {

    const path = useNavigate();

    const { cartdata, setcartdata, pprice, setpprice, setcartcount, showcart, setshowcart } = useContext(CartContext);

    function checkitems(e){
      e.preventDefault();
      if(cartdata.length == 0){
          toast.error('No Products added for the Checkout!')
      }
      else{
          path('/checkout');
      }
    }

    function increase(index){
      cartdata[index].quantity += 1;
      // console.log(cartdata[index].quantity)
      return cartdata[index].quantity;

    }

    function decrease(index){
      if(cartdata[index].quantity > 1){
        cartdata[index].quantity -= 1;

        localStorage.setItem('cartdata', JSON.stringify(cartdata));
        setcartdata(cartdata);

        return cartdata[index].quantity;
      }
    }

    function calculatetotal(){
      localStorage.setItem('cartdata', JSON.stringify(cartdata));
      setcartdata(cartdata);
      let alltot = 0;
      for (let i = 0; i < cartdata.length; i++) {
        let itemtot = cartdata[i].price * cartdata[i].quantity;
        alltot += itemtot;
      }
      setpprice(alltot);
    }

    useEffect(() => {
        if(cartdata.length == 0){
            setshowcart(false);
        }
    },[])

    return (
        <div className='h-screen bg-black bg-opacity-10'>
        <NavBar />
        <div>
        <div className='py-8'>
            <div className='mx-auto w-4/5 shadow-2xl py-10 rounded-md bg-white flex flex-col md:flex-row justify-evenly'>
                { showcart == true ? <div className='grid grid-cols-1'>
                    {cartdata.map((product, index) => (
                        <div key={product._id} className='flex justify-between border-b border-gray-200 px-4 py-5 sm:px-6'>

                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.pimg}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className='text-left'>
                                        <a href={product.href} className=''>{product.pname}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}$</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className='flex flex-row'>
                                    <button className='mr-2 border-2 border-indigo-200 rounded-md px-1.5 bg-indigo-100 hover:bg-indigo-600 hover:text-white'
                                    onClick={() => { decrease(index);
                                      calculatetotal();
                                    }}
                                    >-</button>
                                      
                                     <p className="text-gray-500 flex items-center">{product.quantity}</p>
                                    <button className='ml-2 border-2 border-indigo-200 rounded-md px-1 bg-indigo-100 hover:bg-indigo-600 hover:text-white'
                                    onClick={() => { increase(index);
                                      calculatetotal();                                      
                                    } }
                                    >+</button>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="submit"
                                            className="w-20 rounded-md bg-indigo-600 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() => {
                                               const localcartdata = JSON.parse(localStorage.getItem('cartdata'));
                                               localcartdata.splice(index, 1);
                                               localStorage.setItem('cartdata', JSON.stringify(localcartdata));
                                               setcartdata(localcartdata); 
                                               let total =0;
                                              for(let i=0; i < localcartdata.length; i++){
                                                let itemtot = localcartdata[i].price * localcartdata[i].quantity;
                                                total += itemtot;
                                              } 
                                              setpprice(total);
                                              setcartcount(localcartdata.length)
                                              if(localcartdata.length == 0){
                                                setshowcart(false);
                                              }
                                            }}
                                        >    
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div> 
                            
                        </div>
                    ))}
                    
                </div> : <div className='grid grid-cols-1'>  
                            <div className='flex flex-1 items-center'>
                                <h1 className='font-semibold'>No products add to the cart</h1>
                            </div>
                     </div>}
                <div className="px-4 py-5 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        
                        <p>Subtotal</p>
                        
                        <p>{pprice}$</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href=""
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        onClick={checkitems}
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or {}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => {path('/')}}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div> 
                </div>
            </div>
        </div>
        </div>
        <Toaster />
    </div>
    )
}

export default ViewCart