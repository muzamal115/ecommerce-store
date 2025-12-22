import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebook, LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import emptyCart from '../assets/empty-cart.png'

const Cart = ({location,getLocation}) => {
    const{user}=useUser()
    const navigate=useNavigate()
   
    
     const{cartItem,updateQuantity,deleteItem}=  useCart()
     const totalPrice = Math.round(cartItem.reduce((total, item) => total + item.price, 0));
  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 md:px-0 px-4'>
    {
       cartItem.length>0?<div>
        <h1 className='font-bold text-2xl'>MY Cart {cartItem.length}</h1>
        <div>
          <div className='mt-10'>
          {
            cartItem.map((item,index)=>{
              return(
                <div key={index}className='bg-gray-100 p-5 rounded-md flex items-center  justify-between mt-3 '>
                  <div className='flex items-center md:gap-4  '>
                    <img src={item.thumbnail} alt={item.title} className='md:w-20  w-15 md:h-20 rounded-md' />
                    <div>
                      <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
                      <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white flex ml-2 md:ml-0 gap-4 p-2 rounded-md font-bold text-xl">
                    <button className='cursor-pointer' onClick={()=>updateQuantity(item.id,'decrease')} >-</button>
                    <span>{item.quantity}</span>
                    <button className='cursor-pointer' onClick={()=>updateQuantity(item.id,'increase')}  >+</button>

                  </div>
                  <span className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                    <FaRegTrashAlt onClick={()=>deleteItem(item.id)} className='text-red-500 text-2xl cursor-pointer'/>
                  </span>
                   

                </div>
            
              )
            })
          }

          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
            <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
              <h1 className='text-gray-800 font-bold text-xl'>Delievery Info</h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Full Name</label>
                <input type="text" value={user?.fullName}
                 placeholder='Enter your name' className='p-2 rounded-md' />
              </div>

               <div className="flex flex-col space-y-1">
                <label htmlFor="">Address</label>
                <input type="text" placeholder='Enter your address'  className='p-2 rounded-md' />
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">State</label>
                  <input type="text" placeholder='Enter your state' value={location?.state} className='w-full p-2 rounded-md' />
                </div>
               <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">PostCode</label>
                  <input type="text" value={location?.postcode} placeholder='Enter your postcode' className='w-full p-2 rounded-md' />
                </div>

              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Country</label>
                  <input type="text" value={location.country} placeholder='Enter your country' className='w-full p-2 rounded-md' />
                </div>
               <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Phone No</label>
                  <input type="text" placeholder='Enter your number' className='w-full p-2 rounded-md' />
                </div>

              </div>
              <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>

            <div className="flex items-center justify-center w-full">
              ---------OR---------
            </div>
            <div className="flex justify-center">
              <button onClick={getLocation} className='bg-red-500 text-white px-3 py-2 rounded-md'>Detect Location</button>
            </div>
            </div>
            <div className='bg-white border border-gray-100 shadow-xl p-7 rounded-md mt-4 space-y-2 h-max'>
              <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText/></span>Items total</h1>
                <p>${totalPrice}</p>
                
              </div>

              <div className="flex justify-between items-center">
                <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining/></span>Items total</h1>
                <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                
              </div>

               <div className="flex justify-between items-center">
                <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag/></span>Handing Charge</h1>
                <p className='text-red-500 font-semibold'> $5</p>
                
              </div>
              <hr  className='text-gray-200 mt-2'/>
               <div className="flex justify-between items-center">
                <h1 className='font-semibold text-lg'>Handing Charge</h1>
                <p className='text-lg font-semibold'> ${totalPrice+5}</p>
                
              </div>
              <div>
                <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                <div className='flex gap-3'>
                  <input type="text" placeholder='Enter code' className='p-2 rounded-md w-full' />
                  <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply </button>

                </div>
              </div>
              <button className='bg-red-500 w-full text-white px-3 py-2 rounded-md cursor-pointer mt-3'>Proceed to Checkout</button>

            </div>
          </div>

        </div>
       </div>:<div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
        <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
        <img src={emptyCart}  alt="" className='w-[400px]' />
        <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'>Continue Shopping</button>
       </div>
    }
  </div>
  )
  
}

export default Cart