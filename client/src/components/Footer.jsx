import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='mt-3 bg-teal-50 w-full flex flex-col'>
      <div className='w-[98%] md:w-[90%] mx-auto  grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-[3fr_1fr_2fr_1fr] xl:grid-cols-[5fr_1fr_1fr_2fr] items-start -ml-4 sm:ml-0  p-12'>
        <div className='mb-5 md:mb-0 w-48 md:w-[220px] lg:w-[330px] '>
          <img className='w-32  mb-4' src={assets.logo} alt="logo" />
          <p className='text-gray-500 text-[14px] lg:text-[16px]'>We deliver fresh groceries and snacks straight to your  door. 
            Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
        </div>
        <div className=' sm:ml-10 md:ml-16 mt-4 sm:mt-0 lg:ml-12 w-full'>
          <h1 className='text-gray-800 text-[16px] font-semibold mb-4 '>Quick links</h1>
          <ul className='text-gray-500 text-sm flex flex-col gap-1'>
            <a href="#"><li className='hover:underline cursor-pointer'>Home</li></a>
            <a href="#"><li className='hover:underline cursor-pointer'>Best sellers</li></a>
            <a href="#"><li className='hover:underline cursor-pointer'>Offers and deals</li></a>
            <a href="#"><li className='hover:underline cursor-pointer'>Contact us</li></a>
            <a href="#"><li className='hover:underline cursor-pointer'>FAQs</li></a>
          </ul>
        </div>
        <div className='md:ml-6 mt-6 sm:mt-0  lg:ml-24 xl:w-full'>
          <h1 className='text-gray-800 text-[16px] font-semibold mb-4'>Need help ?</h1>
          <ul className='text-gray-500 text-sm flex flex-col gap-1'>
            <a href="#"><li className='hover:underline cursor-pointer '>Delivery Information</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Return & Refund Policy</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Payment Methods</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Track Your Order</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Contact Us</li></a>
          </ul>

        </div>
        <div className='md:ml-0 mt-6 md:mt-6 xl:ml-28 lg:ml-10 lg:mt-0 sm:ml-12 '>
          <h1 className='text-gray-800 text-[16px] font-semibold mb-4 md:mb-3'>Follow Us</h1>
          <ul className='text-gray-500 text-sm flex flex-col gap-1'>
            <a href="#"><li className='hover:underline cursor-pointer '>Instagram</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Twitter</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Facebook</li></a>
            <a href="#"><li className='hover:underline cursor-pointer '>Youtube</li></a>
          </ul>
        </div>  
      </div>
     <div className='border-t border-gray-300 flex items-center justify-center p-4 gap-2 text-gray-700'>
      <p className='text-[12px] sm:text-[16px]'>Copyright 2025 ©</p>
      <p className='text-[12px] sm:text-[16px]'>GreenCart</p>
      <p className='text-[12px] sm:text-[16px]'>All Rights Reserved.</p>
     </div>
    </div>
  )
}

export default Footer