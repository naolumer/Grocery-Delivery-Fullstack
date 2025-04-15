import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyOrders from "./pages/MyOrders"
import Products from "./pages/Products"
import AddAddress from "./pages/AddAddress"
import Cart from "./pages/Cart"
import CatFoods from './pages/CatFoods'
import FoodDetail from "./pages/FoodDetail"
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr className='border border-solid' />
      <Login/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:categories' element={<CatFoods/>}/>
        <Route path='/products/:categories/:id' element={<FoodDetail/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </div>
  )
}

export default App