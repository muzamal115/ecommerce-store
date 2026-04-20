import React from 'react'
import Sidebar from '../components/admin/Sidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'

const AdminLayout = () => {
  return (
   <div className="flex h-screen overflow-hidden overflow-x-hidden">
  
  {/* Sidebar */}
  <Sidebar />

  {/* Right Side */}
  <div className="flex-1 flex flex-col min-w-0">
    
    {/* Header (fixed height) */}
    <AdminHeader />

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>

  </div>

</div>
  )
}

export default AdminLayout