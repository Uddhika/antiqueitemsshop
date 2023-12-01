import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { isLogin } from '../Auth';

const SignUp = () => {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');

  const path= useNavigate();

  async function authenticate(){
    if(await isLogin()){
      path('/');
    }
  }

  useEffect(() => {
    authenticate();
  }, [])

  async function signupSubmit(e){
    e.preventDefault();
  
    try{

      const newUser = {
        fname,
        lname,
        email,
        password,
      };

      await axios.post("http://localhost:5555/users/signup", newUser).then(response => {
        if(response.data == "done saving"){
          // alert("successfully registered");
          
          toast.success('Successfully Registered!');

          const formToReset = document.getElementById('demo_form');
          formToReset.reset();
          
          setTimeout(() => {
            path('/login');
          }, 1000);
          // path('/login');

        }
        else if(response.data == "please fill all details"){
          toast.error("Make sure to fill all the details!")
        }

        else if(response.data == "user already exist"){
          toast.error("User already exist!")
        }
      }).catch((e) => {
        alert('request not send');
        console.log(e);
      })
    }
    catch(error){
      console.log(error);
    }
    
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" id="demo_form">
              
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="text-left block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={signupSubmit}
                >
                  Sign Up
                </button>
                <Toaster />
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
              {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </a> */}
            </p>
          </div>
          
        </div>
  )
}

export default SignUp