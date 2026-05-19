import React, { useState } from "react";
import { X, MapPin, Phone, Mail, Package , Printer} from "lucide-react";





const AdminOrderDrawer = ({ orderDetail, onClose }) => {
  
  if (!orderDetail||Object.keys(orderDetail).length === 0) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="md:h-full h-screen   "
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="top-0 fixed xl:relative right-0 z-50 md:z-0 h-full max-w-md bg-white flex flex-col shadow-xl translate-x-0 transition-transform duration-300 print-area  ">

        {/* Header */}
        <div className="flex justify-between items-start p-5 border-b border-gray-100">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">Order details</p>
            <h2 className="text-[17px] font-medium text-gray-900">#{orderDetail.orderId}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
             {orderDetail.createdAt ? orderDetail.createdAt.toLocaleDateString() : "N/A"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition no-print"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">

          {/* Customer */}
          <div className="p-5 border-b border-gray-100">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">Customer</p>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-medium shrink-0">
  {orderDetail.userInfo.name?.charAt(0).toUpperCase()}
</div>
              <div>
                <p className="text-sm font-medium text-gray-900">{orderDetail.userInfo.name}</p>
                <p className="text-xs text-gray-400">{orderDetail.userInfo.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              <div className="flex gap-3">
                <span className="text-xs text-gray-400 w-14 shrink-0">Phone</span>
                <span className="text-xs text-gray-700">{orderDetail.userInfo.phone}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-xs text-gray-400 w-14 shrink-0">Address</span>
                <span className="text-xs text-gray-700 leading-relaxed">
                  {orderDetail.userInfo.address}, {orderDetail.userInfo.city}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-5 border-b border-gray-100">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">
              Items · {orderDetail.orderItems.length}
            </p>

            <div className="divide-y divide-gray-100">
              {orderDetail.orderItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-center py-2.5">
                  <img
                    src={item.image}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800 shrink-0">
                    Rs.{(item.quantity * item.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="p-5">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">Pricing</p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-700">Rs.{orderDetail.pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-gray-700">Rs.{orderDetail.pricing.shipping.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex justify-between text-[15px] font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">Rs.{orderDetail.pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex flex-col gap-2">

          <button
  onClick={() => window.print()}
  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 no-print"
>
  <Printer size={16} />
  Print Order
</button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition no-print"
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
};

export default AdminOrderDrawer;






