import React, { useContext, useEffect, useState } from 'react';
import { HiMiniStar } from 'react-icons/hi2';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const FoodCard = ({ item}) => {
  const { cart, setCart,query } = useContext(AppContext);
  const [cartActive, setCartActive] = useState(false);

  


  // Check if this item is in the cart
  useEffect(() => {
    const isInCart = cart.some((cartItem) => cartItem.id === item._id);
    setCartActive(isInCart);
    console.log(cart)
  }, [cart, item._id]);

  const handleAddToCart = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    
    const existingItem = cart.some((cartItem) => cartItem.id === item._id)

    if (!existingItem){
        setCart(prev=> [...prev,{id:item._id, quantity: 1, name:item.name, offerPrice: item.offerPrice }])
    } 
  }

  const handleCartMinus = (e)=>{
    e.preventDefault()
    e.stopPropagation()

    setCart(prev => prev.map((cartItem)=> cartItem.id===item._id && cartItem.quantity > 0 ? 
    {...cartItem,quantity:cartItem.quantity-1} : cartItem
    ).filter((cartItem)=> cartItem.quantity!==0))
  }

  const handleCartPlus = (e)=>{
    e.preventDefault()
    e.stopPropagation()

    setCart(prev => prev.map((cartItem)=> cartItem.id===item._id  ? 
    {...cartItem,quantity:cartItem.quantity + 1} : cartItem
    ).filter((cartItem)=> cartItem.quantity!==0))
  }

  const itemQuantity = cart.find((cartItem)=>cartItem.id===item._id)?.quantity || 0

    return (
    <div>
      <Link
        to={`/products/${item.category}/${item._id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-start gap-[3px] border border-gray-300 rounded-lg max-w-56 pt-5 pl-5 md:pl-6 pb-2"
      >
        <div className="overflow-hidden">
          <img
            className="w-[100px] ml-3 sm:w-28 md:w-[92px] lg:w-28 xl:w-32 sm:ml-5 md:ml-3 lg:ml-2 xl:ml-7 hover:scale-[108%] transition-all duration-150"
            src={item.image[0]}
            alt={item.name}
          />
        </div>
        <p className="text-gray-400 text-sm">{item.category}</p>
        <p className="text-gray-700 font-medium text-[16px] sm:text-[14px] md:text-[15px] xl:text-lg lg:text-[15px]">
          {item.name}
        </p>
        <div className="flex items-center">
          {Array(5)
            .fill()
            .map((_, id) => (
              <HiMiniStar
                key={id}
                className={id < 4 ? 'text-[#3cc489]' : 'text-[#a7edcf]'}
              />
            ))}
          <span className="text-gray-400 text-sm">(4)</span>
        </div>
        <div className="mt-2 sm:mt-3 w-full flex-col md:flex-col lg:flex-row sm:flex-row flex items-center justify-between">
          <div className="flex md:flex-row mr-16 sm:mr-0 lg:flex-col xl:flex-row xl:gap-1 gap-1 sm:gap-0 items-center">
            <p className="text-[#3cc489] font-medium text-[15px] sm:text-[15px] md:text-[17px] lg:text-[15px] xl:text-xl">
              <span>$</span>
              {item.offerPrice}
            </p>
            <p className="text-gray-500 text-sm sm:text-[12px] lg:text-sm line-through">
              <span>$</span>
              {item.price}
            </p>
          </div>
          <button
            type="button"
            onClick={cartActive ? null : handleAddToCart}
            className="flex mt-1 mr-4 sm:mt-0 items-center gap-1 md:mr-4 sm:mr-4 py-[4px] px-6 sm:px-4 rounded-[4px] border border-[#7ddeb4] text-sm bg-[#e9f8ec] text-[#3cc489]"
          >
            {!cartActive && (
              <>
                <span>Add</span>
                <MdOutlineShoppingCart className="w-4 h-4" />
              </>
            )}
            {cartActive && (
              <div className="flex w-full items-center justify-between gap-[9px]">
                <button
                  type="button"
                  onClick={handleCartMinus}
                  className="text-[#3cc489] focus:outline-none"
                >
                  -
                </button>
                <span className="text-sm">{itemQuantity}</span>
                <button
                  type="button"
                  onClick={handleCartPlus}
                  className="text-[#3cc489] focus:outline-none"
                >
                  +
                </button>
              </div>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FoodCard;




