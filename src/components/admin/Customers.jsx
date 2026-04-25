import React, { useEffect, useState } from 'react'

import { Users, ShoppingBag, DollarSign, UserPlus ,Search, Eye} from "lucide-react";
import Table from './Table';
import CustomersList from './CustomersList';
import Pagination from './AdminPagination';
import { getData } from '../../context/DataContext';
import { useOrdersData } from '../../context/OrderContext';
import { logicalMaximum } from 'firebase/firestore/pipelines';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Customers = () => {

  const [statsData, setStatsData] = useState(null);
  const [page,setPage]=useState(1)
  const[search,setSearch]=useState("")
  const[sortUser,setSortUser]=useState('newest')
  const{users,fetchUsers,calculateCustomerStats,getuserStats}=getData()
  const{ordersData,fetchAllOrders} =useOrdersData()
  const navigate=useNavigate()

    const customersData=users?.map((user)=>{
         const stats=  getuserStats(user.id,ordersData)
         
         return {
            id:user?.id,
          name: user?.name,
          email:user?.email,
         
          orders: stats?.orders,
          totalSpend: stats?.totalSpend,
          joinedDate:  user?.createdAt
      ? new Date(user.createdAt.toDate()).toLocaleDateString()
      : "N/A",
       createdAt: user?.createdAt       // ✅ yeh line add karo
      ? new Date(user.createdAt.toDate())
      : null,

          }
        

   })
  

  //  start Filter Data logic
   const filteredCustomers=customersData?.filter((customer)=>{

    const matchesSearch=customer.name.toLowerCase().includes(search.toLowerCase())
    return matchesSearch

   }).sort((a, b) => {
  if (sortUser == 'newest') {
    return b.createdAt - a.createdAt  // ✅ Date - Date = milliseconds
  } else {
    return a.createdAt - b.createdAt
  }
})

    
    
  //  end filter data logic
      

     
        useEffect(()=>{
          fetchUsers()
          fetchAllOrders()
    
        },[])

        useEffect(()=>{
          
          
          
   if(!users||!ordersData||ordersData.length === 0||users.length==0) return
   
    
const stats= calculateCustomerStats(users,ordersData)  
setStatsData(stats)

 
        },[users,ordersData])


   //Start pagination logic
      const itemsPerPage=8

  const dynamicPage=Math.ceil(filteredCustomers?.length/itemsPerPage)
 const pageHandler =(selectedPage)=>{
      setPage(selectedPage)
      window.scrollTo(0,0)

    }
    // End pagination logic 


    // start user stats

    const customerStats = [
  {
    title: "Total Customers",
    value:statsData?.totalCustomers , 
    icon: Users,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Total Orders",
    value: statsData?.totalOrders, 
    icon: ShoppingBag,
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Total Revenue",
    value: `Rs. ${statsData?.totalRevenue}`, 
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "New Customers",
    value: statsData?. newCustomers, 
    icon: UserPlus,
    color: "text-yellow-600 bg-yellow-100",
  },
];
    // end user stats

    // All customers data

 


if(!customersData||customersData.length==0){
  return(
    // <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
    //   {/* <Package size={40} /> */}
    //   <p className="text-lg font-medium">No Customer found</p>
    //   <p className="text-sm">Try changing your search or filter</p>
    // </div>
    <LoadingSpinner/>
  )
}  
else{


  return (
    <div className='md:flex bg-gray-200 h-screen '>
      <div  className=" p-4 md:p-6  bg-gray-200 overflow-x-hidden overflow-y-auto  max-w-full  h-full md:flex-1 " >

         <div  className='flex flex-col'>
      <h1 className="text-2xl font-semibold ">Customers </h1>
      <p>Manage and view all your store customers</p>
      </div>

       {/* Order Stats */}

 <div className="grid  grid-cols-2 md:grid-cols-4 mt-4 gap-4 mb-6">
     
      {customerStats.map((item, i) => {
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

    {/* Start table   */}

    <div className="p-4 bg-white shadow rounded-xl  md:p-4 ">

    <div className=" p-5 md:p-0 rounded-xl flex flex-col md:flex-row gap-3 md:justify-between mb-4 ">
       <div className="relative  md:w-1/4">
         <Search
           size={20}
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
         />
       
         <input
           type="text"
           value={search}
           onChange={(e)=>setSearch(e.target.value)}
           placeholder="Search by name..."
          className="w-full pl-10 pr-3 p-2 border rounded-xl bg-gray-50 focus:bg-white transition"
         />
       </div>
       <div className="flex  flex-row gap-2 ">
       

         <select
          className="p-2  border rounded-lg w-full"
          value={sortUser}
         onChange={(e)=>setSortUser(e.target.value)}
        >
          <option value="newest" >Newest</option>
          <option value='oldest'>Oldest </option>
          
        </select>
        </div>
      </div>

      {/* mobile Responsive */}

      <div className="md:hidden flex flex-col gap-3 p-3">
{
  filteredCustomers?.slice(page*itemsPerPage-itemsPerPage, page*itemsPerPage).map((customer, i) => {
    return (
      <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">

        {/* Name + Email */}
        <div>
          <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{customer.email}</p>
        </div>

        {/* Orders + Spent */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Orders: {customer.orders}</p>
          <p className="text-sm font-bold text-gray-900">Rs. {customer.totalSpend.toLocaleString()}</p>
        </div>

        {/* Joined Date */}
        <p className="text-xs text-gray-400">Joined: {customer.joinedDate}</p>

        {/* View Button */}
        <button
          className="w-full py-2 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
          onClick={() => navigate(`/admin/customers/${customer.id}`)}
        >
          <Eye size={16} />
          View Detail
        </button>

      </div>
    )
  })
}
</div>

<Table
 columns={["Name", "Email", "Orders", "Total Spend", "Joined Date", "Detail"]}
>

  {

filteredCustomers?.slice(page*itemsPerPage-itemsPerPage,page*itemsPerPage).map((c)=>{
  return  <CustomersList c={c}/>
})


  }


</Table>
<Pagination
         page={page} 
          pageHandler={pageHandler} 
          dynamicPage={dynamicPage}
/>

      </div>
    {/* End table */}

   


      </div>
      <div>
    
      </div>
     
      </div>
  )}
}

export default Customers