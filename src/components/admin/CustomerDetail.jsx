import React from "react";
import { useParams } from "react-router-dom";
import { useOrdersData } from "../../context/OrderContext";
import { getData } from "../../context/DataContext";

  const CustomerDetail = () => {
  const { ordersData } = useOrdersData();
  const { users } = getData();
  const { id } = useParams();

  const customer = users.find((user) => user.id === id);
  const orders = ordersData.filter((order) => order.userId === id);

  let totalSpend = 0;
  orders.forEach((o) => {
    totalSpend += o.pricing.subtotal;
  });

  const getStatusStyle = (status) => {
    const s = status === "placed" ? "pending" : status;
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "delivered") return "bg-green-100 text-green-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-600";
  };


 if (orders.length === 0) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="text-4xl mb-3">📦</div>
        <h3 className="text-gray-700 font-semibold text-lg">No Orders Found</h3>
        <p className="text-gray-400 text-sm mt-1">This customer hasn't placed any orders yet.</p>
      </div>
    </div>
  );
}

  

  return (
 

    <div className="p-4 md:p-8  bg-gray-50 min-h-screen">

      {/* Customer Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold shrink-0 ">
          {customer?.name.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{customer.name}</h2>
          <p className="text-gray-500 text-sm mt-0.5">{customer.email}</p>
          <p className="text-gray-500 text-sm">{orders[0]?.userInfo.phone}</p>
          <p className="text-xs text-gray-400 mt-2">
            Joined:{" "}
            {customer?.createdAt
              ? new Date(customer.createdAt.toDate()).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Orders</p>
          <h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Spend</p>
          <h3 className="text-2xl font-bold text-gray-800">Rs. {totalSpend.toLocaleString()}</h3>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Order History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="pb-3 pr-4 ">Order ID</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3 pr-4">Payment</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              
              {orders.map((order) => {
                const displayStatus = order.status === "placed" ? "pending" : order.status;
                return (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4 text-gray-700 font-medium">{order.orderId}</td>
                    <td className="py-3 pr-4 text-gray-500">
                      {order.createdAt ? order.createdAt.toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 pr-4 text-gray-700">Rs. {order.pricing.subtotal.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-gray-500 capitalize">{order.paymentMethod}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(order.status)}`}>
                        {displayStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CustomerDetail;