import React from 'react'
import { useEffect, useState, useContext } from 'react';
import NavBar from '../home/NavBar';
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../Auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {

    const path= useNavigate();

    const { pprice, cartdata } = useContext(CartContext);

    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [phone, setPhone] = useState('');
    const [fulladdress, setFulladdress] = useState('');
    const [showcity, setshowcity] = useState('first');
    const [shipcost, setshipcost] = useState(0);
    const [delcity, setdelcity] = useState('');
    const [descshow, setdescshow] = useState('');

    function submitshippingdetails(e){
        e.preventDefault();
        
        const faddress = address + ', ' + city + ', ' + postal;
        setFulladdress(faddress);
        setshowcity('second');
        
    }

    function submitshippcity(e){
        e.preventDefault();
        const cityfee = city + ' ' + shipcost+'.00$';
        setdelcity(cityfee);
        setshowcity('third');
    }

    async function submitPayment(e){
        e.preventDefault();
        if(descshow == 'card'){
            const shippingarr = {};
            const res = await axios.post('http://localhost:5555/products/payment', {shipcost, cartdata, email, shippingarr:{
                fname,
                lname,
                address,
                city,
                postal,
                phone,
                shipcost
            }});
            if(res.data.url){
                window.location.href = res.data.url;
            }
            else {
                console.log('error')
            }
        }
        
    }

    useEffect(() => {
        async function loaduserdata(){
            const logdata = await isLogin();
            if(logdata){
                setEmail(logdata.email);
            }     
        }
        loaduserdata();
    },[])

  return (
    <div>
    <NavBar />
    <div className='sm:flex justify-evenly'>
        <div className="my-10 sm:w-full sm:max-w-xl">

            <div className='mx-4'>
                <p className='font-bold text-left'>Customer Information</p>
            </div>

            <div className='mx-4'>
                <div className="py-6 flex justify-between">
                    <h1 className='flex items-center border-indigo-200 border-2 rounded-md px-3'>Email</h1>
                    <input
                        value={email}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email Address"
                        onChange={(e) => {setEmail(e.target.value)}}
                        
                    />
                    
                </div>
                    
            </div>

            { fulladdress != "" && <div className='mx-4 border-2 rounded-md shadow-sm flex justify-start'>       
                <h1 className='border-indigo-200 border-2 px-1.5 py-1 rounded-md'>Address</h1>
                <div className="flex flex-1 items-center">
                <p className='text-left ps-2'>{fulladdress}</p>
                </div>
                <button className='border-2 border-indigo-200 rounded-md px-2 bg-indigo-100 hover:bg-indigo-600 hover:text-white'
                onClick={() => {setFulladdress(''); setshowcity('first'); setdelcity('')}}
                >Change</button>
            </div>}

            { delcity != '' && <div className='mx-4 border-2 rounded-md shadow-sm mt-5 flex justify-start'>       
                <h1 className='border-indigo-200 border-2 px-1.5 py-1 rounded-md'>Delivery Cost</h1>
                <div className="flex flex-1 items-center ps-2">
                <p className='text-left'>{delcity}</p>
                </div>
                <button className='border-2 border-indigo-200 rounded-md px-2 bg-indigo-100 hover:bg-indigo-600 hover:text-white'
                onClick={() => {setdelcity(''); setshowcity('second')}}
                >Change</button>
            </div>}

            { showcity == 'first' ? 
            <form className="space-y-6 mt-6" action="" method="POST" id="demo_form">

                <div className='mx-4'>
                    <p className='font-bold text-left'>Shipping Information</p>
                </div>

                <div className='flex justify-between'>
                
                <div className='mx-4 sm:w-full'>
                    
                    <div className="mt-2">
                    <input
                        value={fname}
                        id="fname"
                        name="fname"
                        type="text"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="First Name"
                        onChange={(e) => {setFname(e.target.value)}}
                        
                    />
                    </div>
                </div>
                <div className='mx-4 sm:w-full'>
                    
                    <div className="mt-2">
                    <input
                        value={lname}
                        id="lname"
                        name="lname"
                        type="text"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Last Name"
                        onChange={(e) => {setLname(e.target.value)}}
                        
                    />
                    </div>
                </div>

                </div>

                <div className='mx-4'>
                    
                    <div className="mt-2">
                    <input
                        value={address}
                        id="address"
                        name="address"
                        type="text"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Address"
                        onChange={(e) => {setAddress(e.target.value)}}
                        
                    />
                    </div>
                </div>

                <div className='flex justify-between'>
                
                <div className='mx-4 sm:w-full'>
                    
                    <div className="">
                    <input
                        value={city}
                        id="city"
                        name="city"
                        type="text"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="City"
                        onChange={(e) => {setCity(e.target.value)}}
                        
                    />
                    </div>
                </div>
                <div className='mx-4 sm:w-full'>
                    
                    <div className="">
                    <input
                        value={postal}
                        id="postal"
                        name="postal"
                        type="number"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Postal Code"
                        onChange={(e) => {setPostal(e.target.value)}}
                        
                    />
                    </div>
                </div>

                </div>

                <div className='mx-4'>
                    
                    <div className="mt-2">
                    <input
                        value={phone}
                        id="phone"
                        name="phone"
                        type="number"
                        autoComplete=""
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Phone"
                        onChange={(e) => {setPhone(e.target.value)}}
                        
                    />
                    </div>
                </div> 

                <div className='mx-4'>
                    <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={submitshippingdetails}
                    >
                    Continue
                    </button>
                </div>

            </form> : (showcity == 'second') ?
            <div className='mx-4 mt-5'>
                <p className='font-bold text-left mb-5'>Select Shipping City</p>
                
                <div className='p-5 border-gray-200 border-2 hover:border-indigo-600 rounded-md'>
                    <div className='flex justify-between'>
                    <div className="flex items-center">
                        <input type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-indigo-600 ring-2 cursor-pointer focus:ring-blue-500 " onChange={() => {setshipcost(10)}}/>
                        <label htmlFor="default-radio-2" className="ml-4 text-sm font-medium text-gray-900">Matara</label>
                    </div>
                        <p>10$</p>
                    </div>
                    
                </div>
                <div className='p-5 border-gray-200 border-2 hover:border-indigo-600 rounded-md'>
                    <div className='flex justify-between'>
                    <div className="flex items-center">
                        <input type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-indigo-600 ring-2 cursor-pointer focus:ring-blue-500 " onChange={() => {setshipcost(20)}}/>
                        <label htmlFor="default-radio-2" className="ml-4 text-sm font-medium text-gray-900">Colombo</label>
                    </div>
                        <p>20$</p>
                    </div>
                    
                </div>
                <div className='mt-8'>
                    <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={submitshippcity}
                    >
                    Continue to Payment
                    </button>
                </div>
            </div> : 

            // payment

            <div className='grid grid-cols-1 mx-5 mt-8'>
                <p className='text-left font-bold mb-4'>Payment</p>
                <div className='flex justify-between border-2 border-indigo-200 p-3 rounded-md hover:border-indigo-400'>
                    <div className="flex items-center">
                        <input type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-indigo-600 ring-2 cursor-pointer focus:ring-blue-500 " onChange={() => {setshipcost(20)}}
                        onClick={() => {setdescshow('cash')}}
                        />
                        <label htmlFor="default-radio-2" className="ml-5 font-normal">Cash on Delievery</label>
                    </div> 
                </div>
                { descshow == 'cash' && <div className='text-left p-3'>
                    <p>Island wide cash on delivery available.</p>
                    <p>This option is only valid for orders to be delivered in Sri Lanka. International orders which are placed with this option will be cancelled.</p>
                </div>}
                <div className='flex justify-between border-2 border-indigo-200 p-3 rounded-md hover:border-indigo-400'>
                    <div className="flex items-center">
                        <input type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-indigo-600 ring-2 cursor-pointer focus:ring-blue-500 " onChange={() => {setshipcost(20)}}
                        onClick={() => {
                            setdescshow('bank');
                        }}
                        />
                        <label htmlFor="default-radio-2" className="ml-5 font-normal">Bank Deposit</label>
                    </div> 
                </div>
                { descshow == 'bank' && <div className='text-left p-3'>
                    <p>This option is only valid for orders to be delivered in Sri Lanka. International orders which are placed with this option will be cancelled.</p>
                    <p>Bank transfer request information are as below.</p>
                    <p>Name : A N T Z (private) ltd</p>
                    <p>Bank : Sampath Bank PLC - Matara Super Branch</p>
                    <p>Account No : 0032 1450 8734</p>
                    <p>Branch Code - 102</p>
                    <p>SWIFT Code -TRUMLYHN</p>
                    <p>-----------------------------</p>
                    <p>Let us know once the deposit is done today and please share the an image of the deposit/transfer slip</p>
                </div>}
                <div className='flex justify-between border-2 border-indigo-200 p-3 rounded-md hover:border-indigo-400'>
                    <div className="flex items-center">
                        <input type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-indigo-600 ring-2 cursor-pointer focus:ring-blue-500 " onChange={() => {setshipcost(20)}}
                        onClick={() => {setdescshow('card')}}
                        />
                        <label htmlFor="default-radio-2" className="ml-5 font-normal">Card Payment</label>
                    </div> 
                </div>

                <button
                    type="submit"
                    className="mt-10 w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={submitPayment}
                    >
                    Pay Now
                </button>

            </div>

            }
            
        </div>
        <div className="sm:w-1/4 px-4 py-10 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{pprice}$</p>
            </div>
            <div className='flex justify-between py-1'>
                <p className="mt-0.5 text-sm text-gray-500">Shipping</p>
                <p className='font-normal text-sm text-gray-500 flex items-end'>{shipcost}$</p>
            </div>
            <div className='flex justify-between py-2'>
                <p className='font-bold text-xl'>Total</p> 
                <p className='font-bold text-xl'>{pprice+shipcost}$</p>
            </div>
            <div className="flex justify-center text-center text-sm text-gray-500">
                <span aria-hidden="true"> &larr;</span>
                <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => {path('/cart')}}
                >
                    Continue to Cart
                    
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Checkout