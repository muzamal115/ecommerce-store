import React, { useEffect, useState } from 'react'
import { Package, CheckCircle, Clock, XCircle ,Search,Eye } from "lucide-react";
import Table from './Table';
import AdminOrdersList from './AdminOrdersList';
import AdminPagination from "./AdminPagination";
import { useOrdersData } from '../../context/OrderContext';
import { log } from 'firebase/firestore/pipelines';
import AdminOrderDrawer from './AdminOrderDrawer';

const AdminOrders = () => {

  const [data,setData]=useState('0')
  const [page,setPage]=useState(1)
  const[statsData,setStatsData]=useState()
  const[search ,setSearch]=useState("")
  const[statusFilter,setStatusFilter]=useState("all")
  const[sortOrder,setSortOrder]=useState("newest")
  const[orderDetail,setOrderDetail]=useState({})
  
 const{ fetchAllOrders, ordersData,calculateOrderStats,updateStatus} =   useOrdersData()



const onClose=()=>{
  setOrderDetail({})
}

   useEffect(()=>{
         fetchAllOrders()
    },[])



      // Start Filter Data logic  
  
    const filteredOrders=ordersData?.filter((order)=>{
    
      const matchesSearch=order.userInfo.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus= statusFilter=='all'|| order.status===statusFilter
        
      return matchesSearch&&matchesStatus  
     
    
    }).sort((a,b)=>{
        if(sortOrder=='newest'){
       return  b.createdAt-a.createdAt
        }
        else{
     return  a.createdAt-b.createdAt
        }
    })

    console.log(filteredOrders)
    //End Filter data logic 
         
 
 
  

  useEffect(()=>{
   
    
    if(!ordersData || ordersData.length === 0) return
    const stats=calculateOrderStats(ordersData)
   setStatsData(stats)
    
  },[ordersData])
 

     


  const orderStats = [
  {
    title: "Total Orders",
    value: statsData?.totalOrders, 
    icon: Package,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Delivered",
    value: statsData?.delivered, 
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Pending",
    value: statsData?.pending, 
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    title: "Failed ",
    value: statsData?.failed, // 
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
];

 
// order status
const statusOptions = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled"
];
     

   const handleSearchChange=(e)=>{
    setSearch(e.target.value)
    
    window.scroll(0,0)
    }

   

   


  //Start pagination logic
      const itemsPerPage=8

  const dynamicPage=Math.ceil(filteredOrders?.length/itemsPerPage)
 const pageHandler =(selectedPage)=>{
      setPage(selectedPage)
      window.scrollTo(0,0)

    }
    // End pagination logic 

  


if(filteredOrders?.length === 0 === 0){
  return(
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
      <Package size={40} />
      <p className="text-lg font-medium">No orders found</p>
      <p className="text-sm">Try changing your search or filter</p>
    </div>
  )
}
else{

   return (
    <div className='md:flex h-screen  '>
    <div 
    className=" p-4 md:p-6  bg-gray-200 overflow-x-hidden overflow-y-auto  max-w-full  h-full md:flex-1 " >
    
     <div  className='flex flex-col'>
      <h1 className="text-2xl font-semibold ">Orders </h1>
      <p>Manage all your orders</p>
      </div>

      {/* Order Stats */}

 <div className="grid  grid-cols-2 md:grid-cols-4 mt-4 gap-4 mb-6">
     
      {orderStats.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-md transition  rounded-xl p-4 flex items-center justify-between "
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold mt-1">{item.value}</h2>
            </div>

       
            <div className={`p-2 rounded-lg ${item.color}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>

    {/* End States Data */}

    {/* Order Table */}

    <div className="p-4 bg-white shadow rounded-xl  md:p-4 ">
                  
                  {/* Filter data start */}
      
              <div className=" p-5 md:p-0 rounded-xl flex flex-col md:flex-row gap-3 md:justify-between mb-4 ">
             <div className="relative  md:w-1/4">
               <Search
                 size={20}
                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
               />
             
               <input
                 type="text"
                 value={search}
                 onChange={handleSearchChange}
                 placeholder="Search by name..."
                className="w-full pl-10 pr-3 p-2 border rounded-xl bg-gray-50 focus:bg-white transition"
               />
             </div>

                
             <div className="flex  flex-row gap-2 ">
              {/* status filter */}
              <select
                className="p-2 pr-4 border rounded-lg w-[50%]"
                value={statusFilter}
                onChange={(e)=>setStatusFilter(e.target.value)}
                
              >
                <option value="all" >All</option>
                <option value='placed'>Pending </option>
                <option  value='processing'>Processing</option>
                <option  value='shipped'>Shipped</option>
                <option  value='delivered'>Delivered</option>
                <option  value='cancelled'>Cancelled</option>
              </select>
      
              {/* sorting by newest and oldest */}
               <select
                className="p-2  border rounded-lg w-[50%]"
                value={sortOrder}
                onChange={(e)=>setSortOrder(e.target.value)}
               
              >
                <option value="newest" >Newest</option>
                <option value="oldest" >Oldest</option>
          
              </select>
              </div>
            </div>

         {/* Mobile Responsive */}
<div className="md:hidden flex flex-col gap-3 p-3">
  {
    filteredOrders?.slice(page*itemsPerPage-itemsPerPage, page*itemsPerPage).map((order, i) => {
      return (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">

          {/* Order ID + Status */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 font-medium">#{order.orderId}</p>
            <select
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              {statusOptions.map((status, i) => (
                <option key={i} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <p className="text-base font-semibold text-gray-900">{order.userInfo.name}</p>

          {/* Total + Date */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {order.createdAt ? order.createdAt.toLocaleDateString() : "N/A"}
            </p>
            <p className="text-base font-bold text-gray-900">
              Rs. {order.pricing.total.toLocaleString()}
            </p>
          </div>

          {/* Eye Button */}
          <button className="w-full py-2 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
            onClick={()=>setOrderDetail(order)}
          >
            <Eye size={16} />
            View Detail
          </button>

        </div>
      )
    })
  }
</div>

             {/* Filter data end */}

              <Table
              columns={
                [
  "Order ID",
  "Customer Name",
  "City",
  "Total",
  "Payment",
  "Status",
  "Date",
  "Detail"
]
              }
              >
                {
                  filteredOrders?.slice(page*itemsPerPage-itemsPerPage,page*itemsPerPage).map((order)=>{
                    return  <AdminOrdersList order={order} orderDetail={orderDetail} statusOptions={statusOptions} setOrderDetail={setOrderDetail} />
                  })
                }


                </Table>

           <AdminPagination          
            page={page} 
          pageHandler={pageHandler} 
          dynamicPage={dynamicPage}
           />     



    </div>
      


    </div>

    <AdminOrderDrawer orderDetail={orderDetail} onClose={onClose}/>
    </div>
  )
}
 
}

export default AdminOrders