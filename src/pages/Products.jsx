import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from '../assets/notfound.json'


const Products = () => {
    const{data,fetchAllProducts}= getData()
    const[search,setSearch]=useState("")
    const[category,setCategory]=useState("All")
    const[brand,setBrand]=useState("All")
    const[priceRange,setPriceRange]=useState([0,5000])
    const[page,setPage]=useState(1)
     useEffect(() => {
       
        window.scrollTo(0,0);
      }, []);
      

    const handleCategoryChange=(e)=>{
      setCategory(e.target.value)
      setPage(1)
    }
    const handleBrandChange=(e)=>{
      setBrand(e.target.value)
      setPage(1)
    }

    const pageHandler =(selectedPage)=>{
      setPage(selectedPage)

    }

    const filteredData = data?.filter(item =>
  item.title.toLowerCase().includes(search.toLowerCase()) &&
  (category === "All" || item.category === category) &&
  (brand === "All" || item.brand === brand) &&
  item.price > priceRange[0] &&
  item.price <= priceRange[1]
);

const dynamicPage=Math.ceil(filteredData?.length/12)


  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10 '>
        {
          data?.length>0?(
           <>
  <div className='flex gap-8 items-start'>

    {/* LEFT SIDE: Filter */}
    <FilterSection 
      search={search} setSearch={setSearch}
      category={category} setCategory={setCategory}
      brand={brand} setBrand={setBrand}
      priceRange={priceRange} setPriceRange={setPriceRange}
      handleCategoryChange={handleCategoryChange}
      handleBrandChange={handleBrandChange}
    />

    {/* RIGHT SIDE: Grid + Pagination */}

    {
      filteredData?.length>0?(
         <div className='flex flex-col w-full'>

      <div className='grid grid-cols-4 gap-7 mt-10'>
        {filteredData
          ?.slice(page * 12 - 12, page * 12)
          ?.map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Pagination Centered */}
      <div className='flex justify-center mt-15'>
        <Pagination 
          page={page} 
          pageHandler={pageHandler} 
          dynamicPage={dynamicPage}
        />
      </div>

    </div>
      ):(
        <div className='flex justify-center items-center mt-10 md:h-[600px] md:w-[900px] border'>
     <Lottie animationData={notfound} classID='w-[500px]'/>
        </div>
      )
    }
   

  </div>
</>
           
          ):
          (
            <div className=' flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
      <source  src={Loading} type='video/webm'/>
            </video>
            </div>
          )
        }
      </div>


    </div>
  )
}

export default Products