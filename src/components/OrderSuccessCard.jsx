import React, { useEffect, useState } from "react";
import { useOrdersData } from "../context/OrderContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const OrderSuccessCard = () => {
  const [show,setShow]=useState(true)
  const {showSuccessCard,orderId,setShowSuccessCard}=useOrdersData()
   const navigate= useNavigate()


  //  useEffect(()=>{
  //     setTimeout(() => {
  //         setShow(false)
  //     }, 5000);
  //  },[])

  const onClose=()=>{
    setShowSuccessCard(false)
  }
 
  return (

    <div>
      {showSuccessCard? (
        <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-96 p-6 relative animate-fadeIn">
            {/* Close button */}
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <IoClose className="w-6 h-6 cursor-pointer" onClick={onClose} />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Text */}
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
              Order Placed!
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Your order has been successfully placed.
            </p>

            {/* Order ID */}
            <p className="text-center text-gray-700 mb-6">
              <span className="font-semibold">Order ID:</span> {orderId}
            </p>

            {/* Continue Shopping Button */}
            <button  onClick={() => navigate("/products")} className="w-full bg-red-500 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderSuccessCard;
