import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aToken, setAtoken] = useState(localStorage.getItem('atoken') || null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Validate token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('atoken');
    if (storedToken) {
      axios
        .post(`${backendURL}/api/admin/verify`, { atoken: storedToken })
        .then((response) => {
          if (response.data.success) {
            setAtoken(storedToken);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('atoken');
            setAtoken(null);
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('atoken');
          setAtoken(null);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Update localStorage when aToken changes
  useEffect(() => {
    if (aToken) {
      localStorage.setItem('atoken', aToken);
    } else {
      localStorage.removeItem('atoken');
    }
  }, [aToken]);

  const logout = () => {
    setIsLoggedIn(false);
    setAtoken(null); // This will also remove from localStorage
    toast.success("Logout successful!")
  };


  const value = {
    isLoggedIn,
    setIsLoggedIn,
    aToken,
    setAtoken,
    isLoading,
    logout,
    backendURL
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;