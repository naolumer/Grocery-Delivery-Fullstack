import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import About from '../components/About'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div id='#' className=' w-full' >
        <Header/>
        <Categories/>
        <BestSellers/>
        <About/>
        <Contact/> 
    </div>
  )
}

export default Home