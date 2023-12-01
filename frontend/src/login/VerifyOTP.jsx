import React, { useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

const VerifyOTP = ({useremail}) => {

    // console.log(useremail);

    const path = useNavigate();
    const [crcode, setcrcode] = useState('');

    async function setCode(e){

        e.preventDefault();
        const currentcode = {
            crcode,
        }

        await axios.post('http://localhost:5555/users/verify', currentcode).then(response => {
            if(response.data == "match"){
                path('/changepass', {state:{id:useremail}});
            }
            else if(response.data == "not match"){
                toast.error("OTP is not correct!")
            }
        }).catch(error => {
            console.log(error);
        })
    }

    // console.log(response);
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
    {/* <OTPInput value={OTP} onChange={(e) => { setOtp(e.target.value) }} autoFocus OTPLength={4} otpType="number" disabled={false} className="opt-container" secure /> */}
          <div className="sm:col-span-3">
              <label htmlFor="first-name" className="text-left block text-sm font-medium leading-6 text-gray-900">
                  Enter the code
              </label>
              <div className="mt-2">
                  <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Ex:- 756345"
                      onChange={(e) => { setcrcode(e.target.value) }}
                  />
              </div>
          </div>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={setCode}
          >
              Verify
          </button>
      </div>
      
  )
}

export default VerifyOTP