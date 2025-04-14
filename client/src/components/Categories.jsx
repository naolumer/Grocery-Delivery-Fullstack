import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'



const Categories = () => {

  const {setCategory} = useContext(AppContext)

  return (
    <div className='mt-[60px] w-[92%] md:w-[85%] mx-auto text-gray-700 font-medium mb-6'> 
    <h1 className='text-3xl font-medium mb-6'>Categories</h1>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6'> 
        {
            categories.map((categ,index)=> (
                <Link key={index} to={`/products/${categ.path}`} onClick={()=>{setCategory(categ.path); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className='justify-center items-center group px-3 py-5 rounded-lg flex flex-col gap-2' style={{ backgroundColor: categ.bgColor }} key={categ.title}>
                    <img  className='max-w-28 group-hover:scale-110 transition-all duration-100' src={categ.image} alt="" />
                    <p className=' text-sm'>{categ.text}</p>
                </Link>
            ))
        }
    </div>
    </div>
  )
}

export default Categories