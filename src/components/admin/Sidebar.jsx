import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
  
];

const Sidebar = () => {

  
  return (
    <div className="w-16 md:w-64 bg-gradient-to-b from-black to-gray-900 text-white min-h-screen p-3 relative">
      {/* Logo */}
      <h1 className="text-lg md:text-xl font-bold mb-6 text-center md:text-left">
        ECOMDASH
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-2 ">
        {menu.map((item, i) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === "/admin"} // exact match for dashboard
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition ${
                  isActive ? "bg-white/10 border border-red-500" : ""
                }`
              }
              
            >
              <Icon size={20} />
              <span className="hidden md:block text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 left-3 right-3 ">
        <button className="w-full flex gap-2 justify-center bg-white/10 p-2  cursor-pointer rounded-lg text-sm hover:bg-white/20">
          <LogOut size={20}/>
          <p className="hidden md:block">Log out</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
