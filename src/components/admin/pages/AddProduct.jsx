import React, { useEffect, useState } from "react";
import { getData } from "../../../context/DataContext";
import { log } from "firebase/firestore/pipelines";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const AddProduct = ({isEdit}) => {
        const{id}=useParams()
        const navigate=useNavigate()
        
          const{categoryOnlyData,fetchAllProducts,addNewProduct,isAdding,data,updateProduct,setIsAdding}=getData()

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image:'',
    rating: "",
    discount: "",
    stock: "",
    tags: "",
    
  });
  const[newImage,setNewImage]=useState(null)

  useEffect(()=>{
    if(isEdit&&id&&data.length>0){
      const product=data.find((p)=>id==p.id)
      if(product){
        setFormData({
          title: product.title || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "",
          brand: product.brand || "",
          image: product.image || null,
          rating: product.rating || "",
          discount: product.discount || "",
          stock: product.stock || "",
          tags: product.tags ?product.tags.join(','): "",
        })
      }

    }
  },[id,isEdit,data])

 


 

  useEffect(()=>{
    fetchAllProducts()
  },[])
  

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange=(e)=>{
  
    let file = e.target.files[0]
    if(!file) return
   setNewImage(file)
  }

  // Submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let imageUrl=formData.image;
   
      try {
         setIsAdding(true)

        if(newImage){
     const formDataImg = new FormData();
    formDataImg.append("file", newImage);
    formDataImg.append("upload_preset", "product_images"); 
          const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlylndzbx/image/upload",
        formDataImg
       ) 
       imageUrl= res.data.secure_url 
        }

            
       const updatedData={
        ...formData,
        image:imageUrl,
        tags:formData.tags?formData.tags.split(',').map((tag)=>tag.trim()):[]

       } 

   

      if(isEdit){
       await updateProduct(updatedData,id)
      }
      else{
    await addNewProduct(updatedData)
  }
   navigate("/admin/products");
        
      } catch (error) {
         setIsAdding(false)
         toast.error("Failed to upload")
          console.log(error)
         

      }
    
    
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">{isEdit? 'Edit Product':'Add New Product'}</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          {/* Category + Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categoryOnlyData.slice(1).map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Brand</label>
               <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full p-2 border rounded-lg"
              required
            />
             
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Select image"
              required={!isEdit}
            />
            {
              (newImage||formData.image)&&(
                <div>

                <h3 className="text-lg font-semibold">Preview:</h3>
                <img src={newImage?URL.createObjectURL(newImage):formData.image|| null} alt="image preview"
                width='200' />
                </div>
              )
            }
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Rating + Discount (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Rating (Optional)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="0 - 5"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Discount % (Optional)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="smart, new, trending"
            />
          </div>

          {/* Button */}
          {
            isEdit? <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition
                    ${isAdding ? 'opacity-50 cursor-not-allowed hover:bg-black' : 'hover:bg-gray-800'}`}
            disabled={isAdding}
          >
            {isAdding?'Updaing...':'Update Product'}
          </button>: <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition
                    ${isAdding ? 'opacity-50 cursor-not-allowed hover:bg-black' : 'hover:bg-gray-800'}`}
            disabled={isAdding}
          >
            {isAdding?'Adding Product...':'Add Product'}
          </button>

          }
          


        </form>
      </div>
    </div>
  );
};

export default AddProduct;