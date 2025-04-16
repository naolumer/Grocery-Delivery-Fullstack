import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [aToken, setAtoken] = useState(null)

    const value = {
        isLoggedIn,setIsLoggedIn,aToken,setAtoken
    }

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider