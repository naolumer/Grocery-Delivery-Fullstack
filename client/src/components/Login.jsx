import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const { loggedIn, setLoggedIn, showLogin, setShowLogin } = useContext(AppContext)
  const [name,setName]  = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Loginerror,setLoginError] = useState("")
  const [Signuperror,setSignupError] = useState("")
  const [state,setState] = useState("Login")

  const handleSubmit = (e)=>{
      e.preventDefault()

      setLoginError("")
      setSignupError("")

      if (state==="Sign Up") {
        if (!name ){
          setSignupError("Please enter name")
          return
        }
        if (!email){
          setSignupError("Please enter your email")
          return
        }
        if (!password){
          setSignupError("Please enter password")
          return
        }
        setSignupError("")
        setEmail("")
        setName("")
        setPassword("")
        setShowLogin(false)
        setLoggedIn(true)

      }  else if (state==="Login") {
        if (!email){
          setLoginError("Please enter your email")
          return
        }
        if (!password){
          setLoginError("Please enter password")
          return
        }
        setLoginError("")
        setEmail("")
        setPassword("")
        setShowLogin(false)
        setLoggedIn(true)
      }   
  }

  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin(false)
      }
    }

    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLogin, setShowLogin])

  if (!showLogin) return null

  return (
    <div className='fixed inset-0 z-20 flex items-center justify-center bg-black/50 px-2'>
      <div
        ref={modalRef}
        className='w-full  max-w-[300px] sm:max-w-[350px] bg-white rounded-lg shadow-md px-8 py-8 sm:py-10 z-30'
      >
        <div className='flex flex-col gap-4'>
          <h1 className='text-gray-700 text-lg sm:text-2xl font-semibold text-center'>
            User <span className='text-[#3cc489]'>{state}</span>
          </h1>
          { state==="Sign Up" &&
            <div className='flex flex-col'>
            <label className='text-gray-700 text-sm mb-1'>Name</label>
            <input
              className='outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          }
          
          <div className='flex flex-col'>
            <label className='text-gray-700 text-sm mb-1'>Email</label>
            <input
              className='outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 text-sm mb-1'>Password</label>
            <input
              className='outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-1 text-sm'>
           {state==="Sign Up"? <p className='text-gray-700'>Already have an account?</p>:<p className='text-gray-700'>Create an account?</p>} 
            <p onClick={()=>state==="Sign Up"? setState("Login"):setState("Sign Up")} className='text-[#3cc489] underline cursor-pointer'>click here</p>
          </div>
          <p className='text-red-400 text-sm'>{state==="Sign Up"? Signuperror : Loginerror}</p>
          <button type='submit' onClick={handleSubmit} className='w-full bg-[#3cc489] text-white py-2 rounded-md mt-4 text-sm'>
            {state==="Login"? "Login":"Create account" }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login