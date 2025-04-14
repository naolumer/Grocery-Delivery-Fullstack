import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='relative md:w-[85%] w-[91%]  mx-auto rounded-lg mb-24'>
      <div>
          <img className='hidden md:block' src={assets.bottom_banner_image} alt="" />
          <img className='md:hidden' src={assets.bottom_banner_image_sm} alt="" />
      </div>

      <div className='flex flex-col gap-4 absolute top-[16vw] right-[10vw] sm:top-[20vw] sm:right-[25vw] md:top-[5vw] md:right-[6vw]'>
        <div>
          <h1 className='xl:text-3xl lg:text-2xl md:text-[20px] text-2xl  font-bold text-[#3cc489] mb-3 md:mb-0 lg:mb-2'>Why We Are The Best ?</h1>
        </div>
        <div className='flex flex-col gap-[8px] md:gap-[3px] lg:gap-[5px] xl:gap-3'>
          <div className='flex items-center gap-5'>
              <img className='w-9 md:w-8 lg:w-12' src={assets.delivery_truck_icon} alt="" />
              <div>
                <h2 className='font-semibold text-gray-700 text-[18px] lg:text-[15px] md:text-[16px] xl:text-[20px]'>Fastest Delivery</h2>
                <p className='text-gray-400 text-[12px] lg:text-sm md:text-[13px] md:hidden lg:block'>Groceries delivered in under 30 minutes.</p>
              </div>
          </div>
          <div className='flex items-center gap-5'>
            <img className='w-9 md:w-8 lg:w-12' src={assets.leaf_icon} alt="" />
            <div>
                <h2 className='font-semibold text-gray-700 text-[18px] lg:text-[15px] md:text-[16px] xl:text-[20px]'>Freshness Guaranteed</h2>
                <p className='text-gray-400 text-[12px] lg:text-sm md:text-[13px] md:hidden lg:block'>Fresh produce straight from the source.</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <img className='w-9 md:w-8 lg:w-12' src={assets.coin_icon} alt="" />
            <div>
              <h2 className='font-semibold text-gray-700 text-[18px] lg:text-[15px] md:text-[16px] xl:text-[20px]'>Affordable Prices</h2>
              <p className='text-gray-400 lg:text-sm text-[12px] md:text-[13px] md:hidden lg:block'>Quality groceries at unbeatable prices.</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <img className='w-9 md:w-8 lg:w-12' src={assets.trust_icon} alt="" />
            <div>
              <h2 className='font-semibold text-gray-700 text-[18px] lg:text-[15px] md:text-[16px] xl:text-[20px]'>Trusted By Thousands</h2>
              <p className='text-gray-400 text-[12px] lg:text-sm md:text-[13px] md:hidden lg:block'>Loved by 10,000+ happy customers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About