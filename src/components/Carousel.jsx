import React, {  useEffect } from 'react';
import {  getData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Carousel = () => {
  const { fetchAllProducts, data } = getData();
          

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

  // console.log(data);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0,0);
  }, []);

  const settings = {
   
    infinite: true,
    autoplay:true,
    autoplaySpeed:2000,
    speed: 500,
    pauseOnHover:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(101, 108)?.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#060c29] via-[#302b63] to-[#24243e] z-0"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center  md:justify-around h-[600px] items-center px-4  my-20 md:my-0">
              <div className="md:space-y-6 space-y-3 ">
                <h3 className="text-red-500 font-semibold font-sans text-sm">
                  Powering Your World with the best in Shopping
                </h3>

                <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                  {item.title}
                </h1>

                <p className="line-clamp-3 md:w-[500px] text-gray-400 pr-7">
                  {item.description}
                </p>

                <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
                  Shop Now
                </button>
              </div>

              <div>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="rounded-full   lg:w-[550px] h-auto object-cover  hover:scale-105 transition-all shadow-2xl shadow-red-400 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
