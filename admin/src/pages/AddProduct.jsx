import React from 'react'
import ImageUploaderGrid from '../components/ImageUploader'
import { categories } from '../assets/assets'

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
          <input className='outline-none border border-gray-300 rounded w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] py-2 px-3 text-gray-600' 
          type="text" 
          placeholder='Type here'/>
        </div>

        <div className=''>
          <p className='font-medium text-gray-700 mb-2'>Product Description</p>
          <textarea 
          className='w-[85%] md:w-[70%] xl:w-[40%] lg:w-[60%] px-3 outline-none border border-gray-300 rounded py-2 text-gray-600'
          rows={4}
          placeholder='Type here'/>
        </div>

        <div className=''>
        <label className="block font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="outline-none border border-gray-300 rounded md:w-[70%] w-[85%] lg:w-[60%] xl:w-[40%]  py-3 px-3 text-gray-700 
            focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          >
            <option value="" disabled selected hidden>
              Select a category
            </option>
            {categories?.map((cat, ind) => (
              <option key={ind} value={cat.path}>
                {cat.path}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default AddProduct