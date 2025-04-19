import FoodCard from '../components/FoodCard';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const Products = () => {
    const {filteredProducts} = useContext(AppContext)

  return (
    <div className='mt-16 w-[85vw] mx-auto mb-32'>
        <div className='absolute mb-5'>
            <h1 className='relative text-2xl text-gray-800 font-medium'>ALL PRODUCTS
            <div className='h-[1px] w-[63px] bg-[#41bd87] rounded-lg absolute right-0 -bottom-[2px]'></div>
            </h1> 
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-16'>
            {
                filteredProducts.map((item,index)=> (
                    <FoodCard item={item} index={index}/>
                ))
            }
        </div>

    </div>
  )
}

export default Products