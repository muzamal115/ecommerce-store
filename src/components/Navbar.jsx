
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'


const Navbar = ({location,openDropDown,toggleDropdown,getLocation}) => {
   
    const{cartItem}=useCart()
    const[openNav,setOpenNav]=useState(false)
  
  
  return (
    <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='flex gap-7 items-center'>
          <Link to={'/'}>
          <h1 className='font-bold text-3xl'>  <span className='text-red-500 font-serif'>z</span>aptro </h1>
          </Link>
          <div className='md:flex items-center gap-1 cursor-pointer text-gray-700 hidden'>
            < MapPin className='text-red-500' />
            <span className='font-semibold'>{location?<div className='-space-y-1'>
            <p>{location.city}</p>
            <p>{location.state}</p>
            </div>:'Add Address'}</span>
            <FaCaretDown onClick={toggleDropdown}/>
          </div>
          {
            openDropDown?
          <div className='w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
           <h1 className='font-semibold mb-4 text-xl flex justify-between '>Change Location
            <span className='cursor-pointer'><CgClose onClick={toggleDropdown}/></span>
           </h1>
           <button onClick={getLocation} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
          </div>:''
          }
         
   
        </div>
        {/* menu section */}
        <nav className='flex gap-7 items-center '>
          <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
            <NavLink to={'/'} className={({isActive})=>`${isActive?'border-b-3 transition-all border-red-500':''}`}><li>Home</li></NavLink>
            <NavLink to={'/products'} className={({isActive})=>`${isActive?'border-b-3 transition-all border-red-500':''}`}><li>Products</li></NavLink>
            <NavLink to={'/about'} className={({isActive})=>`${isActive?'border-b-3 transition-all border-red-500':''}`}><li>About</li></NavLink>
            <NavLink to={'/contact'} className={({isActive})=>`${isActive?'border-b-3 transition-all border-red-500':''}`}><li>Contact</li></NavLink>
            
          </ul>
          <Link to={'/cart'} className='relative'>
          <IoCartOutline  className='w-7 h-7 '/>
            
          
          <span className='absolute px-2 -top-3 left-3 bg-red-500 rounded-full text-white'>{cartItem.length}</span>
          
          </Link>
          <div className='hidden md:block'>
            <SignedOut>
        <SignInButton className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer' />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
          </div>
          {
            openNav?<HiMenuAlt3 className='h-7 w-7 md:hidden' onClick={()=>setOpenNav(false)}/>:<HiMenuAlt1 className='h-7 w-7 md:hidden' onClick={()=>setOpenNav(true)}/>
          }
         
            
        </nav>
      </div> 
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  )
}

export default Navbar