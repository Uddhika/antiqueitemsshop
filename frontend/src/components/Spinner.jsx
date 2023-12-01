import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Spinner = () => {

    const pname = '';
    const pprice = '';
    const pimage = '';

  return (

            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                {pimage || <Skeleton width="260px" height="320px"/>}
            </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="">
                      <span aria-hidden="true" className="" />
                      {pname || <Skeleton width="150px"/>}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500"></p>
                </div>
                
                <p className="text-sm font-medium text-gray-900">
                {pprice || <Skeleton width="55px"/>}
                </p>
              </div>
              
            </div>
  )
}

export default Spinner