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

  const toggleInstock = async (id)=>{

    try{
      const {data} = await axios.post(`${backendURL}/api/admin/update-instock`,{foodId:id}, {headers: {

        'Authorization': `Bearer ${aToken}`,
        'Content-Type': 'application/json',
      }})

      if (data.success) {
        toast.success(data.message);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, inStock: !product.inStock } : product
          )
        );
      } else {
        toast.error(data.message);
      }

    } catch(error){
      console.error(error)
      toast.error("error updating inStock")
    }
  }

  useEffect(() => {
    if (aToken) {
      getProductList();
    }
  }, [aToken]);

 
  return (
    <div className="min-h-screen p-6 md:mt-20 mt-[73px] ml-4 md:ml-72 z-20 mb-20 ">
      <p className="text-gray-600 font-medium text-xl mb-6 ml-12 md:ml-2">All Products</p>
      <div className="bg-white shadow-md rounded-lg overflow-hidden ml-6 md:ml-0 lg:w-[80%]">

        <div className=" grid md:grid-cols-[2fr_1fr_1fr_1fr] grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 bg-gray-100 border-b 
        border-gray-200 font-semibold text-gray-700 p-4">
          <div>Product</div>
          <div>Category</div>
          <div><span className='md:inline-block hidden'>Selling</span>Price </div>
          <div>In Stock</div>
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="grid md:grid-cols-[2fr_1fr_1fr_1fr] grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 
              items-center border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
                <span className="text-gray-600 text-sm hidden lg:inline-block">{product.name}</span>
              </div>
              <div className="text-gray-600 text-sm">{product.category || 'Vegetables'}</div>
              <div className="text-gray-700 text-[15px]">${product.offerPrice}</div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.inStock}
                    onChange={() => toggleInstock(product._id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-7 rounded-full transition-colors duration-200 ease-in-out ${
                      product.inStock ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md mt-[4px]  transform transition-transform duration-200 ease-in-out ${
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