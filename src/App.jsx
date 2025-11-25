import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Category from './components/Category'



const App = () => {
  const[location,setLocation]=useState()
  const[openDropDown,setOpenDropDown]=useState(false)
  const toggleDropdown=()=>{
    setOpenDropDown(!openDropDown)
  }
  const getLocation=async()=>{
    navigator.geolocation.getCurrentPosition( async pos=>{
      const{latitude,longitude}=pos.coords
       const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`;
      try {
        const location=await axios.get(url)
        const exactLocation=location.data.address
        setLocation(exactLocation)
        setOpenDropDown(false)

        // console.log(exactLocation);
        
      } catch (error) {
        
      }
      
    })
  }
  useEffect(()=>{
   getLocation()
  },[])
  return (
    <BrowserRouter>
    <Navbar location={location} openDropDown={openDropDown} toggleDropdown={toggleDropdown} getLocation={getLocation}/>
   
   
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/cart' element={<Cart/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App