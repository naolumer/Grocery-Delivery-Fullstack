import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { GiShoppingCart } from "react-icons/gi";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const {cart,query,setQuery,showLogin,setShowLogin,loggedIn,setLoggedIn} = useContext(AppContext)

    const totalCartItems = cart.reduce((sum , item)=> sum + item.quantity,0)


    // const toggleMenu = ()=>{
    //     setShowMenu(!showMenu)
    // }

  return (
    <>
    
    <div className='flex items-center justify-between py-4  w-[93%] mx-auto '>
        <img onClick={()=>navigate("/")} className='w-[150px] ml-3 md:ml-5 lg:ml-12 cursor-pointer items-center' src={assets.logo} alt="" />

        <div className='flex items-center justify-between gap-8 lg:gap-6 md:px-16 '>
            <button className='text-gray-600 text-[11px] rounded-full px-4 py-1 border border-gray-400 hidden md:block flex-shrink-0'>seller dashboad</button>
            {/* <button className='text-gray-600 text-[11px] rounded-full px-4 py-1 border border-gray-400 hidden md:block lg:hidden'>seller db</button> */}
            <div className='items-center md:text-[17px] gap-8 md:gap-5 text-gray-700 cursor-pointer hidden md:flex flex-shrink-0'>
                <Link to="/">Home</Link>
                <Link to="/products">All Products</Link>
            </div>

            <div className='items-center rounded-full px-5 py-[5px] border border-gray-300 hidden lg:flex'>
                <input className='outline-none placeholder:text-sm placeholder:text-gray-500 text-gray-600 text-sm' 
                    type="text"
                    placeholder='search products' 
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}/>
                
                <img src={assets.search_icon} alt=""
                 />
                
            </div>

            <div className='flex items-center gap-8 md:gap-6 pr-3 md:pr-0 '>
                <div onClick={()=>navigate("/cart")}  className='relative cursor-pointer'>
                    <GiShoppingCart className='w-7 h-7 text-gray-600 '/>
                    <p className='absolute w-[19px] h-[19px] bg-[#3cc489] rounded-full -top-1 -right-2  
                    text-white text-[11px] flex items-center justify-center'>
                        <span className=''>{totalCartItems}</span></p>
                </div>

                { !showMenu &&
                   <RiMenu3Line onClick={()=>setShowMenu(true)} className='md:hidden w-7 h-7 text-gray-900 cursor-pointer'/> 
                }
                
                {showMenu && 
                    <IoMdClose onClick={()=>setShowMenu(false)} className='md:hidden w-7 h-7 text-gray-900 cursor-pointer'/>
                }
                {!loggedIn && 
                <button onClick={()=>setShowLogin(true)} className='py-2 px-8 rounded-full bg-[#3cc489] text-white  hidden md:block'>Login</button> }
                {
                    loggedIn && 
                    <div className='group relative hidden md:block'>
                        <img className='w-10 h-10' src={assets.profile_icon} alt="" />
                        <div className='group-hover:block hidden absolute -bottom-[88px] py-2 -right-2 bg-white z-40 
                        rounded-md border border-gray-300 shadow-md w-28'>
                            <p onClick={()=>navigate("/my-orders")} className='text-gray-700 text-sm text-start p-2  hover:bg-slate-100 rounded-md cursor-pointer'>My Orders</p>
                            <p onClick={()=>setLoggedIn(false)} className='text-gray-700 text-sm text-start p-2  hover:bg-slate-100 rounded-md cursor-pointer'>Logout</p>
                        </div>
                    </div>
                }
                
            </div>

             {/* mobile menu */}
             
             
        </div>
    </div>
        { showMenu &&
            <div className='flex flex-col items-start p-5 gap-3 bg-white text-gray-700 shadow-md md:hidden'>
                <Link onClick={()=>setShowMenu(false)} to="/">Home</Link>
                <Link onClick={()=>setShowMenu(false)} to="/products">All Products</Link>
                <a className='' href="#contact" onClick={()=>setShowMenu(false)}>Contact</a>
                <button onClick={()=>{setShowMenu(false); setShowLogin(true)}} className='py-1 px-8 rounded-full bg-[#3cc489] -ml-2 text-white'>{loggedIn?"Logout":"Login"}</button>
             </div>}
    </>
  )
}

export default Navbar