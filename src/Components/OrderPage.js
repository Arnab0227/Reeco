import React from 'react'

function OrderPage() {
  return (
    <div>
      <div className='w-full h-24 shadow-lg overflow-hidden'>
        <div className='flex space-x-4 ml-20'>
          <p className='cursor-pointer'>Orders</p>
          <p>&gt;</p>
          <p className='underline cursor-pointer'>order 32457ABC</p>
        </div>
        <div className=' flex justify-between mt-8 ml-20'>
          <div className='font-semibold text-2xl'>Order 32457ABC</div>
          <div className='flex space-x-2 mr-20'>
            <button className='border-2 border-green-800 w-16 h-8 rounded-2xl text-gray-800 font-semibold cursor-pointer  hover:bg-green-800 hover:text-white'> back</button>
            <button className='w-32 h-8 bg-green-800 rounded-2xl text-white font-semibold cursor-pointer  hover:bg-white hover:text-green-800 hover:border-2 hover:border-green-800'>Approve order</button>
          </div>
        </div>
      </div>
      <div className='mt-8 mx-20 border-2 border-gray-300 h-32 rounded-lg'>
        <div className='m-5 h-20 flex justify-between'>
          <div className='  px-4'>
            <div>Supplier</div>
            <div className='font-semibold'>East Coast fruits & vegetables</div>
          </div>
          <div className='border-l  px-4'>
            <div className=''>Shipping Date</div>
            <div className='font-semibold'>Thu, feb 10</div>
          </div>
          <div className='border-l px-4'>
            <div>Total</div>
            <div className='font-semibold'>$ 15028.3</div>
          </div>
          <div className='border-l px-4'>
            <div>category</div>
            <div className='font-semibold'>East Coast fruits & vegetables</div>
          </div>
          <div className='border-l px-4'>
            <div>Department</div>
            <div className='font-semibold'>300-444-678</div>
          </div>
          <div className='border-l px-4'>
            <div>Status</div>
            <div className='font-semibold'>Awaiting your approval</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
