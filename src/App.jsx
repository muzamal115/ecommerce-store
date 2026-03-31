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
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { getData } from './context/DataContext'
import { useUser } from '@clerk/clerk-react'
import { useCart } from './context/CartContext'
import OrderSuccessCard from './components/OrderSuccessCard'
import MyOrders from './pages/MyOrders'
import { usePlaceOrder } from './context/PlaceOrderContext'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import AdminOrders from './components/admin/AdminOrders'
import Users from './components/admin/Users'
import AdminProducts from './components/admin/AdminProducts'
import Customers from './components/admin/Customers'
import AddProduct from './components/admin/pages/AddProduct'
import ProductDetail from './components/admin/pages/ProductDetail'




const App = () => {
       
     const{user}=useUser()
  const[location,setLocation]=useState()
  const[openDropDown,setOpenDropDown]=useState(false)
  const{saveUserToFireStore}=getData()
    const{fetchOrderData,orders}= usePlaceOrder()

    const{fetchCart}=   useCart()
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
  if(user){
    saveUserToFireStore(user)
  }
 
},[user])

useEffect(()=>{
      if(user){
      fetchCart()
      }
      
     },[user])

  useEffect(()=>{
   getLocation()
  },[])
  useEffect(() => {
  if (user) fetchOrderData(user)
}, [user])
  return (
    <BrowserRouter>
    
  
   
   
    <Routes>
      {/* User Side */}
      <Route  path='/' element={<UserLayout  location={location} openDropDown={openDropDown} toggleDropdown={toggleDropdown} getLocation={getLocation} />}>
     <Route index element={<Home/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/products/:id' element={<SingleProduct/>}/>
     <Route path='/category/:category' element={<CategoryProduct/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/cart' element={<Cart location={location} getLocation={getLocation}/>}/>
     <Route path='/orders' element={<MyOrders orders={orders}/>}/>
     </Route>

     {/* Admin Side */}
     <Route path='/admin' element={<AdminLayout/>}>
     <Route index element={<Dashboard/>} />
     <Route path='products' element={<AdminProducts/>} />
     <Route path='products/:id' element={<ProductDetail/>} />
      <Route path='products/add' element={<AddProduct isEdit={false} />} /> 
      <Route path='products/edit/:id' element={<AddProduct isEdit={true} />} /> 
     <Route path='orders' element={<AdminOrders/>} />
     <Route path='customers' element={<Customers/>} /> 
    
    

     </Route>
     
    </Routes>
   

    </BrowserRouter>
  )
}

export default App