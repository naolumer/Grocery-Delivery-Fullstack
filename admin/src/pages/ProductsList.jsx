import React from 'react'
import axios from "axios"
import { useState } from 'react'


const ProductsList = () => {
  const [products,setProducts] = useState([])


  return (
    <div className='md:mt-24 mt-[73px] ml-20 md:ml-72 z-20'>
      <p className='text-gray-700 font-medium text-lg'>All Product</p>
    </div>
  )
}

export default ProductsList