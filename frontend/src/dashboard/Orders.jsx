import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import ProductModal from '../modal/ProductModal';

const Orders = () => {

    const {orders, getOrders} = useContext(CartContext);

    const [open, setOpen] = useState(false);
    const [openpayment, setOpenPayment] = useState(false);
    const [openship, setOpenShip] = useState(false);
    const [opendelstatus, setopendelstatus] = useState(false);
    const [opendelete, setOpenDelete] = useState(false);
    const [orderitem, setorderitem] = useState(null);
    const [delstatus, setdelstatus] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedShip, setSelectedShip] = useState(null);
    const [search, setsearch] = useState('');
    
    function setDte(date){
        // let arr=[];
        // for(let i=0; i<date.length; i++){
        //     if(date[i] != 'T'){
        //         arr.push(date[i])
        //     }
        //     else{
        //         return arr;
        //     }
        // }
        const dateonly = date.substring(0,date.indexOf('T'));
        return dateonly;
    }

    function updatedelstatus(orderitem, delstatus){
        axios.put('http://localhost:5555/products/updateorder',{orderitem, delstatus}).then(response => {
            getOrders(response.data)
            setorderitem(null);
        })
    }

    function deleteOrder(item){
        // console.log(item)
        
        axios.delete(`http://localhost:5555/products/deleteorder/${item}`).then(response => {
            // console.log(response);
            getOrders(response);
        })
    }

    // console.log(orders);

  return (
    <div>
    <table className="table-auto sm:w-full">
        <thead className=''>
          <tr className=''>
            <th>No</th>
            <th>Date</th>
            <th className=''>Email</th>
            <th className=''>Products</th>
            <th className=''>Payment</th>
            <th className=''>Shipping</th>
            <th className=''>Delivery Status</th>
            <th></th>
          </tr>
        </thead>
        {
        
        // orders.filter((item) => {
        //   return search.toLowerCase() === ''
        //   ? item : item.pname.toLowerCase().includes(search);
        // })
        orders.map((item, index) => (
        <tbody key={item._id}>
          <tr className=''>
            <td>{index+1}</td>
            {/* <td><img src='' alt="" className='w-14 h-14 object-fill rounded-full'/></td> */}
            <td>{setDte(item.createdAt)}</td>
            <td>{item.userid}</td>
            
            <td className='text-sm'>
                {selectedItem != null ? <ProductModal open={open} onClose={() => setOpen(false)}>
                    <div className='mx-auto'>
                    <div className='flex justify-evenly py-3'>
                    {Object.keys(selectedItem.products).map((product) => 
                    (<div key={selectedItem.products[product]._id} className='border rounded-md xl:w-full xl:p-3 xl:mt-3 lg:w-full lg:mt-3 '>
                        <p>Product ID: {selectedItem.products[product].id}</p>
                        <p>Quantity: {selectedItem.products[product].quantity}</p>
                        <p>Unit Price: {
                            (selectedItem.products[product].price/100).toFixed(2)
                        }</p>
                    </div>))}
                    
                    </div>
                    </div>
                    <div className='flex justify-center bg-indigo-100 rounded-md'>
                        <p className='text-xl font-bold'>Total {(selectedItem.total/100).toFixed(2)}</p>
                    </div>
                </ProductModal> : ''}
                
                <button className='bg-indigo-600 rounded-md text-white py-1.5 hover:bg-indigo-500 px-2.5' onClick={() => {setSelectedItem(item); setOpen(true);}}>View Products</button>
            </td>
            <td className='text-sm'>
                <ProductModal open={openpayment} onClose={() => setOpenPayment(false)}>
                    <div className='mx-auto'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between w-1/2 mx-auto border p-2 rounded-md mb-3'>
                            <p className='flex items-center'>Payment Method</p>
                            <p className='font-semibold text-lg'>{item.paytype}</p>
                        </div>
                        <div className='flex justify-between w-1/2 mx-auto border-2 p-2 rounded-md'>
                            <p className='flex items-center'>Payment Status</p>
                            <p className='text-center font-semibold text-lg'>{item.payment_status}</p>
                        </div>
                    </div>
                    </div>
                </ProductModal>
                <button className='bg-indigo-600 rounded-md text-white py-1.5 hover:bg-indigo-500 px-2.5' onClick={() => setOpenPayment(true)}>View Payments</button>
            </td>
            <td className='text-sm'>
                
                {selectedShip != null ? <ProductModal open={openship} onClose={() => setOpenShip(false)}>
                    <div className='mx-auto'>
                        <div className='flex flex-col w-2/3 mx-auto '>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>Name</p>
                                <p>{selectedShip.shipping.fname} {selectedShip.shipping.lname}</p>
                            </div>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>Address</p>
                                <p>{selectedShip.shipping.address}</p>
                            </div>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>City</p>
                                <p>{selectedShip.shipping.city}</p>
                            </div>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>Phone</p>
                                <p>{selectedShip.shipping.phone}</p>
                            </div>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>Postal Code</p>
                                <p>{selectedShip.shipping.postal}</p>
                            </div>
                            <div className='mt-3 flex justify-between border rounded-md p-2'>
                                <p>Shipping Cost</p>
                                <p>{selectedShip.shipping.shipcost}$</p>
                            </div>
                            
                        </div>
                    </div>
                </ProductModal> : ''}
                <button className='bg-indigo-600 rounded-md text-white py-1.5 hover:bg-indigo-500 px-2.5' onClick={() => {setSelectedShip(item); setOpenShip(true); }}>Shipping Details</button>
            </td>
            <td className='text-sm'>{item.delivery_status}</td>
            <td className=''>
            {orderitem != null && <ProductModal open={opendelstatus} onClose={() => setopendelstatus(false)}>
            <div className='mx-auto'>
            <div className='w-2/3 mx-auto'>
            <div className='flex justify-between mb-5'>
            <label className='flex items-center'>Change Delivery Status</label>
            <select className='rounded-md' onChange={(e) => setdelstatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
            </select>
            </div>
            <div>
                <button className='w-full bg-indigo-600 rounded-md text-white py-1.5 
                hover:bg-indigo-500 px-2.5'
                onClick={() => {updatedelstatus(orderitem,delstatus); setopendelstatus(false);}}
                >Submit</button>
            </div>
            </div>
            </div>
            </ProductModal>}
              <div className='flex flex-1 gap-x-3'>
                <div className='cursor-pointer' onClick={() => { setorderitem({del: item.delivery_status, delid: item._id});
                setopendelstatus(true);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                <ProductModal open={opendelete} onClose={() => setOpenDelete(false)}>
                <div className='mx-auto'>
                    <p className='text-2xl font-bold text-center'>Are you sure want to delete?</p>
                    <div className='flex justify-between w-1/3 mx-auto mt-10'>
                    <button className='focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                    onClick={() => {deleteOrder(orderitem); setOpenDelete(false)}}
                    >
                        Yes
                    </button>
                    <button className='focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                    onClick={() => setOpenDelete(false)}
                    >
                        No</button>
                    </div>
                    </div>
                </ProductModal>
                </div>
                <div className='text-red-600 cursor-pointer' onClick={() => { setorderitem(item._id);
                    setOpenDelete(true);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
                
              </div>
            </td>
          </tr>
        </tbody>))
    }
      </table>
    </div>
  )
}

export default Orders