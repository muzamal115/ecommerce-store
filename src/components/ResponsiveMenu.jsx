import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ResponsiveMenu = ({openNav,setOpenNav}) => {
     const{user}=useUser()
  return (
    <div className={`${openNav?'left-0':'-left-[-100%]'} fixed bottom-0 top-0 flex flex-col h-screen z-20 w-[75%]  bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all `}>
   <div className="border flex items-center  gap-3">
    {
      user?<UserButton size={50}/>:<FaUserCircle size={50}/>
    }
    <div>
      <h1>Hello, {user?.firstName}</h1>
      <h1 className="text-sm text-slate-500">Premium User</h1>
    </div>

   </div>
   <nav className="mt-12">
    <ul className='flex flex-col gap-7 text-2xl font-semibold'>
            <Link to={'/'} onClick={()=>setOpenNav(false)}><li>Home</li></Link>
            <Link to={'/products'} onClick={()=>setOpenNav(false)} ><li>Products</li></Link>
            <Link to={'/about'} onClick={()=>setOpenNav(false)}><li>About</li></Link>
            < Link to={'/contact'} onClick={()=>setOpenNav(false)}><li>Contact</li></Link>
            
          </ul>

   </nav>
    </div>
  )
}

export default ResponsiveMenu