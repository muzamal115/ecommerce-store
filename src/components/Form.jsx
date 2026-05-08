import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaWallet,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";


import { useOrdersData } from "../context/OrderContext";
import { Navigate, useNavigate } from "react-router-dom";


const Form = ({ cartItems, pricing }) => {
  const { user } = useUser();
 const navigate= useNavigate()

  const [name, setName] = useState(user ? user.fullName : "");
  const [email, setEmail] = useState(
    user ? user.primaryEmailAddress.emailAddress : "",
  );
  const [country, setCountry] = useState("Pakistan");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const[loading,setLaoding]=useState(false)
  

  const { placeOrder ,orderSuccess,showSuccessCard} = useOrdersData();

  const orderSubmit = (e) => {
    e.preventDefault();
    setLaoding(true)
    const userFormData = {
      name,
      email,
      country,
      address,
      city,
      phoneNumber,
    };
    placeOrder(user, cartItems, userFormData, pricing, selectedPayment);
    setLaoding(false)
    navigate('/orders')

    console.log("Order placed");
  };
 

  return (
    <div>
      
      <form
        onSubmit={orderSubmit}
        className="bg-gray-100 rounded-md p-7 mt-4 space-y-2 order-2 md:order-1 "
      >
        <h1 className="text-gray-800 font-bold text-xl">Delievery Info</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
            className="p-2 rounded-md"
          />
        </div>

        <div className=" w-full md:gap-5 md:flex ">
          <div className="flex flex-col space-y-1 w-full mb-2 md:mb-0">
            <label htmlFor="">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">Post Code (optional)</label>
            <input
              type="text"
              value={postCode}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setPostCode(onlyNums);
              }}
              placeholder="Enter your postcode"
              className="w-full p-2 rounded-md"
            />
          </div>
        </div>

        <div className="md:flex w-full md:gap-5">
          <div className="flex flex-col space-y-1 w-full mb-2 md:mb-0">
            <label htmlFor="">Country</label>
            <select
              value={country}
              type="text"
              placeholder="Enter your country"
              required
              className="w-full p-2 bg-white border-gray-200 border-2 rounded-md"
              onChange={() => setCountry(e.target.value)}
            >
              <option value={country}>{country}</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">Phone No</label>
            <input
              value={phoneNumber}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-digits
                setPhoneNumber(onlyNums);
              }}
              type="text"
              placeholder="Enter your number"
              required
              className="w-full p-2 rounded-md"
            />
          </div>
        </div>

        <h1 className="text-gray-800 font-bold text-lg mt-5">Payment Method</h1>
        <div className="flex flex-col space-y-2 mt-2">
          {/* Cash on Delivery */}
          <label
            className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedPayment("cod")}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedPayment === "cod"}
              onChange={() => setSelectedPayment("cod")}
              className="accent-red-500"
            />
            <FaMoneyBillWave className="text-red-500" />
            <span>Cash on Delivery</span>
          </label>

          {/* EasyPaisa */}
          <label
            className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={() => {
              setSelectedPayment("easypaisa");
              window.open("https://www.easypaisa.com.pk", "_blank");
            }}
          >
            <input
              type="radio"
              name="payment"
              value="easypaisa"
              checked={selectedPayment === "easypaisa"}
              onChange={() => {
                setSelectedPayment("easypaisa");
                window.open("https://www.easypaisa.com.pk", "_blank");
              }}
              className="accent-red-500"
            />
            <FaMobileAlt className="text-green-600" />
            <span>EasyPaisa</span>
          </label>

          {/* JazzCash */}
          <label
            className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={() => {
              setSelectedPayment("jazzcash");
              window.open("https://www.jazzcash.com.pk", "_blank");
            }}
          >
            <input
              type="radio"
              name="payment"
              value="jazzcash"
              checked={selectedPayment === "jazzcash"}
              onChange={() => {
                setSelectedPayment("jazzcash");
                window.open("https://www.jazzcash.com.pk", "_blank");
              }}
              className="accent-red-500"
            />
            <FaWallet className="text-blue-600" />
            <span>JazzCash</span>
          </label>

          {/* Debit/Credit Card */}
          <label className="flex flex-col border rounded-md p-2 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={() => setSelectedPayment("card")}
                className="accent-red-500"
              />
              <FaCreditCard className="text-gray-700" />
              <span>Debit / Credit Card</span>
            </div>

            {/* Expandable card form */}
            {selectedPayment === "card" && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="p-2 rounded-md border w-full"
                />
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  className="p-2 rounded-md border w-full"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 rounded-md border w-full"
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="p-2 rounded-md border w-full"
                />
              </div>
            )}
          </label>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="bg-red-500 w-full text-white py-3 rounded-md mt-4 cursor-pointer text-lg font-semibold hover:bg-red-600 transition"
          disabled={loading}
        >
         {loading?'Wait..':'Place Order'} 
        </button>
      </form>
    </div>
  );
};

export default Form;
