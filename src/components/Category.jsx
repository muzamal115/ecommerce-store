import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const Category = () => {
    // const{categoryOnlyData}=getData()
     const navigate=useNavigate()
        const{data}=getData()
        const getUniqueCategory=(data,property) =>{
          let newVal=data?.map((curElem)=>{
             return curElem[property]
          })
          newVal= [...new Set(newVal)]
          return newVal;
          }
            const categoryOnlyData=getUniqueCategory(data,'category')

          function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f53347",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
          color: "white",
        }}
        onClick={onClick}
      >
        ➡
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f53347",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
          color: "white",
        }}
        onClick={onClick}
      >
        ⬅
      </div>
    );
  }


          const settings = {
   
    infinite: true,

    speed: 500,
    pauseOnHover:false,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className='bg-[#101829] block'>
  <div className='max-w-7xl mx-auto py-7 px-4 '>
    <Slider {...settings} className='hidden md:block'>
      {categoryOnlyData.map((item, index) => (
        <div key={index} className="px-3 whitespace-nowrap ">
          <button onClick={()=>navigate(`/category/${item}`)} className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>
            {item}
          </button>
        </div>
      ))}
    </Slider>
  </div>
</div>

       
    
    
   
  )
}

export default Category
// max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4