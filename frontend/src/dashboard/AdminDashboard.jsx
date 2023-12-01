import React, { useEffect, useState } from 'react'
import AddProduct from '../admin/AddProduct';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import ViewProductLists from '../product/ViewProductLists';
import Orders from './Orders';

const AdminDashboard = () => {

    const { authenticate } = useContext(CartContext);
    const {getOrders, orders} = useContext(CartContext);

    const [show, setshow] = useState('dash');
    const [selectedprop, setselectedprop] = useState(null);
    const [inindex, setinindex] = useState(0);

    function setclick(index){
        setinindex(null);
        if(selectedprop !== index){
            setselectedprop(index);
        }
    }

    const navi = [{name: 'Dashboard', show: 'dash', current: true},
                {name: 'Products', show: 'products', current: false},
                {name: 'Orders', show: 'orders', current: false},
    ]

    useEffect(() => {
        authenticate();
        getOrders(); 
    },[])

  return (
    <div>
        <div className='mx-auto px-8'>
        <div className='grid grid-cols-6 w-full h-full mt-10'>
            <div className='col-span-1 border-r'>
                <div className='flex flex-col'>
                        {navi.map((item, index) => (
                            <p key={item.name} className={inindex == index ? 'p-2 bg-indigo-600 cursor-pointer text-white' : selectedprop == index ? 'p-2 border-b border-indigo-600 bg-indigo-600 cursor-pointer text-white' : 'p-2 border-b border-indigo-200 cursor-pointer hover:bg-indigo-600 hover:text-white hover:border-indigo-600'}
                            onClick={() => {setclick(index); setshow(item.show);}}
                            >{item.name}</p>
                        ))}
                </div>
            </div>
            <div className='col-span-5 '>
                <div className='flex justify-center'>
                    <div className='sm:w-full mx-8'>
                        {show == 'dash' && <p>Dashboard</p>}
                        {show == 'products' && <ViewProductLists />}
                        {show == 'orders' && <Orders /> }
                    </div>

                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard