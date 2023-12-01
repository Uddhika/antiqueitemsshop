import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { isLogin, logOut } from '../Auth'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import axios from 'axios'

const NavBar = () => {

  const path = useNavigate();

  const {cartcount, setcartdata, setcartcount} = useContext(CartContext);

  const [img, setimg] = useState('');

  const navigation = [
    { name: 'Home', href: "/", current: true },
    { name: 'Why ANTZ?', href: '#', current: false },
    { name: 'Products', href: '#', current: false },
    { name: 'About Us', href: '#', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function Example() {
    return (
      console.log('triggered')
    )
  }

  function logOutUser() {
    logOut();
    delete localStorage['cartdata'];
    setcartcount(0);
    setcartdata([]);
    setTimeout(() => {
      path('/login');
    }, 500)
  }

  useEffect(() => {
    async function authenticate(){
      const res = await isLogin();
      if(res){
        const cemail = res.email;
        const testdata = await axios.post('http://localhost:5555/users/getuserdetails/', {cemail});
        setimg(testdata.data.img);
      }
    }
    authenticate();
  },[])

  return (
    <Disclosure as="nav" className="bg-indigo-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-8"
                    src="http://drive.google.com/uc?export=view&id=1-xLGzxuo4Ol3gfviUYtJlolCJZQMBuV0"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-white text-indigo-600' : 'text-white hover:bg-white hover:text-indigo-600',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button>
                  <a href="/cart">
                <div className='inline-flex'>
                  <p className='absolute ml-4 top-3 text-indigo-600 font-light text-xs bg-white rounded-full px-1.5 py-0.5'>{cartcount}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-3.5 mt-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  </div>
                  </a>
                </button>

                <button
                  type="button"
                  className="relative rounded-full bg-indigo-600 p-1 text-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={img}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (

                          <a
                            href="/userprofile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                            onClick={logOutUser}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-white text-indigo-600' : 'text-white hover:text-indigo-600 hover:bg-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar


