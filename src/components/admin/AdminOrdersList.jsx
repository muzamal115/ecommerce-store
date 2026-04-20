import React from 'react'
import { Eye,Info } from 'lucide-react'
import { useOrdersData } from '../../context/OrderContext'

const AdminOrdersList = ({order,statusOptions,setOrderDetail,orderDetail}) => {


const{ updateStatus} =  useOrdersData()


//      "Order ID",
//   "Customer Name",
//   "City",
//   "Total",
//   "Payment",
//   "Status",
//   "Date",
//   "Actions"
  return (
    <>
    <tr className={`${orderDetail.id==order.id?'border-3 border-green-400 ':'border-b border-gray-300  '}  rounded-4xl`}>
         <td className="p-2">{order. orderId}</td>
         <td className="p-2">{order.userInfo.name}</td>
         <td className="p-2">{order.userInfo.city}</td>
         <td className="p-2">{order.pricing.total}</td>
         <td className="p-2">{order.paymentMethod}</td>
         <td className="p-2">
            <select name="" id=""
            className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={order.status}
            onChange={(e)=>updateStatus(order.id,e.target.value)}
            >
              {
                statusOptions.map((status,i)=>{
                  return <option
                   
                  key={i} value={status}>{status}</option>
                })
              }

            
            </select>
          </td>        
         <td className="p-2">{order.createdAt ? order.createdAt.toLocaleDateString() : "N/A"}</td>
         <td className="p-2">
            <button  className="p-2 text-blue-400 hover:bg-blue-100 rounded cursor-pointer"
             onClick={()=>setOrderDetail(order)}
            >
            <Eye/>
            </button>
            </td>
         
    </tr>
        
    </>
  )
}

export default AdminOrdersList