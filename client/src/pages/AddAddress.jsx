import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AddAddress = () => {
  const {address,setAddress} = useContext(AppContext)

  const [name,setName] = useState("")
  const [lastname,setLastname] = useState("")
  const [email,setEmail] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [country,setCountry] =  useState("")
  const [state, setState] = useState("")
  const [phone, setPhone]  = useState("")
  const [zipcode,setZipCode] = useState("")
  const [error,setError] = useState("")
  const {selectedAddress,setSelectedAddress} = useContext(AppContext)
  

  const navigate = useNavigate()

  const handleAddAddress = (e)=>{
    e.preventDefault()

    if (!name || !lastname || !email || !state || !city ||!country||!street || !zipcode||!phone){
      setError("Please fill all the necessary fields")
    } else {
    setError("")
    setAddress(prev=> [...prev, {name,lastname,email,state,city,country,zipcode,phone,street}])
    localStorage.setItem("address",JSON.stringify(address))
    setName("")
    setCity("")
    setEmail("")
    setLastname("")
    setZipCode("")
    setPhone("")
    setStreet("")
    setCountry("")
    setState("")
    
    navigate("/cart")
    }  
  }

  return (
    <div className='md:w-[85%] w-[92%] mt-16 mx-auto mb-32'>
      <h1 className='mb-16 md:text-3xl text-2xl font-medium text-gray-600 '>Add Shipping <span className='md:text-3xl text-2xl font-medium  text-[#3cc489]'>Address</span></h1>
      <div className='flex flex-col md:flex-row w-full  justify-between '>
        <div className='min-w-[350px] w-[70%] md:w-[35%]  md:mr-12 gap-3 flex flex-col text-gray-600'>
         <div className='flex  items-center justify-between w-full'>
          <input placeholder='First name' className='outline-none  placeholder:font-light  px-3 py-[6px] w-[48%] border border-gray-300 rounded-[4px]' 
          type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}/>
          <input placeholder='Last name' className='outline-none placeholder:font-light  px-3 py-[6px] w-[48%] border border-gray-300 rounded-[4px]' 
          type="text" 
          value={lastname}
          onChange={(e)=>setLastname(e.target.value)}/>
         </div>
         <input placeholder='Email' className='outline-none px-3  placeholder:font-light py-[6px]  border border-gray-300 rounded-sm' 
         type="text" 
         value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
         <input placeholder='street' className='outline-none px-3  placeholder:font-light py-[6px] border border-gray-300 rounded-sm' 
         type="text" 
         value={street}
          onChange={(e)=>setStreet(e.target.value)}/>
         <div className='w-full flex justify-between'>
          <input placeholder='City'  className='outline-none px-3  placeholder:font-light py-[6px] w-[48%]  border border-gray-300 rounded-[4px]'
          type="text"
          value={city}
          onChange={(e)=>setCity(e.target.value)}/>
          <input placeholder='State' className='outline-none px-3  placeholder:font-light py-[6px] w-[48%]  border border-gray-300 rounded-[4px]' 
          type="text"
          value={state}
          onChange={(e)=>setState(e.target.value)} />
         </div>
         <div className='w-full flex justify-between'>
            <input  placeholder='Zip code' className='outline-none placeholder:font-light  px-3 py-[6px] w-[48%]  border border-gray-300 rounded-[4px]' 
            type="number" 
            value={zipcode}
            onChange={(e)=>setZipCode(e.target.value)}/>
            <input placeholder='Country' className='outline-none  placeholder:font-light px-3 py-[6px] w-[48%]  border border-gray-300 rounded-[4px]' 
            type="text" 
            value={country}
            onChange={(e)=>setCountry(e.target.value)}/>
         </div>
         <input placeholder='Phone' className='outline-none px-3 placeholder:font-light  py-[6px] border border-gray-300 rounded-[4px]' 
          type="text" 
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}/>
          <p className='text-red-500 font-sm'>{error}</p>
         <button type='submit' onClick={handleAddAddress} className='bg-[#3cc489] w-full text-white py-2 rounded-sm mt-8 hover:bg-[#32b079]'>SAVE ADDRESS</button>
        </div>
        <div className='mt-20 md:mt-0 mr-20'>
          <img src={assets.add_address_iamge} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AddAddress