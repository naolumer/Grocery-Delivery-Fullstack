import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import FoodCard from '../components/FoodCard'



const CatFoods = () => {
  
  const {category,allProducts} = useContext(AppContext)
  const {categories} = useParams()

  const filteredProducts = allProducts.filter((food)=> food.category===category)
  return (
    <div className='mt-6 w-[85%] mx-auto mb-32'>
      <div className='absolute mb-5'>
            <h1 className='relative text-2xl text-gray-800 font-medium'>{categories} Products
            <div className='h-[1px] w-[63px] bg-[#41bd87] rounded-lg absolute right-0 -bottom-[2px]'></div>
            </h1> 
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-16'>
          {
        filteredProducts.map((item,index)=>(
                <FoodCard item={item} index={index}/>
             )    
        )
      }
        </div>
      
      
      
    </div>
  )
}

export default CatFoods