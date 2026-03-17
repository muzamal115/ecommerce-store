import React from "react";

// const orders = [
//   {
//     id: "A12345",
//     date: "12 March 2026",
//     status: "Shipped",
//     pricing: {
//       subtotal: 5300,
//       shipping: 200,
//       total: 5500
//     },
//     payment: "Cash on Delivery",
//     address: "Multan, Punjab, Pakistan",
//     items: [
//       {
//         id: "p1",
//         title: "Nike Shoes",
//         price: 3000,
//         quantity: 1,
//         image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
//       },
//       {
//         id: "p2",
//         title: "T-Shirt",
//         price: 1000,
//         quantity: 2,
//         image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
//       },
//       {
//         id: "p3",
//         title: "Watch",
//         price: 300,
//         quantity: 1,
//         image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
//       },
//     ],
//   },

//    {
//     id: "A12345",
//     date: "12 March 2026",
//     status: "Cancelled",
//     pricing: {
//       subtotal: 5300,
//       shipping: 200,
//       total: 5500
//     },
//     payment: "Cash on Delivery",
//     address: "Multan, Punjab, Pakistan",
//     items: [
//       {
//         id: "p1",
//         title: "Nike Shoes",
//         price: 3000,
//         quantity: 1,
//         image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
//       },
      
//     ],
//   }
// ];

const MyOrders = ({orders}) => {

  
const getStatusStyle = (status) => {
  switch (status) {
    case "Placed":
      return "bg-gray-200 text-gray-700";
    case "Processing":
      return "bg-blue-100 text-blue-600";
    case "Shipped":
      return "bg-orange-100 text-orange-600";
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-200";
  }
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
    <div className="max-w-5xl mx-auto p-4 ">

      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6 ">
        {orders.map((order) => (
    

          <div
            key={order.id}
            className="bg-white border rounded-lg shadow-sm p-4 border-red-600"
          >

            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">

              <div>
                <p className="font-semibold">Order #{order.id}</p>
                {/* <p className="text-sm text-gray-500">{order.createdAt}</p> */}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}
              >
                {order.status}
              </span>

            </div>

            {/* Products */}
            <div className="space-y-4">
              {order.orderItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Rs {item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Rs {item.price * item.quantity}
                  </p>

                </div>

              ))}
            </div>

            {/* Pricing Section */}
            <div className="mt-4 border-t pt-3 text-sm space-y-1">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {order.pricing.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs {order.pricing.shipping}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs {order.pricing.total}</span>
              </div>

            </div>

            {/* Address + Payment */}
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">

              <div className="">
                <p className="font-semibold">Shipping Address</p>
                <p className="text-gray-600">{order.userInfo.address}</p>
              </div>

              <div className="">
                <p className="font-semibold">Payment Method</p>
                <p className="text-gray-600">{order.paymentMethod}</p>
              </div>

            </div>

          </div>

        ))}
      </div>

    </div>
  );
};

export default MyOrders;