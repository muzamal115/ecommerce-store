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
          right: "-40px",
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
          left: "-40px",
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
  pauseOnHover: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 5 } },
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
  ]
};

return (
  <div className='bg-[#101829] hidden lg:block'>
    <div className='max-w-7xl mx-auto py-7 px-10'> {/* px-14 arrows ke liye space */}
      <Slider {...settings}>
        {categoryOnlyData.map((item, index) => (
          <div key={index} className="px-2">
            <button
              onClick={() => navigate(`/category/${item}`)}
              className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md cursor-pointer w-full text-sm text-center'
            >
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