import React from 'react'
import ImageUploaderGrid from '../components/ImageUploader'

const AddProduct = () => {

  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <div className='md:mt-24 mt-[73px] ml-20 md:ml-72 z-20'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <ImageUploaderGrid/>

        <div className=''>
          <p className='font-medium text-gray-700 mb-2 -mt-2'>Product Name</p>
          <input className='outline-none border border-gray-300 rounded w-[40%] py-2 px-3 text-gray-600' 
          type="text" 
          placeholder='Type here'/>
        </div>

        <div className=''>
          <p className='font-medium text-gray-700 mb-2'>Product Description</p>
          <textarea 
          className='w-[40%] px-3 outline-none border border-gray-300 rounded py-2 text-gray-600'
          rows={4}
          placeholder='Type here'/>
        </div>
      </form>
    </div>
  )
}

export default AddProduct