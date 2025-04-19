import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HiMiniStar } from "react-icons/hi2";
import { AppContext } from '../context/AppContext';
import RelatedProducts from '../components/RelatedProducts';
import { useNavigate } from 'react-router-dom';

const FoodDetail = () => {
  
  const [mainImg,setMainImg] = useState(false)
  const {setCategory,category,cart, setCart,allProducts} = useContext(AppContext)
  const [food,setFood] = useState([])
  const navigate = useNavigate()
  

  const {categories,id} = useParams()

  const changeMainImg = (index)=>{
    setMainImg(food?.image?.[index] || "")
  }

  const handleAddToCart = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    
    const existingItem = cart.some((cartItem) => cartItem.id === food._id)

    if (!existingItem){
        setCart(prev=> [...prev,{id:food._id, quantity: 1, name:food.name, offerPrice: food.offerPrice }])
    } else {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === food._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
  }

  const handleBuy = (e)=>{

    e.preventDefault()

    const existingItem = cart.some((cartItem)=> cartItem.id===food._id)
    if (!existingItem){
      setCart(prev=> [...prev, {id:food._id,quantity:1, offerPrice:food.offerPrice,name:food.offerPrice}])
    } else {
      setCart(
        prev=> prev.
        map((cartItem)=>cartItem.id===food._id
        ? {...cartItem,quantity:cartItem.quantity+1}:cartItem))
    }
    navigate("/cart")
  }


  useEffect(()=>{
    const curFood = ()=>{
    const food = allProducts.find((food)=> food._id===id)
    setFood(food)
    setCategory(food?.category)
    setMainImg(false)
    }
    curFood()
  },[id,category])

  
  return (
    <div className='w-[90%] lg:w-[85%] mx-auto mt-12 mb-32'>
      <p className='mb-4 text-gray-700 font-lg'>{`Home/ Products/ ${categories}`}/<span className='text-[#3cc489]'> {food?.name}</span></p> 
      <div className='md:grid flex flex-wrap md:grid-cols-[0.52fr_1.5fr_2fr] lg:grid-cols-[0.58fr_2.5fr_3fr] xl:grid-cols-[0.5fr_2.3fr_3fr] gap-2'>
       <div className='flex sm:flex-col sm:ml-3 md:ml-0 gap-2 mr-2'>
        {food?.image?.[0]? <div onClick={()=>changeMainImg(0)}>
            <img className='border rounded-md border-gray-300 w-20 sm:w-24 md:w-32 lg:w-36 cursor-pointer' src={food?.image?.[0] || ""} alt="" />
        </div>:"" }
        {food?.image?.[1]?<div onClick={()=>changeMainImg(1)}>
            <img className='border rounded-md border-gray-300 w-20 sm:w-24 md:w-32 lg:w-36 cursor-pointer' src={food?.image?.[1] || ""} alt="" />
        </div> :"" }
        {food?.image?.[2]?<div onClick={()=>changeMainImg(2)}>
            <img className='border rounded-md border-gray-300 w-20 sm:w-24 md:w-32 lg:w-36 cursor-pointer' src={food?.image?.[2] || ""} alt="" />
        </div> :"" }
        {food?.image?.[3]?<div onClick={()=>changeMainImg(3)}>
          <img className='border rounded-md border-gray-300 w-20 sm:w-24 md:w-32 lg:w-36 cursor-pointer' src={food?.image?.[3] || ""} alt="" />
        </div> :"" }
      </div>
  

      <div className='border border-gray-300 rounded-md w-[340px] sm:w-[390px] md:w-[345px] lg:w-[390px]'>
          <img src={mainImg ? mainImg : food?.image?.[0]} alt="" />
      </div>


      <div className='flex flex-col mt-8 md:mt-0 gap-5 ml-3 md:ml-8 lg:ml-8 xl:-ml-6'>
        <h1 className='text-[29px] lg:text-3xl font-medium text-gray-700 -mb-3'>{food?.name}</h1>
        <div className='flex items-center'>
            {Array(4).fill().map((_,id)=> (
                <HiMiniStar className='text-[#3cc489]' key={id}/>
            ))}
            <HiMiniStar className='text-[#a7edcf]' /> <span className='text-gray-700'>(4)</span>
        </div>
        <div>
          <p className='text-gray-400 text-sm line-through'>MRP: ${food?.price}</p>
          <p className='text-[25px] font-medium text-gray-700'>MRP: ${food?.offerPrice}</p>
          <p className='text-sm text-gray-500'>(inclusive of all taxes)</p>
        </div>
       

        <div>
          <p className='text-gray-700 font-medium mb-1'>About Product</p>
          {
            food?.description?.split(",")?.map((desc,index)=>(
              <p className=' text-sm text-gray-400 list-item ml-4' key={index}>{desc}</p>
            ))
          }
        </div>

        <div className='flex items-center gap-4 mt-6'>
          <button onClick={handleAddToCart} className='xl:px-[90px] px-[10vw] sm:px-[15vw] md:px-[2vw] lg:px-[4vw]  py-3 lg:py-[14px] hover:bg-gray-200 bg-gray-100 font-medium text-gray-700'>Add to cart</button>
          <button onClick={handleBuy} className='xl:px-[90px] px-[10vw] sm:px-[15vw] md:px-[2vw] lg:px-[4vw] py-3 lg:py-[14px] hover:bg-[#24ac71] bg-[#3cc489] font-medium  text-white'>Buy now</button>
        </div>
      </div>
    </div>
    <RelatedProducts/>
  </div>
  )
}

export default FoodDetail