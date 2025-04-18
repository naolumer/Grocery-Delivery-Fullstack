import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import calculateTax from '../utils/taxCalculator';
import { dummyProducts } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart, address } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const {selectedAddress,setSelectedAddress,handleOrder,setPaymentType,paymentType} = useContext(AppContext)
  const navigate = useNavigate();

  const toggleShowAddress = () => {
    setShowAddress(!showAddress);
  };


  useEffect(() => {
    const fetchProducts = () => {
      const filteredProducts = dummyProducts
        .filter((product) => cart.some((cartItem) => cartItem.id === product._id))
        .map((product) => ({
          ...product,
          quantity: cart.find((cartItem) => cartItem.id === product._id)?.quantity || 0,
        }));
      setProductsCart(filteredProducts);
    };
    fetchProducts();
  }, [cart]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = productsCart.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0
  );

  const handleCartMinus = (e, itemId) => {
    e.preventDefault();
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === itemId && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const handleCartPlus = (e, itemId, inStock) => {
    e.preventDefault();
    if (!inStock) return;
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleRemove = (e, itemId) => {
    e.preventDefault();
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== itemId));
  };

  return (
    <div className="w-[92%] md:w-[85%] mx-auto mt-12 mb-28">
      <h1 className="text-gray-700 font-medium md:text-3xl text-2xl mr-2">
        Shopping Cart{' '}
        <span className="text-sm text-[#3cc489]">{totalCartItems} items</span>
      </h1>

      <div className="flex flex-col xl:flex-row justify-between w-full gap-6">
  {/* Cart Items - Left Column */}
  <div className="flex flex-col w-full xl:w-[68%]">
    <div className="hidden md:flex items-center justify-between text-gray-500 mb-3 mt-6">
      <p className="w-[55%]">Product Details</p>
      <p className="w-[25%] text-center">Subtotal</p>
      <p className="w-[20%] text-center">Action</p>
    </div>
    <div className="flex flex-col gap-4">
      {productsCart.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">Your cart is empty.</p>
      ) : (
        productsCart.map((cartItem, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4"
          >
            {/* Product Info */}
            <div className="flex gap-3 items-center w-full sm:w-[55%]">
              <img
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border border-gray-300 rounded-md object-cover"
                src={cartItem.image[0]}
                alt={cartItem.name}
              />
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className="font-medium text-sm sm:text-base">{cartItem.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {cartItem.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm">Qty:</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCartMinus(e, cartItem._id)}
                      className="w-6 h-6 sm:w-7 sm:h-7 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 text-sm"
                      disabled={cartItem.quantity <= 0}
                    >
                      -
                    </button>
                    <span className="text-sm w-6 text-center">{cartItem.quantity}</span>
                    <button
                      onClick={(e) => handleCartPlus(e, cartItem._id, cartItem.inStock)}
                      className="w-6 h-6 sm:w-7 sm:h-7 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 text-sm"
                      disabled={!cartItem.inStock}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtotal - Hidden on mobile */}
            <div className="hidden sm:block w-[25%] text-center">
              <p className="text-sm md:text-base">${(cartItem.offerPrice * cartItem.quantity).toFixed(2)}</p>
            </div>

            {/* Action + Mobile Subtotal */}
            <div className="flex justify-between items-center w-full sm:w-[20%]">
              {/* Mobile Subtotal */}
              <div className="sm:hidden text-sm">
                <p>${(cartItem.offerPrice * cartItem.quantity).toFixed(2)}</p>
              </div>
              
              {/* Remove Button */}
              <button 
                onClick={(e) => handleRemove(e, cartItem._id)}
                className="text-red-500 border-2 border-red-500 rounded-full w-6 h-6 md:mr-20 mr-10 flex items-center justify-center hover:bg-red-100 sm:ml-auto"
                aria-label={`Remove ${cartItem.name} from cart`}
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Cart Summary - Right Column */}
  <div className="w-full md:w-[60%] xl:w-[30%] bg-gray-100 p-4 sm:p-6 rounded-sm h-fit sticky top-4">
    <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-6 sm:mb-8">
      Order Summary
    </h2>

    <div className='mt-3 mb-3'>
      <h1 className="text-sm sm:text-base font-medium">DELIVERY ADDRESS</h1>
      <div className='flex w-full justify-between relative mt-1 sm:mt-2'>
        {!selectedAddress ? (
          <p id='noaddress' className='text-gray-500 text-sm sm:text-base'>No address selected</p>
        ) : (
          <p className='text-gray-500 text-sm sm:text-base'>
            {`${selectedAddress.street}, ${selectedAddress.city}`}
          </p>
        )}

        <button 
          className='text-[#3cc489] underline text-sm sm:text-base' 
          onClick={toggleShowAddress}
        >
          Change
        </button>

        {showAddress && (
          <div className='absolute top-8 sm:top-10 right-0 flex flex-col w-full text-gray-500 border rounded-sm 
          border-gray-300 bg-white z-10 shadow-md'>
            <select
              onChange={(e) => {
                setSelectedAddress(
                  address.find((ad) => ad.email === e.target.value)
                )
                setShowAddress(false)
              }}
              className='text-start text-[13px] sm:text-[14px] p-2 w-full bg-white outline-none'
            >
              <option value="">-- Select an address --</option>
              {address.map((ad, index) => (
                <option key={index} value={ad.email}>
                  {ad.street}, {ad.city}
                </option>
              ))}
            </select>

            <button 
              onClick={() => navigate("/add-address")} 
              className='w-full py-1 sm:py-2 rounded-md hover:bg-green-600 text-white bg-[#3cc489] text-sm sm:text-base'
            >
              Add address
            </button>
          </div>
        )}
      </div>
    </div>

    <div className='mt-3 mb-3'>
      <h1 className='mb-2 sm:mb-3 text-sm sm:text-base font-medium'>PAYMENT METHOD</h1>
      <select 
        value={paymentType} 
        onChange={(e)=>setPaymentType(e.target.value)} 
        className='w-full rounded-sm py-2 px-2 sm:px-3 outline-none border border-gray-200 text-gray-600 text-sm sm:text-base'
      >
        <option value="Cash">Cash On Delivery</option>
        <option value="Online">Online Payment</option>
      </select>
    </div>

    <div className="flex justify-between mb-2 text-sm sm:text-base">
      <p>Subtotal ({totalCartItems} items)</p>
      <p>${totalPrice.toFixed(2)}</p>
    </div>
    <div className="flex justify-between mb-2 text-sm sm:text-base">
      <p>Shipping</p>
      <p>Free</p>
    </div>
    <div className='flex justify-between mb-6 sm:mb-8 text-sm sm:text-base'>
      <p>Tax <span className='text-xs sm:text-sm text-gray-600'>(2%)</span></p>
      <p>${calculateTax(totalPrice)}</p>
    </div>

    <div className="flex justify-between font-medium text-base sm:text-lg border-t border-gray-300 pt-3">
      <p>Total</p>
      <p>${(parseFloat(totalPrice) + parseFloat(calculateTax(totalPrice))).toFixed(2)}</p>
    </div>

    <button 
      onClick={handleOrder}
      disabled={productsCart.length === 0}
      className={`w-full mt-4 text-white py-2 sm:py-2.5 rounded-md text-sm sm:text-base ${
        productsCart.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#3cc489] hover:bg-green-600'
      }`}
    >
      Proceed to Checkout
    </button>
  </div>
</div>
    </div>
  );
};

export default Cart;