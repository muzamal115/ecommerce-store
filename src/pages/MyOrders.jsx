import React, { useEffect } from "react";
import OrderSuccessCard from "../components/OrderSuccessCard";



const MyOrders = ({orders}) => {


  const sortedOrders=orders.sort((a,b)=>{
    return b.createdAt-a.createdAt
  })

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  
const statusColors=(status) => {
  const s= status=='pending'?'placed':status
  if(s==='placed') return "bg-gray-200 text-gray-700";
 else if (s==='processing')  return"bg-blue-200 text-blue-700";
  else if (s==='shipped')  return"bg-orange-200 text-orange-700";
  else if (s==='delivered')  return"bg-green-200 text-green-700";
 else if (s==='cancelled')  return"bg-red-200 text-red-700"

};


  if (orders.length === 0) { return ( 
  <div className="flex flex-col items-center justify-center py-20 text-center">
   <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="No Orders" className="w-24 mb-4 opacity-70" />
    <h2 className="text-xl font-semibold text-gray-700"> No Orders Yet </h2> 
    <p className="text-gray-500 mt-2"> Looks like you haven't placed any orders. </p>
     <button className="mt-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"> Start Shopping </button> 
     </div>
      ); }
  return (
    <>
    <OrderSuccessCard/>
    <div className="max-w-4xl mx-auto px-4 py-8">

  <h1 className="text-2xl font-bold text-gray-800 mb-8">My Orders</h1>

  <div className="space-y-6">
    {sortedOrders?.map((order, index) => {
       
         const displayStatus = order.status === "pending" ? "placed" : order.status;
    return(
      <div
        key={order.orderId}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >

        {/* ── Order Header Bar ── */}
        <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-3">
            {/* Order Number Badge */}
            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">
              #{index + 1}
            </span>
            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <p className="text-sm font-semibold text-gray-700">{order.orderId}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="md:text-right text-left">
              <p className="text-xs text-gray-400">Placed on</p>
              <p className="text-sm text-gray-600">
                {order.createdAt instanceof Date
                  ? order.createdAt.toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors(order.status)}`}>
              {displayStatus}
            </span>
          </div>

        </div>

        {/* ── Products ── */}
        <div className="px-5 py-4 space-y-4">
          {order.orderItems.map((item,i) => (

            <div key={i} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{item.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  Rs {item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-gray-700 shrink-0">
                Rs {item.price * item.quantity}
              </p>
            </div>

          ))}
        </div>

        {/* ── Pricing ── */}
        <div className="border-t border-dashed border-gray-200 mx-5"></div>
        <div className="px-5 py-4 space-y-1.5 text-sm">

          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>Rs {order.pricing.subtotal}</span>
          </div>

          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>Rs {order.pricing.shipping}</span>
          </div>

          <div className="flex justify-between font-bold text-gray-800 text-base pt-1 border-t border-gray-100 mt-1">
            <span>Total</span>
            <span>Rs {order.pricing.total}</span>
          </div>

        </div>

        {/* ── Address + Payment ── */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Shipping Address</p>
            <p className="text-gray-700">{order.userInfo.address}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Payment Method</p>
            <p className="text-gray-700 capitalize">{order.paymentMethod}</p>
          </div>

        </div>

      </div>
)
    })}
  </div>

</div>
 </> );
};

export default MyOrders;