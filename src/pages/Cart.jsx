import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebook, LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

import Form from "../components/Form";
import OrderSuccessCard from "../components/OrderSuccessCard";

const Cart = ({ location, getLocation }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const[promoCodeMessage,setPromoCodeMessage]=useState("")
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  const { cartItems, updateQuantity, deleteItem, fetchCart } = useCart();

  // Valid promo codes
const validCodes = {
  "SHOPVRIX10": 10,
  "SAVE10": 10,
  "FYP2026": 10,
}



  //  console.log(cart);
  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const shipping = 200; // example logic
  const discount = 0; // add if you want
  const total = subtotal + shipping - promoDiscount;
  const pricing = {
    subtotal,
    shipping,
    discount:promoDiscount,
    total,
  };

  const handlePromoCode=()=>{
  const code=promoCode.toUpperCase().trim()
  if(validCodes[code]){
    const discountPercent=validCodes[code]
    const discountAmount=Math.round(subtotal*discountPercent/100)
    setPromoDiscount(discountAmount)
    setPromoCodeMessage(`✅ Promo code applied! ${discountPercent}% off`)
    
  }
  else{
    setPromoCode(0)
    setPromoCodeMessage("❌ Invalid promo code")
  }

}

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);


  return (
    <div>
      {/* <OrderSuccessCard /> */}

      <div className="mt-10 max-w-6xl mx-auto mb-5 md:px-0 px-4">
        {cartItems?.length > 0 ? (
          <div>
            <h1 className="font-bold text-2xl">MY Cart {cartItems.length}</h1>
            <div>
              <div className="mt-10">
                {cartItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 p-5 rounded-md flex items-center  justify-between mt-3 "
                    >
                      <div className="flex items-center md:gap-4  ">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="md:w-20  w-15 md:h-20 rounded-md"
                        />
                        <div>
                          <h1 className="md:w-[300px] line-clamp-2">
                            {item.title}
                          </h1>
                          <p className="text-red-500 font-semibold text-lg">
                            Rs.{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="bg-red-500 text-white flex ml-2 md:ml-0 gap-4 p-2 rounded-md font-bold text-xl">
                        <button
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, "decrease")}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, "increase")}
                        >
                          +
                        </button>
                      </div>
                      <span className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl">
                        <FaRegTrashAlt
                          onClick={() => deleteItem(item.id)}
                          className="text-red-500 text-2xl cursor-pointer"
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-5">
   
             {/* User Form */}
                  <div className="md:order-1 order-2">
             <Form cartItems={cartItems} pricing={pricing}  />
                  </div>
               


                <div className="bg-white border border-gray-100 shadow-xl p-7 rounded-md mt-4 space-y-2 h-max order-1 md:order-2">
                  <h1 className="text-gray-800 font-bold text-xl">
                    Bill details
                  </h1>
                  <div className="flex justify-between items-center">
                    <h1 className="flex gap-1 items-center text-gray-700">
                      <span>
                        <LuNotebookText />
                      </span>
                      Sub Total
                    </h1>
                    <p>Rs. {subtotal}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="flex gap-1 items-center text-gray-700">
                      <span>
                        <MdDeliveryDining />
                      </span>
                      Delivery Charge
                    </h1>
                    <p className="text-red-500 font-semibold">
                      <span className="text-gray-600">Rs. {shipping}</span>{" "}
                    </p>
                  </div>

                 {promoDiscount > 0 && (
  <div className="flex justify-between items-center">
    <h1 className="flex gap-1 items-center text-green-600">
      🎉 Discount
    </h1>
    <p className="text-green-600 font-semibold">- Rs. {promoDiscount}</p>
  </div>
)}
                  <hr className="text-gray-200 mt-2" />
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-lg">Total</h1>
                    <p className="text-lg font-semibold"> Rs. {total}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                      Apply Promo Code
                    </h1>
                    <p className="text-red-500  font-semibod mb-2">{promoCodeMessage}</p>
                    <div className="flex gap-3">
                      <input
                        value={promoCode}
                        onChange={(e)=>setPromoCode(e.target.value)}
                        type="text"
                        placeholder="Enter code"
                        className="p-2 rounded-md w-full"
                      />
                      <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md"
                      onClick={handlePromoCode}
                      >
                        Apply{" "}
                      </button>
                    </div>
                  </div>
                  {/* <button className='bg-red-500 w-full text-white px-3 py-2 rounded-md cursor-pointer mt-3'>Proceed to Checkout</button> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
            <h1 className="text-red-500/80 font-bold text-5xl text-muted">
              Cart is empty
            </h1>
            <img src={emptyCart} alt="" className="w-[400px]" />
            <button
              onClick={() => navigate("/products")}
              className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
