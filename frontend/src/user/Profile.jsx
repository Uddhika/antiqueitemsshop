import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import NavBar from '../home/NavBar'
import toast, { Toaster } from "react-hot-toast";
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useEffect } from 'react';
import { isLogin } from '../Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Profile = () => {

  const path = useNavigate(); 

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');
  const [image, setImage] = useState('');

  const [ptype, setptype] = useState('password');

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
        resolve(fileRead.result);
      }
      fileRead.onerror = (error) => {
        reject(error);
      }
    })
  }

  async function fileUpload(e){
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    const reduceimg = await reduceImage(file);
    const convertimg = await convert64(reduceimg);
    setImage(convertimg);
  }

  async function updateUserInfo(e){

    e.preventDefault();

    const newuserinfo = {
      email,
      fname,
      lname,
      password,
      image
    }

    if(password === conpassword){
      await axios.put('http://localhost:5555/users/updateprofile', newuserinfo).then(response => {
      if(response.data == 'success'){
        toast.success("Profile Updated Successfully!")
      }
      else if(response.data == 'failed'){
        toast.error("Profile not updated!")
      }
      else if(response.data == 'fill'){
        toast.error("Fill all the fields!")
      }
    }).catch(error => {
      console.log(error);
    })
    }

    else{
      toast.error('Passwords are not match!')
    }

  }

  function togglepass(e){
    e.preventDefault();
    if(ptype === 'password'){
      setptype('text');
      return;
    }
    else{
      setptype('password');
    }
  }

  useEffect(() =>{

    async function authenticate(){
      const emailres = await isLogin();
      if(emailres != false){
        console.log('already logged')
        // console.log(emailres)
        const cemail = emailres.email;
        const currentuser = {
          cemail
        }
        const testdata = await axios.post('http://localhost:5555/users/getuserdetails/', currentuser)
        // console.log(testdata.data);
        setFname(testdata.data.fname);
        setEmail(testdata.data.email);
        setLname(testdata.data.lname);
        setImage(testdata.data.img);
      }
      else{
        path("/login")
      }
    }
    authenticate();
  },[])

  return (
    <div> <NavBar />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Personal Information
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="" method="POST" id="demo_form">
            {/* <div className="col-span-full flex justify-center"> */}
            
              <div className="mt-2 flex items-center gap-x-3">
                
                {image == null ? <UserCircleIcon className="h-20 w-20 text-gray-300" aria-hidden="true" /> : 
                <div className=''><img src={image} className='w-20 h-20 rounded-full'/></div>
                }
                
                <input type='file' className='
                file:bg-gradient-to-b file:from-indigo-500 file:to-indigo-600
                file:px-2 file:py-1 file:m-5
                file:border-none
                file:rounded-md
                file:text-white
                file:cursor-pointer
                file:shadow-lg file:shadow-indigo-600/50' 
                accept='.jpeg, .png, .jpg'
                onChange={(e) => fileUpload(e)}
                />
              </div>
            
    
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="text-left block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              
              <div className="mt-2">
                <input
                  value={fname}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex:- Uddhika"
                  onChange={(e) => {setFname(e.target.value)}}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="text-left block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  value={lname}
                  type="text"
                  name="first-name"
                  id="last-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex:- Ishara"
                  onChange={(e) => {setLname(e.target.value)}}
                />
              </div>
            </div>

              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Ex:- uddhikaishara@gmail.com"
                    onChange={(e) => {setEmail(e.target.value)}}
                    
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2 flex flex-1">
                <input
                    id="password"
                    name="password"
                    type={ptype}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value) }
                    
                  />
                  
                  <div className='flex flex-1 items-center ml-2 border-2 px-2 hover:bg-indigo-200 cursor-pointer'>
                  <button onClick={togglepass}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="indigo" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                <input
                    id="passwordcn"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={updateUserInfo}
                >
                  Update
                </button>
                <Toaster />
              </div>
            </form>

          </div>
          
        </div>
    </div>
  )
}

export default Profile