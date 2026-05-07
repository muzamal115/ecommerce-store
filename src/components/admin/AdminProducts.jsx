import React, { useEffect, useState } from 'react'
import Table from './Table'
import { Package, CheckCircle, XCircle, AlertTriangle, Trash } from "lucide-react";
import { getData } from '../../context/DataContext';
import AddProduct from './pages/AddProduct';
import { useNavigate } from 'react-router-dom';
import AdminProductList from './AdminProductList';
import AdminPagination from "./AdminPagination";
import { Eye, Edit2, Trash2,Search } from "lucide-react";
import LoadingSpinner from './LoadingSpinner';
const AdminProducts = () => {
  const{fetchAllProducts,data,calculateStockStats,categoryOnlyData,deleteProduct}=getData()
  const[showAddProductPage,setShowAddProductPage]=useState(false)
   const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const[stockType,setStockType]=useState('All')
  const[page,setPage]=useState(1)
    const [deletingid,setDeletingId]=useState(null)
  const navigate=useNavigate()


    const handleDelete=async(id)=>{

     setDeletingId(id)
     await deleteProduct(id);
     setDeletingId(null)
 

      }


   const handleCategoryChange=(e)=>{
     setCategory(e.target.value)
    }
    const handleStatusChange=(e)=>{
     setStockType(e.target.value)
    }
  
    const handleSearchChange=(e)=>{
    setSearch(e.target.value)
    
    window.scroll(0,0)
    }
  
    useEffect(() => {
    setPage(1);
  }, [search, category, stockType]);
       
  const getStockStatus = (stock) => {
    if (stock === 0)
      return { type: "out", text: "Out of Stock", bg: "bg-red-100", textColor: "text-red-600" };
    if (stock <= 5)
      return { type: "low", text: "Low Stock",bg: "bg-yellow-100", textColor: "text-yellow-600" };
    return { type: "in", text: "In Stock",  bg: "bg-green-100", textColor: "text-green-600" };
  };

   useEffect(() => {
    fetchAllProducts()
    
    
  }, [data])

  const filteredData = data?.filter((p) => {
  const status = getStockStatus(Number(p.stock));

  
  const matchesSearch = p.title
    ?.toLowerCase()
    .includes(search.toLowerCase());

  
  const matchesCategory =
    category === "All" || p.category === category;

 
  const matchesStock =
    stockType === "All" || status.type === stockType;

  return matchesSearch && matchesCategory && matchesStock;
});


 
const stockStats= calculateStockStats(data)


 // Pagination logic
  const itemsPerPage=6

  const dynamicPage=Math.ceil(filteredData?.length/itemsPerPage)
 const pageHandler =(selectedPage)=>{
      setPage(selectedPage)
      window.scrollTo(0,0)

    }


  

  const stats = [
  {
    title: "Total Products",
    value: stockStats.total,
    icon: Package,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Active",
    value: stockStats.inStock,
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Out of Stock",
    value: stockStats.outOfStock,
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
  {
    title: "Low Stock",
    value: stockStats.lowStock,
    icon: AlertTriangle,
    color: "text-yellow-600 bg-yellow-100",
  },
];

if(!data||data.length==0){
  return(
    
       <LoadingSpinner/>
    
    
  )
}
else{
 return (

    
   <>
  
  
    <div className=" p-4 md:p-6  bg-gray-200 overflow-x-hidden max-w-full ">
      <div className=' flex justify-between items-center  mb-4'>
        <div  className='flex flex-col'>
      <h1 className="text-2xl font-semibold ">Products </h1>
      <p>Manage all your products</p>
      </div>
       <button onClick={()=>navigate('/admin/products/add')} className="bg-gradient-to-b from-black to-gray-900 hover:from-gray-800 hover:to-black active:scale-95 text-white px-4 h-10 rounded-lg text-sm cursor-pointer transition-all duration-300 hover:shadow-lg">
  + Add New Product
</button>
      </div>

      {/* Stats */}
     <div className="grid  grid-cols-2 md:grid-cols-4  gap-4 mb-6">
     
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 flex items-center justify-between"
          >
            {/* Left Content */}
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold mt-1">{item.value}</h2>
            </div>

            {/* Icon */}
            <div className={`p-2 rounded-lg ${item.color}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>

      {/* Table */}
      <div  className="p-4 bg-white shadow rounded-xl  md:p-4  ">

        <div className=" p-5 md:p-0 rounded-xl flex flex-col md:flex-row gap-3 md:justify-between mb-4 ">
       <div className="relative  md:w-1/4">
         <Search
           size={20}
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
         />
       
         <input
           type="text"
           value={search}
           onChange={handleSearchChange}
           placeholder="Search for products..."
          className="w-full pl-10 pr-3 p-2 border rounded-xl bg-gray-50 focus:bg-white transition"
         />
       </div>
       <div className="flex  flex-row gap-2 ">
        <select
          className="p-2  border rounded-lg overflow-y-auto w-[50%]"
          value={category}
          onChange={handleCategoryChange}
        >
            {
            categoryOnlyData?.map((item,index)=>{
              return <option value={item} key={index}>{item}</option>
            })
          }
        </select>

         <select
          className="p-2  border rounded-lg w-[50%]"
          value={stockType}
         onChange={handleStatusChange}
        >
          <option value="All" >Status</option>
          <option value='in'>In Stock </option>
          <option  value='low'>Low Stock</option>
          <option  value='out'>Out of Stock</option>
        </select>
        </div>
      </div>
  
   {/* Mobile Responsive */}
     <div className="md:hidden flex flex-col gap-3 p-3">
  {
    filteredData?.slice(page*itemsPerPage-itemsPerPage, page*itemsPerPage).map((p, i) => {
      const status = getStockStatus(p.stock)
      return (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">

          {/* Image + Info */}
          <div className="flex items-center gap-3">
            <img
              src={p.image}
              alt="product"
              className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.category}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">Rs. {p.price}</p>
            </div>
          </div>

          {/* Stock + Status */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Stock: {p.stock}</p>
            <p className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.textColor}`}>
              {status.text}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3">
            <button
              onClick={() => navigate(`/admin/products/edit/${p.id}`)}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => navigate(`/admin/products/${p.id}`)}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="p-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition"
            >
              {deletingid == p.id ? 'Deleting...' : <Trash2 size={16} />}
            </button>
          </div>

        </div>
      )
    })
  }
</div>
{/* End mobile responsiv */}
      <Table
        columns={["Image", "Name", "Category", "Price", "Stock", "Status", "Actions"]}
      >
          {filteredData?.slice(page*itemsPerPage-itemsPerPage,page*itemsPerPage).map((p,i) => {
              const status=getStockStatus(p.stock)
              
              return(
                
                <AdminProductList p={p} key={i} status={status}/> 
                              
              )
            }
          
            )

            }
            

      </Table>

      <AdminPagination 
          page={page} 
          pageHandler={pageHandler} 
          dynamicPage={dynamicPage}
        />
        

      </div>
    </div>
     </>
  );
}

  
}

export default AdminProducts