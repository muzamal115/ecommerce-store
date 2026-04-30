import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { UserCircle } from "lucide-react";

const AdminHeader = () => {
  const [headerTitle, setHeaderTitle] = useState('')
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname == '/admin') setHeaderTitle("Dashboard")
    else if (location.pathname == '/admin/products') setHeaderTitle("Products")
    else if (location.pathname == '/admin/orders') setHeaderTitle("Orders")
    else if (location.pathname == '/admin/customers') setHeaderTitle("Customers")
    else if (location.pathname == '/admin/analytics') setHeaderTitle("Analytics")
    else if (location.pathname == '/admin/setting') setHeaderTitle("Setting")
  }, [location])

  return (
    <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-gray-100">

      {/* Title */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Admin Panel</p>
        <h1 className="text-lg font-bold text-gray-800 leading-tight">{headerTitle}</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* User */}
        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
          {user?.photoURL
            ? <img src={user.photoURL} className="w-7 h-7 rounded-full object-cover" />
            : <UserCircle size={26} className="text-gray-400" />
          }
          <p className="text-sm font-medium text-gray-700 hidden md:block">
            {user?.displayName || 'Admin'}
          </p>
        </div>

      </div>

    </div>
  )
}

export default AdminHeader;