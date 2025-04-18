import React from 'react'
import { assets } from '../../../client/src/assets/assets'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'



const Navbar = () => {
    const goToFrontend = () => {
        window.location.href = 'http://localhost:5173/'
      }

    const {logout} = useContext(AppContext)

  return (
    <div className='flex fixed top-0 right-0 items-center bg-white justify-between py-3 z-50 w-full md:pr-8 pr-3 border-b border-gray-300'>
        <img
            onClick={goToFrontend}
            className='md:w-[155px] w-[140px] md:ml-8 ml-4 cursor-pointer items-center'
            src={assets.logo}
            alt=""
        />
        <div className='flex items-center gap-3'>
            <p className='text-gray-500 text-[17px]'>Hi admin!</p>
            <button onClick={logout} className='text-gray-500 text-sm rounded-full border border-gray-500 px-4 py-1'>Logout</button>
        </div>
    </div> 
  )
}

export default Navbar