import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductShowSpinner = () => {

    const image = '';
    const name = '';
    const desc = '';
    const price = '';

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className='lg:grid w-full md:grid-w-full grid-cols-2'>
        <div className='lg:w-full md:w-full sm:w-full rounded-md'>
            { image || <Skeleton width="610px" height="600px"/>}
        </div>
        <div className=''>
            <h1 className='font-bold text-4xl'>
            { name || <Skeleton width="500px" height="60px"/>}
            </h1>
            <p className='font-light px-10 mt-10'>
            { desc || <Skeleton width="500px" height="200px"/>}
            </p>
            <h2 className='font-bold mt-10 text-2xl'>
            { price || <Skeleton width="500px" height="60px"/>}
            </h2>
        </div>
        </div>
    </div>
  )
}

export default ProductShowSpinner