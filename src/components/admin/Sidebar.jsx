import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut, X } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
];

const Sidebar = ({ mobileMenu, setMobileMenu }) => {
  const { logout } = useAuth()

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40  md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-black to-gray-900 text-white p-4 flex flex-col
        transition-transform duration-300
        ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-64 md:min-h-screen
      `}>

        {/* Logo + X button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">
            <span className="text-red-500">s</span>hopvrix
          </h1>
          <button
            onClick={() => setMobileMenu(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition ${
                    isActive ? "bg-white/10 border border-red-500" : ""
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full flex gap-2 justify-center bg-white/10 p-2 cursor-pointer rounded-lg text-sm hover:bg-white/20"
            onClick={logout}
          >
            <LogOut size={20} />
            <p>Log out</p>
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;