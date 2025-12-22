import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../components/Breadcrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {
   const{addToCart}=useCart()
   const{id}= useParams()
   const [singleProduct ,setSingleProduct]=useState('')

 
   const getSingleProduct=async()=>{

      try {
         const res=  await axios.get(`https://dummyjson.com/products/${id}`)
         const product=res.data;
         setSingleProduct(product)
      console.log(product);
    
   } catch (error) {
    console.log(error);
    
   }
     
      
   }
   useEffect(()=>{
    getSingleProduct();
   },[])
   const OriginalPrice=Math.round(singleProduct.price+(singleProduct.price*singleProduct.discountPercentage
/100))
  return (
    <>
    {
      singleProduct? <div className='px-4 pb-4 md:px-0'>
         <Breadcrums title={singleProduct.title}/>
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-10 md:p-6 place-items-center ">
            {/* product image */}
            <div className='w-full '>
               <img 
               className='rounded-2xl  w-full object-cover'
               src={singleProduct.thumbnail} alt={singleProduct.title} />
            </div>
            {/* product detail */}
            <div className='flex flex-col gap-6  '>
               <h1 className='md:text-3xl font-bold text-xl text-gray-800'>{singleProduct.title}</h1>
               <div className='text-gray-700'>{singleProduct.brand?.toUpperCase()} / {singleProduct.category.toUpperCase()}</div>
               <p className='text-xl text-red-500 font-bold'>${singleProduct.price} <span className='line-through text-gray-700'>${OriginalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{Math.round(singleProduct.discountPercentage)}% discount </span></p>
               <p className='text-gray-600'>{singleProduct.description}</p>
               {/* quantity selector */}
               <div className='flex items-center gap-4'>
                  <label className='text-sm font-medium text-gray-700' htmlFor="">Quantity:</label>
                  <input  className='w-20 border border-gray-300 rounded-lg px-3 py-1 outline-none ring-2 ring-red-500 ' type="number" value={1} min={1}/>
               </div>

               <div className='flex gap-4 mt-4'>
                 <button onClick={()=>addToCart(singleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'>
                     <IoCartOutline className='w-6 h-6' /> Add to Cart
                 </button>
               </div>
            </div>

         </div>

      </div>:  <div className=' flex items-center justify-center h-screen'>
                  <video muted autoPlay loop>
            <source  src={Loading} type='video/webm'/>
                  </video>
                  </div>
    }
        
    </>
  )
}

export default SingleProduct