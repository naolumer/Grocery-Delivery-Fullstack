import React from 'react'

const Contact = () => {
  return (
    <div id='contact' className='md:w-[85%] mx-auto w-[91%] flex flex-col gap-8 items-center justify-center text-center mb-32'>
      <div>
        <h1 className='lg:text-4xl md:text-3xl text-2xl text-gray-700 font-semibold mb-3'>Never Miss A Deal!</h1>
        <p className='text-gray-400 md:text-lg text-[15px] '>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
      </div>

      <div className='xl:w-[50%] lg:w-[65%] md:w-[75%] w-[94%] border border-gray-300 rounded-md text-center flex justify-between mt-2 mr-2 sm:mr-0'>
          <input className='outline-none px-2 sm:px-3 py-[8px] sm:py-[13px] placeholder:text-gray-400 text-gray-600' placeholder='Enter your email id' type="text" />
          <button className='rounded-r-[4px] px-3 sm:px-9 bg-[#3cc489] text-white'>Subscribe</button>
      </div>
    </div>
  )
}

export default Contact