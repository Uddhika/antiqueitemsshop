import React, { useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import AddProduct from '../admin/AddProduct';
import ProductModal from '../modal/ProductModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

const ViewProductLists = () => {

  const path = useNavigate();

  const {product, setProduct} = useContext(CartContext);
  
  const [search, setsearch] = useState('');
  const [open, setOpen] = useState(false);
  const [opendelete, setOpenDelete] = useState(false);
  const [productid, setproductid] = useState('');
  const [openupdate, setOpenUpdate] = useState(false);
  const [productitem, setpoductitem] = useState(null);

  function deleteProduct(item){
    // console.log(item)
    axios.delete(`http://localhost:5555/products/deleteproduct/${item}`).then((response) => {
      // console.log(response);
      if(response.data.message == 'deleteok'){
        setProduct(response.data.data);
        toast.success("Product Deleted Successfully!")
        setOpenDelete(false);  
      }
      else if(response.data.message == 'notdelete'){
        toast.error("Product not Deleted!")
      }
    })

  }
  
  return (
    <div>

      <div className="w-full flex justify-between">
        {/* <label htmlFor="first-name" className="text-left block text-normal font-bold leading-6 text-gray-900">
          Search
        </label> */}
        <div className='w-full flex justify-start'>
        <div className="w-3/4">
            <input
              type="text"
              name="first-name"
              id="last-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 ps-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search product"
              onChange={(e) => {setsearch(e.target.value)}}
            />
        </div>

        {/* <div className='flex items-center px-1.5 ring-1 rounded-full mx-4 cursor-pointer bg-indigo-600 hover:text-white hover:bg-indigo-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div> */}

        </div>

        <div className='w-1/4 flex justify-end'>
          { open == true && <div>
            <ProductModal open={open} onClose={() => setOpen(false)}>    
              <AddProduct onClose={() => setOpen(false)}/>      
            </ProductModal>
          </div>}
          <button className='bg-indigo-600 text-white rounded-md px-3 py-1.5 hover:bg-indigo-500'
          onClick={() => setOpen(true)}
          >Add Product</button>
        </div>
        
        <div>
          <ProductModal open={openupdate} onClose={() => setOpenUpdate(false)}>    
            <UpdateProduct onClose={() => setOpenUpdate(false)} item={productitem} product={product}/>      
          </ProductModal>
        </div> 
        <div>
          <ProductModal open={opendelete} onClose={() => setOpenDelete(false)}>
              <div>
                <p className='text-2xl font-bold'>Are you sure want to delete?</p>
                <div className='flex justify-between w-1/3 mx-auto mt-10'>
                  <button className='focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                  onClick={() => deleteProduct(productid)}
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
      </div>

      <table className="table-auto sm:w-full">
        <thead className=''>
          <tr className=''>
            <th>No</th>
            <th className=''>Image</th>
            <th className=''>Name</th>
            <th className=''>Description</th>
            <th className=''>Price</th>
            <th></th>
          </tr>
        </thead>
        {product.filter((item) => {
          return search.toLowerCase() === ''
          ? item : item.pname.toLowerCase().includes(search);
        }).map((item, index) => (
        <tbody key={item._id}>
          <tr className=''>
            <td>{index+1}</td>
            <td><img src={item.pimg} alt="" className='w-14 h-14 object-fill rounded-full'/></td>
            <td className='text-sm'>{item.pname}</td>
            <td className='text-sm text-justify'>{item.pdesc}</td>
            <td className='text-sm'>{item.price}$</td>
            <td className=''>
              <div className='flex flex-1 gap-x-3'>
                <div className='cursor-pointer' onClick={() => { setpoductitem(index);
                setOpenUpdate(true);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div className='text-red-600 cursor-pointer' onClick={() => {setOpenDelete(true);
                  setproductid(item._id);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
                
              </div>
            </td>
          </tr>
        </tbody>))}
      </table>       
    </div>
  )
}

export default ViewProductLists