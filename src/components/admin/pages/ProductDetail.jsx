import React, { useEffect, useState } from "react";
import { getData } from "../../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { log } from "firebase/firestore/pipelines";

const ProductDetail = () => {
  const[product,setProduct]=useState(null)
  const[image,setImage]=useState("")
  const[isDeleting,setIsDeleting]=useState(false)
  const{id}=useParams()
  const navigate=useNavigate()
       

  const{getSingleProduct,deleteProduct}=getData()

    const handleDelete=async()=>{
        const result = await Swal.fire({
    title: "Are you sure?",
    text: "This product will be deleted!",
    icon: "warning",
    showCancelButton: true,
  });
  
  if (result.isConfirmed) {
    setIsDeleting(true)
    await deleteProduct(id);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    setIsDeleting(false)
  navigate('/admin/products')
  
  
  }
  
        }

  useEffect(()=>{
    getSingleProduct(id).then((value)=>setProduct(value.data()))
    
  
  },[])

  useEffect(()=>{

     if(product){
        setImage(product.image)
     
      
    }

  },[product])

   

  

const price = product?.price || 0;
const discount = product?.discount || 0;

const originalPrice = Math.round(
  price + (price * discount) / 100
);


  return (
    <>
    {
      product? <div className="px-4 py-6 max-w-6xl mx-auto">

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Product Detail
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ✅ Image Section */}
        <div>
          <img
            src={image}
            alt={product.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl"
          />

          {/* Extra Images */}
          {product.images?.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {product.images.map((img, index) => (
                <img
                  onClick={()=>setImage(img)}
                  key={index}
                  src={img}
                  alt="product"
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer 
        ${image === img ? "border-red-500 ring-2 ring-red-400" : "border-gray-300"}
      `}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ Detail Section */}
        <div className="flex flex-col gap-4">

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {product.title}
          </h2>

          {/* Brand & Category */}
          <p className="text-gray-600">
            {product.brand?.toUpperCase()} /{" "}
            {product.category?.toUpperCase()}
          </p>

          {/* Price */}
          <div className="text-lg font-bold text-red-500">
            Rs. {product.price}
            {product.discount > 0 && (
              <>
                <span className="line-through text-gray-500 ml-2">
                  Rs. {originalPrice}
                </span>
                <span className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )}

          {/* Rating */}
          {product.rating > 0 && (
            <p className="text-yellow-500 font-medium">
              ⭐ {product.rating} / 5
            </p>
          )}

          {/* Stock */}
          <p className="text-gray-700">
            <span className="font-medium">Stock:</span> {product.stock}
          </p>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={()=>navigate(`/admin/products/edit/${id}`)}>
              Edit
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
             onClick={handleDelete}
            >
             {isDeleting?"Deleting...":"Delete"} 
            </button>
          </div>

        </div>
      </div>
    </div> :<div className="flex items-center justify-center  h-full text-2xl font-semibold">
      Loading...</div>
    }
   </> 
  );
};

export default ProductDetail;