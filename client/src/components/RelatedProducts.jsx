import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from "../context/AppContext"
import { Link, useNavigate } from 'react-router-dom'
import FoodCard from './FoodCard';
import { dummyProducts } from '../assets/assets';


const RelatedProducts = () => {

  const {category} = useContext(AppContext)
  const [related,setRelated] = useState([])
  const navigate = useNavigate()

  const getRelated = ()=>{
    const relatedProducts = dummyProducts.filter((food)=> food.category===category)
    setRelated(relatedProducts)
  }

  useEffect(()=>{
    getRelated()
  },[category])

  return (
    <div className=' mx-auto mt-20 '>
      <div className='absolute ml-[28%]  lg:ml-[35%]'>
            <h1 className='relative text-3xl text-gray-800 font-medium w-full mx-auto'>Related Products
            <div className='h-[2px] w-[67px] bg-[#4bc892] rounded-lg absolute right-20 -bottom-[8px]'></div>
            </h1> 
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-20'>
            {
                related.map((item,index)=> (
                  <FoodCard item={item} index={index}/>
                ))
            }
    
        </div>
        
        <div className='flex items-center justify-center mt-16'>
            <button onClick={()=>{navigate("/products"); window.scrollTo({ top: 0, behavior: 'smooth' });}} className='text-green-500 px-12 py-3 border border-green-500 rounded-md 
            hover:bg-slate-50'>See more</button>
        </div>
    </div>
  )
}

export default RelatedProducts