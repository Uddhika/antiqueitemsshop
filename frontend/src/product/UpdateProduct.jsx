import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { isLogin } from '../Auth';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const UpdateProduct = ({onClose, item, product}) => {

    const {setProduct} = useContext(CartContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState('');

    async function reduceImage(file){
        const options= {
            maxSizeMB: 0.1,
        }
        const compressedfile = await imageCompression(file, options);
        return compressedfile;
    }

    async function convert64(file){
        return new Promise((resolve, reject) => {
            const fileRead = new FileReader();
            fileRead.readAsDataURL(file);
            fileRead.onload = () => {
                resolve(fileRead.result)
            };
            fileRead.onerror = (error) => {
                reject(error);
            }
    })}

    async function fileUpload(e){
        
        const file = e.target.files[0];
        // console.log(e.target);
        setImage(URL.createObjectURL(file));
        const reduceimg = await reduceImage(file);
        const convertimg = await convert64(reduceimg);
        // console.log(convertimg);
        // document.getElementById('showimg');
        setImage(convertimg);
    }

    function productsubmit(e){
        e.preventDefault();

        const productdata = {
            name,
            price,
            desc,
            image,
            id
        }
        
        axios.put("http://localhost:5555/products/updateproduct", productdata)
        .then(response => {
            if(response.data.msg == 'updated'){
                setProduct(response.data.data);
                const formdata = document.getElementById('demo_form');
                formdata.reset();
                toast.success('Product Updated Successfully!')
                setTimeout(() => {
                  onClose();
                }, 1000);
                
            }
            else if(response.data.msg == 'fill'){
                toast.error('Fill all the details!')
            }
            else if(response.data.msg == 'not updated'){
                toast.error('Updating Failed!')
            }
        })

    }

  useEffect(() => {
    const products = product[item];
    
    if(products){
      setName(products.pname)
      setPrice(products.price)
      setImage(products.pimg)
      setDesc(products.pdesc)
      setId(products._id)
    }
      // console.log(products)
    
  },[item])
      
  return (
    
    <div>
    <div className="max-w-2xl">
          
          <div className="">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <p className='text-xl font-bold'>Update Product</p>
          </div>
  
          <div className="mt-7 sm:w-full">
            <form className="space-y-6" action="#" method="POST" id="demo_form">

            <div className="w-full">
              <label htmlFor="first-name" className="text-left block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                    value={name}
                  type="text"
                  name="first-name"
                  id="last-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=""
                  onChange={(e) => {setName(e.target.value)}}
                />
              </div>
            </div>

              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    value={price}
                    id="price"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder=""
                    onChange={(e) => {setPrice(e.target.value)}}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Product Description
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    value={desc}
                    id="desc"
                    name="password"
                    type="text"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder=""
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>

              
              <div className="mt-2 flex justify-between border-gray-900/25 py-3">
                <div className='flex items-center'>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                        Product Image
                    </label>
                </div>
                
                <div className="text-center outline outline-slate-300 outline-1 px-3 py-3">
                  {image == '' ? <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/> : <div className='flex justify-center'><img src={image} className='w-12 h-12'/></div>}
                  <div className="mt-2 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" accept='.jpeg, .png, .jpg' className="sr-only" onChange={(e) => fileUpload(e)}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={productsubmit}
                >
                  Update Product
                </button>
                <Toaster />
              </div>
            </form>
          </div>  
          
    </div>
    </div>      

  )
}

export default UpdateProduct