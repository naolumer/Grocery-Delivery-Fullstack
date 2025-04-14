import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

const MyOrders = () => {
  const { orders} = useContext(AppContext)

  

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB');
  }
  const currentDate = formatDate(Date.now());

  return (
    <div className='md:w-[85%] w-[90%] mt-12 mx-auto mb-64'>
      <div className=' mb-8'>
            <h1 className='relative text-2xl text-gray-700 font-medium'>MY ORDERS
            </h1> 
      </div>

      <div className='flex flex-col gap-12'>
        {orders?.map((orderItem,index)=>(
        <div key={index} className='border border-gray-300 rounded-lg w-[98%] md:w-[80%] p-3 shadow-md'>
          <div className='text-gray-600 flex w-full justify-between font-semibold'>
            <p className='text-sm md:text-lg'>ID: {orderItem.id}</p>
            <p className='text-sm md:text-lg md:ml-28 xl:ml-24'>Payment: {orderItem.paymentMethod}</p>
            <p className='text-sm md:text-lg lg:mr-4 '>Total: ${orderItem.total}</p>
          </div>
          {orderItem?.items?.map((item,index)=>(
          <div key={index} className='flex items-center justify-around md:justify-between border border-gray-200 rounded-md p-1 md:p-2'>
            <div className='md:flex-row flex flex-col items-center gap-2'>
              <img className='md:w-24 md:h-24 xl:w-32 xl:h-32 w-20 h-20' src={item?.image?.[0]} alt="" />
              <div className='flex flex-col'>
                <p className='text-sm md:text-lg text-gray-700'>{item?.name}</p>
                <p className='text-sm text-gray-500'>Category: {item.category}</p>
              </div>
            </div>
            <div className='text-sm text-gray-500'>
              <p>Quantity: {item.quantity}</p>
              <p>Status: <span className='text-[#3cc489]'>Order placed</span></p>
              <p>Date: {currentDate}</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 md:text-lg'><span className='md:inline-block hidden text-[16px] 
              lg:text-lg text-gray-500'>Amount</span>: <span className='text-gray-600 text-[15px] xl:text-[15px] xl:mr-5'>${item.offerPrice}</span></p>
            </div>
          </div>
          ))}  
        </div> 
        ))}
        
      </div>
    </div>
  )
}

export default MyOrders