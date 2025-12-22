import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
    // console.log(product);
    
   const navigate=useNavigate()
   const {addToCart}=useCart()
    
return (
  <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-[320px] flex flex-col '>
      
      <div className='w-full h-40 bg-gray-100 rounded-xl overflow-hidden'>
        <img src={product.thumbnail} 
             alt="" 
             className='w-full h-full object-cover'
             onClick={()=>navigate(`/products/${product.id}`)}
             />
             
      </div>

      <h1 className='line-clamp-2 p-1 font-semibold min-h-[48px]'>
        {product.title}
      </h1>

      <p className='text-lg text-gray-800 font-bold mt-auto'>
        ${product.price}
      </p>

      <button onClick={()=>addToCart(product)} className='bg-red-500 md:px-3 px-1 py-2 mt-2 text-lg rounded-md text-white w-full flex gap-1 md:gap-2 justify-center items-center font-semibold'>
        <IoCartOutline className='w-6 h-6'/> Add to Cart
      </button>

  </div>
)

}

export default ProductCard


