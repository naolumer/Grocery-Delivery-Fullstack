import React, { useContext, useEffect,useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate,useLocation} from "react-router-dom"



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {isLoggedIn,setIsLoggedIn,aToken,setAtoken,showLogin,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const validateForm = () => {
    if (!email) return 'Please enter your email';
    if (!password) return 'Please enter your password';
    return '';
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/user/admin/login`, { email, password });
      const { data } = response;
      if (data.success) {
        setIsLoggedIn(true);
        setAtoken(data.atoken);
        toast.success(data.message || 'Logged in successfully');
        navigate("/add-product")
        return true;
      } else {
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    const success = await handleLogin() 
    setIsLoading(false);

    if (success) {
      setEmail('');
      setPassword('');
      setShowLogin(false);
    }
  };


  if (!showLogin && location.pathname !== '/login') return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-50 px-2">
      <div
        className="w-full md:max-w-[360px] max-w-[330px] bg-white rounded-lg shadow-md px-8 py-10 z-30"
      >
        <Toaster />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-gray-700 text-2xl font-semibold text-center">
            Seller <span className="text-[#3cc489]">login</span>
          </h1>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Email</label>
            <input
              className="outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Password</label>
            <input
              className="outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#3cc489] text-white py-2 rounded-md mt-4 text-sm disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;