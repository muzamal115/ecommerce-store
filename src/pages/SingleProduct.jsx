import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../components/Breadcrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'
import { getData } from '../context/DataContext'
import { useUser } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'

const SingleProduct = () => {
  const { addToCart } = useCart()
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState('')
  const [image, setImage] = useState('')
  const { getSingleProduct } = getData()
  const [productQuantity, setProductQuantity] = useState(1)
  const { user } = useUser()
  const { openSignIn } = useClerk()

useEffect(() => {
  getSingleProduct(id).then((value) => {
   
    console.log(value)
   
    setSingleProduct(value)
    
    setImage(value.image)
  })
}, [])

  const OriginalPrice = Math.round(
    singleProduct.price + (singleProduct.price * singleProduct.discount / 100)
  )

  return (
    <>
      {singleProduct ? (

        <div className='px-4 pb-4 md:px-0'>
          <Breadcrums title={singleProduct.title} />

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:p-6 place-items-center">

            {/* Image Section */}
            <div className='w-full'>
              <img
                className='rounded-2xl w-full object-cover h-[300px] md:h-[420px]'
                src={image}
                alt={singleProduct.title}
              />

              {/* Image Gallery */}
              {singleProduct.images?.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {singleProduct.images.map((img, index) => (
                    <img
                      onClick={() => setImage(img)}
                      key={index}
                      src={img}
                      alt="product"
                      className={`w-20 h-20 object-cover rounded-lg border cursor-pointer
                        ${image === img
                          ? "border-red-500 ring-2 ring-red-400"
                          : "border-gray-300"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Detail */}
            <div className='flex flex-col gap-5 w-full'>

              {/* Title */}
              <h1 className='text-xl md:text-3xl font-bold text-gray-800'>
                {singleProduct.title}
              </h1>

              {/* Brand / Category */}
              <p className='text-sm text-gray-500 font-medium tracking-wide'>
                {singleProduct.brand?.toUpperCase()} / {singleProduct.category.toUpperCase()}
              </p>

              {/* Price */}
              <div className='flex items-center gap-3 flex-wrap'>
                <span className='text-xl font-bold text-red-500'>
                  Rs. {singleProduct.price }
                </span>
                <span className='line-through text-gray-400 text-sm'>
                  Rs. {OriginalPrice }
                </span>
                <span className='bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                  {Math.round(singleProduct.discount)}% OFF
                </span>
              </div>

              {/* Description */}
              <p className='text-gray-600 text-sm leading-relaxed'>
                {singleProduct.description}
              </p>

              {/* Stock */}
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium text-gray-700'>Stock:</span>
                <span className='text-sm text-gray-600'>{singleProduct.stock}</span>
              </div>

              {/* Quantity */}
              <div className='flex items-center gap-3'>
                <label className='text-sm font-medium text-gray-700'>Quantity:</label>
                <input
                  className='w-20 border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all text-sm'
                  type="number"
                  value={productQuantity}
                  min={1}
                  max={singleProduct.stock}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className='mt-2'>
                {user ? (
                  <button
                    onClick={() => addToCart(singleProduct)}
                    className='flex items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors'
                  >
                    <IoCartOutline className='w-5 h-5' />
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => openSignIn()}
                    className='px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors'
                  >
                    Login to Add
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <video muted autoPlay loop>
            <source src={Loading} type='video/webm' />
          </video>
        </div>
      )}
    </>
  )
}

export default SingleProduct