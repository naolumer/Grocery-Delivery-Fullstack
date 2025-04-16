import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const validateForm = () => {
    if (!email) return 'Please enter your email';
    if (!password) return 'Please enter your password';
    return '';
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/admin/login`, { email, password });
      const { data } = response;
      if (data.success) {
        setLoggedIn(true);
        setToken(data.token);
        toast.success(data.message || 'Logged in successfully');
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

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/user/register`, { name, email, password });
      const { data } = response;
      if (data.success) {
        setLoggedIn(true);
        setToken(data.token);
        toast.success(data.message || 'Account created successfully');
        return true;
      } else {
        toast.error(data.message || 'Signup failed');
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during signup');
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
    const success = mode === 'login' ? await handleLogin() : await handleSignup();
    setIsLoading(false);

    if (success) {
      setEmail('');
      setName('');
      setPassword('');
      setShowLogin(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogin, setShowLogin]);

  if (!showLogin) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 px-2">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-10 z-30"
      >
        <Toaster />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-gray-700 text-2xl font-semibold text-center">
            User <span className="text-[#3cc489]">{mode === 'login' ? 'Login' : 'Sign Up'}</span>
          </h1>

          {mode === 'signup' && (
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">Name</label>
              <input
                className="outline-[#3cc489] px-2 py-[5px] text-gray-600 rounded-md border border-gray-300 placeholder:font-light placeholder:text-sm"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}

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

          <div className="flex items-center gap-1 text-sm">
            <p className="text-gray-700">
              {mode === 'signup' ? 'Already have an account?' : 'Create an account?'}
            </p>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#3cc489] underline hover:no-underline"
              disabled={isLoading}
            >
              click here
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#3cc489] text-white py-2 rounded-md mt-4 text-sm disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;