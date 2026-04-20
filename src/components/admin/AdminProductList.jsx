
import React from 'react'
import { Eye, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getData } from '../../context/DataContext';
import { useState } from 'react';



const AdminProductList = ({p,status}) => {
      const navigate=useNavigate()
      const [deletingid,setDeletingId]=useState(null)
       
         const{ deleteProduct,isDeleting} = getData()

      const handleDelete=async(id)=>{

     setDeletingId(id)
     await deleteProduct(id);
     setDeletingId(null)
 

      }
  
  return (
    <>
    
  <tr key={p.id} className="border-b border-gray-300 ">
                <td className="p-2">
                  <img
                  onClick={()=>navigate(`/admin/products/${p.id}`)}
                    src={p.image}
                    alt="product"
                    className="w-10 h-10 rounded bg-gray-200 cursor-pointer hover:shadow-2xl hover:scale-150 transition-all"
                  
                  />
                </td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">Rs.{p.price}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded  text-xs ${status.bg} ${status.textColor}`}>
                    {status.text}
                  </span>
                </td>
                
<td className="p-2  space-x-2">
  <button className="cursor-pointer hover:shadow-2xl hover:scale-150 transition-all"
    onClick={()=>navigate(`/admin/products/${p.id}`)}>
    <Eye size={20} />
  </button>
  <button className="cursor-pointer hover:shadow-2xl hover:scale-150 transition-all"
   onClick={()=>navigate(`/admin/products/edit/${p.id}`)}>
    <Edit2 size={20} />
  </button>
  <button className="text-red-500 cursor-pointer hover:shadow-2xl hover:scale-150 transition-all"
  onClick={()=>handleDelete(p.id)}
  >
    {deletingid==p.id?'Deleting..':<Trash2 size={20} />}
    
  </button>
</td>
              </tr>
    </>
  )
}

export default AdminProductList