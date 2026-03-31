import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


const UserLayout = ({location,openDropDown,toggleDropdown,getLocation}) => {
  return (
    <>
     <Navbar  location={location} openDropDown={openDropDown} toggleDropdown={toggleDropdown} getLocation={getLocation} />
     <Outlet/>
     <Footer/>
    </>
  )
}

export default UserLayout