import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='w-[92%] md:w-[85%] mx-auto mt-10'>

        <div className='md:hidden relative'>
            
        <img src={assets.main_banner_bg_sm} className='w-full rounded-md' alt="" />
            <div className='absolute bottom-[110px] left-[15%] sm:left-[32%] lg:left-[92px]  '>
            <p className='font-bold text-3xl text-gray-700 leading-[38px]  text-center'>Freshness You Can<br />
            Trust, Savings You <br />
             Will Love!</p>
            <div className='mt-6 ml-[43px] '>
                <button onClick={()=> navigate("/products")} className='flex items-center  font-medium text-lg text-white bg-[#3db480] py-[9px] px-6 rounded-[4px] hover:bg-[#33b07a]'>
                    Shop now
                    <IoIosArrowRoundForward className='w-7 h-7 group-hover:translate-x-1 text-white transition-transform duration-100 '/>
                </button>
                
            </div>
            </div>
        </div>

        <div className='relative hidden md:block'>
            <img src={assets.main_banner_bg} className='w-full rounded-md' alt="" />
            <div className='absolute top-[9%] lg:top-[20%] left-[70px] lg:left-[92px]  '>
            <p className='font-bold text-4xl lg:text-5xl text-gray-700 leading-[45px] lg:leading-[58px]'>Freshness You Can<br />
            Trust, Savings You <br />
             Will Love</p>
            <div className='flex gap-3 mt-6 lg:mt-5'>
                <button onClick={()=> navigate("/products")} className='font-semibold text-lg text-white bg-[#3cc489] py-[8px] lg:py-[10px] px-8 rounded-md hover:bg-[#33b07a]'>
                    Shop now</button>
                <button className='flex gap-1 items-center text-gray-700 font-semibold rounded-md py-[8px] lg:py-[10px] px-8 group'>
                    Explore deals
                    <IoIosArrowRoundForward className='w-7 h-7 group-hover:translate-x-1 text-black transition-transform duration-100'/>
                </button>
                
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header