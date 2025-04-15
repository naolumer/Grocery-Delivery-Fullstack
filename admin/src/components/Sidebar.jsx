import React from 'react'
import { assets } from '../../../client/src/assets/assets'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-[91vh] w-64 absolute left-0
     top-[60px] z-10 border-r bg-white border-gray-300 pt-5'>
    <div className='flex flex-col gap-6 ml-4 '>
        <Link to="/add-product" className="flex items-center w-full gap-3">
            <img  className='w-7 h-7' src={assets.add_icon} alt="" />
            <p className=' text-gray-700'>Add Product</p>
        </Link>
        <Link to="/product-list" className="flex w-full items-center gap-3">
            <img className='w-7 h-7' src={assets.product_list_icon} alt="" />
            <p className=' text-gray-700'>Product List</p>
        </Link>
        <Link to="/orders" className="flex w-full items-center gap-3">
            <img  className='w-7 h-7'src={assets.order_icon} alt="" />
            <p className=' text-gray-700'>Orders</p>
        </Link>
    </div>
    </div>
  )
}

export default Sidebar