import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProductsList = () => {

  const [products, setProducts] = useState([]);
  const context = useContext(AppContext);


  const { backendURL, aToken } = context;

  const getProductList = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-food`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (data.success) {
        setProducts(data.food.map((item) => ({ ...item, inStock: item.inStock ?? false })));
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching Products');
    }
  };

  useEffect(() => {
    if (aToken) {
      getProductList();
    }
  }, [aToken]);

  // Handle toggle switch change
  const handleToggle = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };

  return (
    <div className="min-h-screen p-6 md:mt-24 mt-[73px] ml-4 md:ml-72 z-20 mb-20 ">
      <p className="text-gray-700 font-medium text-lg mb-4 ml-12 md:ml-5">All Products</p>
      <div className="bg-white shadow-md rounded-lg overflow-hidden ml-6 md:ml-0 lg:w-[80%]">

        <div className=" grid md:grid-cols-[2fr_1fr_1fr_1fr] grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 p-4">
          <div>Product</div>
          <div>Category</div>
          <div><span className='md:inline-block hidden'>Selling</span>Price </div>
          <div>In Stock</div>
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="grid md:grid-cols-[2fr_1fr_1fr_1fr] grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 items-center border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image[0] || 'https://via.placeholder.com/64'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
                <span className="text-gray-800 hidden lg:inline-block">{product.name}</span>
              </div>
              <div className="text-gray-600">{product.category || 'Vegetables'}</div>
              <div className="text-gray-800">${product.offerPrice}</div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.inStock}
                    onChange={() => handleToggle(product.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                      product.inStock ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md mt-[2px]  transform transition-transform duration-200 ease-in-out ${
                        product.inStock ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500">No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;