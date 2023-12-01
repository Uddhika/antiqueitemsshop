import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { isLogin, setAuthentication } from '../Auth';


const Login = () => {

  const path = useNavigate();
  let currentuseremail = '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function authenticate(){
    if(await isLogin()){
      path('/');
    }
  }

  useEffect(() => {
    authenticate();
  },[]);

  async function submit(e){
    e.preventDefault();
    
    try{

      const checkUser = {
        email,
        password,
      }

      await axios.post('http://localhost:5555/users/', checkUser).then
      (response => {
        // console.log(response.data);
        if(response.data.msg == "exist"){
          // setTimeout(() => {
          //   path('/',{state:{id:email}});
          // }, 1000);
          // console.log(response.data.token);
          setAuthentication(response.data.token);
          path('/', {state:{id:email}});
        }
        else if(response.data == "invalid details"){
          // alert("user have not sign up");
          toast.error("Invalid Email or Password!");
        }
        else if(response.data == "not exist"){
          toast.error("Email not exist!");
        }
      }).catch(e => {
        alert("wrong details");
        console.log(e);
      })
    }
    catch(e){
      console.log(e);
    }

  }

  async function sendgoogleauth(credentialResponse){

    const goauth = {
      credentialResponse,
    }

    await axios.post('http://localhost:5555/users/googleauth', goauth).then(response => {
      if(response.data.msg == 'success'){
        toast.success("Login succeeded!")
        // path('/');
        setAuthentication(response.data.token);
        currentuseremail = response.data.email;
        setTimeout(() => {
          path('/', {state:{id:currentuseremail}});
        }, 1000)
      }
      else if(response.data.msg == 'not success'){
        toast.error("Login not succeeded!")
      }
    }).catch(error => {
      console.log(error);
    })

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
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" >
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
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " 
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
                  <div className="text-sm">
                    <Link to="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submit}
                >
                  Sign in
                </button>
                <div className='py-6'>
                <GoogleOAuthProvider clientId="950418358243-548qdhclmto9cnmon4ajdf3ck1r604ad.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      // console.log(credentialResponse);
                      sendgoogleauth(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    
                />
                </GoogleOAuthProvider>
                </div>
                <Toaster />
              </div>
            </form>
  
            <p className="mt-2 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
              {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </a> */}
            </p>
          </div>
        </div>
      
    )
  }

export default Login