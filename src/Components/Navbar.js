import React from 'react'
import logo from './logo.44b75468.svg'
import {BsCart3} from "react-icons/bs"
import {RiArrowDropDownLine} from "react-icons/ri"

function Navbar() {
  return (
    <div className='w-full h-16 bg-green-700 flex justify-between items-center'>
      <div className='w-96 flex  justify-between space-x-10 ml-20 text-white'>
        
        <div className='cursor-pointer'>Store</div>
        <div className='cursor-pointer'>Orders</div>
        <div className='cursor-pointer'>Analytics</div>
      </div>
      <div className='flex w-56 justify-end mr-20 space-x-10 text-white'>
        <div className='cursor-pointer'><BsCart3 /></div>
        <div className='flex items-center'>
            <div className='cursor-pointer'>Hello, james</div> 
            <div className='cursor-pointer'><RiArrowDropDownLine /></div>
        </div>
            <div></div>
      </div>
    </div>
  )
}

export default Navbar
