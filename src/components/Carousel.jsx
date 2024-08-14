import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./Custom_Carousel.css"
import { Link } from 'react-router-dom';


const ArrowL = ({ onClick }) => {
    return (
        <button className='absolute flex  bg-white px-5 z-[1] hover:bg-gray-200 py-4 rounded-e-md border border-gray-500 right-12 top-[5%]'
            onClick={onClick}>

            <i className="fa-solid fa-chevron-right"></i>
        </button>
    );
};
const ArrowR = ({ onClick }) => {
    return (
        <button className='absolute flex z-[1] hover:bg-gray-200 bg-white px-5 py-4 rounded-s-md border border-gray-500 right-24 top-[5%]  '
            onClick={onClick}>
            <i className="fa-solid fa-chevron-left "></i>
        </button>
    );
};



const Carousel = () => {
    const title = "Level up your style with our summer collections"
    const data = [
        "./img/1.jpg",
        "./img/adidas_real.jpg",
        "./img/6.jpg",
        "./img/8.jpg",
        "./img/3.jpg",
        "./img/9.jpg",
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ArrowL />,
        prevArrow: <ArrowR />,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        draggable: false
    };
    return (
        <div className="Custom_Carousel md:container m-auto relative ">
            {/* title */}
            <div className="absolute pt-44 z-[1] flex flex-col items-center w-full">
                <h1 className="px-10 leading-[1.25] text-8xl text-center text-white pb-10">
                    {title}
                </h1>
                <Link
                    to="/Online_Store_ReactJS/men"
                    className="top-32 z-10 bg-white rounded-md p-2 border-2 hover:border-red-500 transition duration-1000 ease-in-out"
                >
                    Shop now
                    <i className="fa-solid fa-chevron-down ml-2"></i>
                </Link>
            </div>

            <Slider {...settings}>
                {data.map((item, index) => (
                    <div className="relative w-full h-[750px] px-2" key={index}>

                        <img
                            src={item}
                            className="w-full h-full object-cover rounded-2xl"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl mx-2"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel
