import React from 'react'
import { assets } from '../../../client/src/assets/assets'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"


const Navbar = () => {
    const goToFrontend = () => {
        window.location.href = 'http://localhost:5173/'
      }

    const {setIsLoggedIn,setAtoken} = useContext(AppContext)
    const navigate = useNavigate()

    const logout = () => {
          localStorage.removeItem("atoken"); 
          setAtoken(false); 
          setIsLoggedIn(false);
          toast.success("Logout successful!")
          navigate("/login"); 
        };

  return (
    <div className='flex absolute top-0 right-0 items-center justify-between py-3 w-full md:pr-8 pr-3 border-b border-gray-300'>
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