import React from 'react'

const DashboardNewCustomerList = ({order}) => {
  const getStatus = (status) => {
    const s = status == 'pending' ? 'placed' : status
    if (s === 'placed') return "bg-gray-100 text-gray-600";
    else if (s === 'processing') return "bg-blue-100 text-blue-600";
    else if (s === 'shipped') return "bg-orange-100 text-orange-600";
    else if (s === 'delivered') return "bg-green-100 text-green-600";
    else if (s === 'cancelled') return "bg-red-100 text-red-600";
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">

      <td className="px-4 py-3.5 text-sm ">{order.orderId}</td>

      <td className="px-4 py-3.5 text-sm ">{order.userInfo.name}</td>

      <td className="px-4 py-3.5 text-sm ">
        {order.createdAt ? order.createdAt.toLocaleDateString() : "N/A"}
      </td>

      <td className="px-4 py-3.5 text-sm ">Rs. {order.pricing.total.toLocaleString()}</td>

      <td className="px-4 py-3.5">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatus(order.status)}`}>
          {order.status == 'placed' ? 'pending' : order.status}
        </span>
      </td>

    </tr>
  )
}

export default DashboardNewCustomerList