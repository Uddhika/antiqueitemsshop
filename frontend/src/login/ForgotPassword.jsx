import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import VerifyOTP from './VerifyOTP';
import Login from './Login';

const ForgotPassword = () => {

    const path = useNavigate();

    const [email, setEmail] = useState('');
    const [showotp, setshowotp] = useState('');
    const [btn, setbtn] = useState('show');

    async function submitForgotEmail(e){
        e.preventDefault();

        const emailuser= {
            email,
        }

        await axios.post('http://localhost:5555/users/forgot', emailuser).then(response => {
            if(response.data.msg == "email sent"){
                setshowotp('otp');
                setbtn('hide');
                // setTimeout(() => {
                //     setbtn('');
                // },1000);
                setbtn('');
                toast.success('Please check your email!'); 
                
                // path('/', {state:{id:email}});
            }
            else if(response.data == "no email"){
                setshowotp('');
                toast.error("Email not exist!");
                
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
                    Forgot Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" >
                    <div>
                        <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900" id="emailtext">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="emailfind"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                                placeholder="Ex:- uddhikaishara@gmail.com"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                    </div>

                    

                    {/* {resendbtn === 'show' && <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={submitForgotEmail}
                    >
                        Send Code Again
                    </button>} */}
                    <div>
                        { btn === 'show' && <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={submitForgotEmail}
                        >
                            Send Code
                        </button>}
                        
                    </div>
                    {showotp === 'otp' ? (<VerifyOTP useremail={email}/>) : ""}
                </form>
                <Toaster />
            </div>
        </div>
    )
}

export default ForgotPassword