import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

const ChangePass = ({currentmail}) => {

  const location=useLocation();
  const fetchemail = location.state.id;
  // console.log(fetchemail)
  const path = useNavigate();

  const [password, setPassword] = useState('');
  const [againpassword, setAgainPassword] = useState('');

  useEffect(() => {
    if(!fetchemail){
      path('/forgot')
    }
  })

  async function changePassword(e){
    e.preventDefault();

    const currentuser = {
      password,
      againpassword,
      fetchemail,
    }

    if(password === againpassword){
      await axios.post('http://localhost:5555/users/verifypass', currentuser).then(response => {
        if(response.data == "updated"){
          toast.success("Password has been changed successfully!")
          setTimeout(() => {
            path('/login');
          },1000)
        }
        else if(response.data == "not updated"){
          toast.error("Password hasn't changed!");
        }
      })
    }

    else{
      toast.error("Passwords don't match");
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
          Change Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" >
        <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                
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
                <div className="flex items-center justify-between mt-2">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                
                </div>
                <div className="mt-2">
                  <input
                    id="passwo"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setAgainPassword(e.target.value)}
                  />
                </div>

              </div>

          

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={changePassword}
            >
              Submit
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  )
}

export default ChangePass
