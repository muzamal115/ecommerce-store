import React from 'react'
import { FaFilter } from 'react-icons/fa6'
import { getData } from '../context/DataContext'

const MobileFilter = ({openFilter,setOpenFilter,priceRange,setPriceRange,search,setSearch,category,brand,setBrand,handleBrandChange,handleCategoryChange,setCategory}) => {
    const{brandOnlyData,categoryOnlyData}=   getData()
  return (

    <>
    <div className='flex items-center justify-between px-4 p-2 mt-5 md:hidden '>
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter onClick={()=>setOpenFilter(!openFilter)} className='text-gray-800'/>
           
    </div>
    

     {
                openFilter?<div className="bg-gray-100 p-2 md:hidden">
                     <input type="text" placeholder='Search...' className='bg-white p-2 rounded-md border-gray-400 border-2 w-full' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <h1 className='mt-5 font-semibold text-xl'>Category</h1>
        <div className='flex flex-col gap-2 mt-3'>
            {
                categoryOnlyData.map((item,index)=>{
                    return <div key={index} className='flex gap-2'>
                         <input type="checkbox" checked={category==item} value={item} onChange={handleCategoryChange} />
                         <button className='cursor-pointer uppercase'>{item}</button>
                    </div>
                })
            }

        </div>
        {/* brand only data */}
        <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
        <select 
        name=""
         id="" 
         value={brand} 
         onChange={handleBrandChange}
         className='w-full p-2 bg-white border-gray-200 border-2 rounded-md'>
            {
      brandOnlyData?.map((item,index)=>{
        return <option key={index} value={item}>{item}</option>
      })
            }
        </select>
        {/* price range */}
        <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
        <div className='flex flex-col gap-2'>
            <label htmlFor="">Price Range : ${priceRange[0]} - ${priceRange[1]}</label>
            <input type="range" className='w-[200px]' min={0} max={5000} value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])} />

            <button
            onClick={()=>{setSearch('');setBrand('All'); setCategory('All'); setPriceRange[0,5000]; setOpenFilter(false) }}
             className='bg-red-500 text-white rounded-md px-3 py-3 mt-5 cursor-pointer '>Reset Filters</button>

        </div>

                </div>:null
            }

    </>
    
  )
}

export default MobileFilter