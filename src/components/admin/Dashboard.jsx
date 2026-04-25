import React, { useEffect, useState } from "react";
import { Package, DollarSign, Users, ShoppingCart } from "lucide-react";
import { getData } from "../../context/DataContext";
import { useOrdersData } from "../../context/OrderContext";
import LoadingSpinner from "./LoadingSpinner";
import Table from "./Table";
import DashboardNewCustomerList from "./DashboardNewCustomerList";

const Dashboard = () => {

  const[statsData,setStatsData]=useState({})

  const{users,data,getStoreOverview,fetchUsers,fetchAllProducts}=getData()
    const{ordersData,fetchAllOrders} =useOrdersData()   

    useEffect(()=>{
     fetchUsers()
     fetchAllProducts()
     fetchAllOrders()

    },[])

    useEffect(()=>{
      if(!users||users.length===0||!data||data.length===0||!ordersData||ordersData.length===0) return
    const stats=getStoreOverview(data,ordersData,users)
    setStatsData(stats)
    console.log(stats);
    

    },[users,data,ordersData])


  // filterd new customer data
   
  const filteredOrders=ordersData.sort((a,b)=>{
    return b.createdAt-a.createdAt
  })


  // 🔹 Store Stats
  const stats = [
    {
      title: "Total Orders",
      value: statsData?. totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${statsData?.totalRevenue?.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Total Customers",
      value: statsData?.totalCustomers,
      icon: Users,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Total Products",
      value: statsData?.totalProducts,
      icon: Package,
      color: "text-orange-600 bg-orange-100",
    },
  ];
// change the color according to status type
 const getStatus = (status) => {
    const s = status == 'pending' ? 'placed' : status
    if (s === 'placed') return "bg-gray-100 text-gray-600";
    else if (s === 'processing') return "bg-blue-100 text-blue-600";
    else if (s === 'shipped') return "bg-orange-100 text-orange-600";
    else if (s === 'delivered') return "bg-green-100 text-green-600";
    else if (s === 'cancelled') return "bg-red-100 text-red-600";
  }

      


 if(!ordersData||ordersData.length===0){
return <LoadingSpinner/>
 } 

  return (
    <div className="p-4 md:p-6 bg-gray-200 min-h-screen">

    
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600">Overview of your store</p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 flex items-center justify-between"
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

      {/* 🔷 Recent Orders */}

      <div className="p-4 bg-white shadow rounded-xl  md:p-4  ">
         <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

         
                  {/* Mobile Responsive */}
        <div className="md:hidden flex flex-col gap-3 p-4">
  {filteredOrders?.map((order, i) => {
    return (
      <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">

        {/* Order ID + Status */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-gray-400 tracking-wide">
            {order.orderId}
          </p>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getStatus(order.status)}`}>
            {order.status === 'placed' ? 'pending' : order.status}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Name */}
        <p className="text-sm font-semibold text-gray-800">{order.userInfo.name}</p>

        {/* Date + Total */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {order.createdAt ? order.createdAt.toLocaleDateString() : "N/A"}
          </p>
          <p className="text-sm font-bold text-gray-800">
            Rs. {order.pricing.total.toLocaleString()}
          </p>
        </div>

      </div>
    )
  })}
</div>
         {/* End mobile responsive */}
        <Table columns={["OrderID","Customer","Date", "Total", "Status"]}>

          {
            filteredOrders?.slice(0,5)?.map((order)=>{
             return <DashboardNewCustomerList order={order} />
            })
          }
         

        </Table>

      </div>

      
     



    </div>
  );
};

export default Dashboard;