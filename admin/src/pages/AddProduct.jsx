import React, { useContext } from 'react'
import ImageUploaderGrid from '../components/ImageUploader'
import { categories } from '../assets/assets'
import axios from "axios"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AppContext } from '../context/AppContext'

const AddProduct = () => {

  const {backendURL,aToken} = useContext(AppContext)
  const [resetTrigger,setResetTrigger] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    category: ''
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files) => {
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, description, price, offerPrice, category } = formData;
  
    if (!name || !description || !price || !offerPrice || !category || images.length === 0) {
      toast.error("All fields are required!");
      return;
    }
  
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('offerPrice', offerPrice);
    form.append('category', category);
    images.forEach(img => form.append('images', img)); 
  
    try {
      const {data} = await axios.post(`${backendURL}/api/admin/add-food`, form, {
        headers: {
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'multipart/form-data',
        }
      });
  
      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: '',
          description: '',
          price: '',
          offerPrice: '',
          category: ''
        });
        setImages([]);
        setResetTrigger(prev=>!prev)
      } else {
        toast.error("Error: " + data.message );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  
  return (
    <div className='md:mt-24 mt-[73px] ml-20 md:ml-72 z-20'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <ImageUploaderGrid onImagesChange={handleImageChange} resetTrigger={resetTrigger} />

        <div>
          <p className='font-medium text-gray-700 mb-2 -mt-2'>Product Name</p>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='outline-none border border-gray-300 rounded w-[90%] md:w-[70%] lg:w-[60%] xl:w-[40%] py-2 px-3 text-gray-600'
            type="text"
            placeholder='Type here'
          />
        </div>

        <div>
          <p className='font-medium text-gray-700 mb-2'>Product Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='w-[90%] md:w-[70%] xl:w-[40%] lg:w-[60%] px-3 outline-none border border-gray-300 rounded py-2 text-gray-600'
            rows={4}
            placeholder='Type here'
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="outline-none border border-gray-300 rounded md:w-[70%] w-[90%] lg:w-[60%] xl:w-[40%] py-3 px-3 text-gray-700 
            focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          >
            <option value="" disabled hidden>Select a category</option>
            {categories?.map((cat, ind) => (
              <option key={ind} value={cat.path}>{cat.path}</option>
            ))}
          </select>
        </div>

        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[40%] flex gap-4">
          <div className="flex-1">
            <p className="text-gray-700 font-medium mb-1">Product price</p>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="outline-none border border-gray-300 py-2 px-3 rounded w-full text-gray-600"
              type="number"
              placeholder="0"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-700 font-medium mb-1">Offer price</p>
            <input
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              className="outline-none border border-gray-300 py-2 px-3 rounded w-full text-gray-600"
              type="number"
              placeholder="0"
            />
          </div>
        </div>

        <button className='bg-[#3bbe85] font-semibold text-white rounded px-4 py-[10px] max-w-28 mb-3'>ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;