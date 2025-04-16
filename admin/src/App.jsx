import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route,Routes } from 'react-router-dom'
import Orders from './pages/Orders.jsx'
import ProductsList from './pages/ProductsList.jsx'
import Navbar from './components/Navbar.jsx'
import AddProduct from "./pages/AddProduct.jsx"
import Sidebar from './components/Sidebar.jsx'
import Login from './components/Login.jsx'

const App = () => {
  return (
    <div>
  
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/product-list' element={<ProductsList/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App