import React, { useEffect, useState } from "react";
import { Bell, Search, SearchIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const[headerTitle,setHeaderTitle]=useState('')

   const location=useLocation()
// console.log(location.pathname);

   useEffect(()=>{
    if(location.pathname=='/admin') setHeaderTitle("Dashboard")
    else if(location.pathname=='/admin/products') setHeaderTitle("Products")
   else if(location.pathname=='/admin/orders') setHeaderTitle("Orders")
   else if(location.pathname=='/admin/customers') setHeaderTitle("Customers")
   else if(location.pathname=='/admin/analytics') setHeaderTitle("Analytics")
   else if(location.pathname=='/admin/setting') setHeaderTitle("Setting")
   },[location])
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4  shadow-2xl bg-white ">
      <h1 className="text-2xl font-semibold ">{headerTitle} </h1>
      
      {/* Search */}
    <div className="relative w-full md:w-1/4">
  <Search
    size={20}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
  />

  <input
    type="text"
    placeholder="Search for products..."
   className="w-full pl-10 pr-3 py-2 border rounded-xl bg-gray-50 focus:bg-white transition"
  />
</div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm hidden md:block">John Doe</p>
        </div>

        {/* Button */}
        <button className=" bg-gradient-to-b from-black to-gray-900 text-white px-4 py-2 rounded-lg text-sm">
          + Quick Add
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;