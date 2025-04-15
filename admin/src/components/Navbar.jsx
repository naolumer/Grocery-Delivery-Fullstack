import React from 'react'
import { assets } from '../../../client/src/assets/assets'


const Navbar = () => {
    const goToFrontend = () => {
        window.location.href = 'http://localhost:5173/'
      }

  return (
    <div className='flex items-center justify-between py-3 w-full px-3 md:pr-8 border-b border-gray-300'>
        <img
            onClick={goToFrontend}
            className='md:w-[155px] w-[130px] ml-3 md:ml-5 lg:ml-12 cursor-pointer items-center'
            src={assets.logo}
            alt=""
        />
        <div className='flex items-center gap-3'>
            <p className='text-gray-500 text-[17px]'>Hi admin!</p>
            <button className='text-gray-500 text-sm rounded-full border border-gray-500 px-4 py-1'>Logout</button>
        </div>
    </div>
    
  )
}

export default Navbar