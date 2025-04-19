import React, { useContext } from 'react'
import FoodCard from './FoodCard'
import { AppContext } from '../context/AppContext'
const BestSellers = () => {
    const {allProducts} = useContext(AppContext)
  return(
      <div className='mt-10 w-[85vw] mx-auto'>
          
          <h1 className='text-3xl font-medium  text-gray-700'>Best Sellers</h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-12 mb-[113px]'>
              {
                 allProducts.slice(3,8).map((item,index)=> (
                    <FoodCard item={item} index={index}/>
                ))
              }
          </div>
      </div>
    )
}

export default BestSellers