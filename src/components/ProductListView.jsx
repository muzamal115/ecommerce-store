import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '@clerk/clerk-react'

const ProductListView = ({product}) => {
   const navigate =useNavigate()
        const{addToCart} =useCart()
        const{user}=useUser()
   
  return (
    <div className='space-y-4 mt-2 rounded-md '>
        <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md '>
            <img src={product.image} alt={product.title} className='md:h-60 md:w-60 w-25 h-25 rounded-md cursor-pointer ' onClick={()=>navigate(`/products/${product.id}`)}/>
            <div className="space-y-2">
           <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full max-w-[220px]'>{product.title}</h1>
           <p className='font-semibold flex items-center text-sm md:text-lg'>Rs. <span className='md:text-4xl text-3xl'>{product.price}</span> ({Math.round(product.discount)
})% off</p>
           <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />Or fastest delivery  <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
           {/* <button  onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button> */}

               {user ? (
   <button onClick={() => addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
) : (
   <button onClick={() => router.push("/sign-in")} className='bg-red-500 text-white px-3 py-1 rounded-md'>
      Login to Add
   </button>
)}
            </div>
        </div>
    </div>
  )
}

export default ProductListView