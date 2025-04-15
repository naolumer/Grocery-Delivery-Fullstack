import React, { useState } from 'react'
import { assets } from '../../../client/src/assets/assets'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('add-product') // default active

  const baseClass = 'flex items-center w-full gap-3 pl-3 py-3 '
  const isActiveClass = 'bg-[#e5f4ea] border-r-[5px] border-[#3cc489]'

  return (
    <div className='h-[91vh] w-[60px] md:w-64 absolute left-0 top-[60px] z-10 border-r bg-white border-gray-300 pt-3'>
      <div className='flex flex-col w-full gap-1'>
        <Link
          to="/add-product"
          onClick={() => setActiveItem('add-product')}
          className={`${baseClass} ${activeItem === 'add-product' ? isActiveClass : 'hover:bg-gray-100'}`}
        >
          <img className='w-7 h-7' src={assets.add_icon} alt="" />
          <p className='text-gray-700 hidden md:inline-block'>Add Product</p>
        </Link>

        <Link
          to="/product-list"
          onClick={() => setActiveItem('product-list')}
          className={`${baseClass} ${activeItem === 'product-list' ? isActiveClass : 'hover:bg-gray-100'}`}
        >
          <img className='w-7 h-7' src={assets.product_list_icon} alt="" />
          <p className='text-gray-700 hidden md:inline-block'>Product List</p>
        </Link>

        <Link
          to="/orders"
          onClick={() => setActiveItem('orders')}
          className={`${baseClass} ${activeItem === 'orders' ? isActiveClass : 'hover:bg-gray-100'}`}
        >
          <img className='w-7 h-7' src={assets.order_icon} alt="" />
          <p className='text-gray-700 hidden md:inline-block'>Orders</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
