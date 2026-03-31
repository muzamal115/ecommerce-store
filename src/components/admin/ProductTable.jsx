import React, { useEffect, useState } from "react";
import { Eye, Edit2, Trash2,Search } from "lucide-react";
import { getData } from "../../context/DataContext";
import AdminPagination from "./AdminPagination";
import AdminProductList from "./AdminProductLIst";




const ProductTable = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const[stockType,setStockType]=useState('All')
  const[page,setPage]=useState(1)
  


  const{data,fetchAllProducts,categoryOnlyData}=getData()
  
  

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
  
useEffect(()=>{
fetchAllProducts()
},[])

// Filter Data Logic

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

  
  // Pagination logic
  const itemsPerPage=6

  const dynamicPage=Math.ceil(filteredData?.length/itemsPerPage)
 const pageHandler =(selectedPage)=>{
      setPage(selectedPage)
      window.scrollTo(0,0)

    }
  


  return (
  
    <div className="bg-white shadow rounded-xl p-4 ">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:justify-between mb-4">
       <div className="relative w-full md:w-1/4">
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
       <div className="flex flex-col md:flex-row gap-2">
        <select
          className="p-2  border rounded-lg"
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
          className="p-2  border rounded-lg"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b bg-gray-100 border-gray-300">
              <th className="p-2 ">Image</th>
              <th className="p-2 ">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
              
            </tr>
          </thead>
          <tbody>
           
            {filteredData?.slice(page*itemsPerPage-itemsPerPage,page*itemsPerPage).map((p,i) => {
              const status=getStockStatus(p.stock)
              
              return(
                
                <AdminProductList p={p} key={i} status={status}/>       
             
            
              )
            }
          
            )

            }
          </tbody>
        </table>
      </div>

      <AdminPagination 
          page={page} 
          pageHandler={pageHandler} 
          dynamicPage={dynamicPage}
        />

        
    </div>
  );
};

export default ProductTable;
