import React from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [aToken, setAtoken] = useState(localStorage.getItem("atoken") || null )

    const value = {
        isLoggedIn,setIsLoggedIn,
        aToken,setAtoken
    }

    useEffect(()=>{
        if (aToken){
            localStorage.setItem("atoken",aToken)
        } else {
            localStorage.removeItem("atoken")
        }    
    },[aToken])

    useEffect(()=>{
        setIsLoggedIn(!!aToken)
    },[aToken])

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider