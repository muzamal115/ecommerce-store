import React from 'react'


import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomersList = ({c}) => {

  const navigate=useNavigate()
  return (
    <>
   <tr className="border-b border-gray-300">

      {/* Name */}
      <td className="p-2">{c.name}</td>

      {/* Email */}
      <td className="p-2">{c.email}</td>

     

      {/* Orders */}
      <td className="p-2">{c.orders}</td>

      {/* Total Spend */}
      <td className="p-2">Rs.{c.totalSpend}</td>

      {/* Joined Date */}
      <td className="p-2">{c.joinedDate}</td>

      {/* Actions */}
      <td className="p-2  ">

        {/* View */}
        <button
          className="cursor-pointer hover:shadow-2xl hover:scale-150 transition-all"
          onClick={() => navigate(`/admin/customers/${c.id}`)}
        >
          <Eye size={20} />
        </button>

        
        

      </td>
      </tr>
    
    
    </>
  )
}

export default CustomersList