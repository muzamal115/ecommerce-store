import React, { useEffect, useState } from 'react'
import ProductTable from './ProductTable'
import { Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { getData } from '../../context/DataContext';
import AddProduct from './pages/AddProduct';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const{fetchAllProducts,data,calculateStockStats}=getData()
  const[showAddProductPage,setShowAddProductPage]=useState(false)
  const navigate=useNavigate()

   useEffect(() => {
    fetchAllProducts()
    
    
  }, [data])

 
const stockStats= calculateStockStats(data)




  

  const stats = [
  {
    title: "Total Products",
    value: stockStats.total,
    icon: Package,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Active",
    value: stockStats.inStock,
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Out of Stock",
    value: stockStats.outOfStock,
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
  {
    title: "Low Stock",
    value: stockStats.lowStock,
    icon: AlertTriangle,
    color: "text-yellow-600 bg-yellow-100",
  },
];

if(!data||data.length==0){
  return(
    
      <div className="flex items-center justify-center  h-full text-2xl font-semibold">
      Loading...</div>
    
  )
}
else{
 return (

    
   <>
  
  
    <div className="p-4 md:p-6  bg-gray-200 ">
      <div className=' flex justify-between items-center  mb-4'>
        <div  className='flex flex-col'>
      <h1 className="text-2xl font-semibold ">Products </h1>
      <p>Manage all your products</p>
      </div>
       <button onClick={()=>navigate('/admin/products/add')} className="bg-gradient-to-b from-black to-gray-900 hover:from-gray-800 hover:to-black active:scale-95 text-white px-4 h-10 rounded-lg text-sm cursor-pointer transition-all duration-300 hover:shadow-lg">
  + Add New Product
</button>
      </div>

      {/* Stats */}
     <div className="grid grid-cols-2 md:grid-cols-4  gap-4 mb-6">
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 flex items-center justify-between"
          >
            {/* Left Content */}
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold mt-1">{item.value}</h2>
            </div>

            {/* Icon */}
            <div className={`p-2 rounded-lg ${item.color}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>

      {/* Table */}
      <ProductTable />
    </div>
     </>
  );
}

  
}

export default AdminProducts