import React, { useState } from 'react'
import Slider from 'react-slick'
import Card_Product from './Card_Product';
import "./Custom_Carousel_Card.css"
import useFetch from '../hooks/useFetch';

const ArrowL = ({ onClick, disabled }) => {
    return (
        <button className={`Arrow absolute flex bg-white px-5 z-[1] hover:bg-gray-200 py-4 rounded-e-md border border-gray-500 right-[5px] -top-[12.5%] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}>

            <i className="fa-solid fa-chevron-right"></i>
        </button>
    );
};
const ArrowR = ({ onClick, disabled }) => {
    return (
        <button className={`Arrow absolute flex z-[1] hover:bg-gray-200 bg-white px-5 py-4 rounded-s-md border border-gray-500 right-14 -top-[12.5%] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}>
            <i className="fa-solid fa-chevron-left "></i>
        </button>
    );
};


const Carousel_Card = () => {
    const { data, loading, error } = useFetch('https://fakestoreapi.com/products?limit=5');
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen pb-52">
                    <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-9xl"></i>
                </div>
            </>
        );
    }
    if (error) return <p>Error: {error.message}</p>;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <ArrowL disabled={isNextDisabled} />,
        prevArrow: <ArrowR disabled={isPrevDisabled} />,
        cssEase: "ease-in-out",
        draggable: false,
        beforeChange: (next) => {
            setIsPrevDisabled(next === 0);
            setIsNextDisabled(next >= (data.length - 3));
        },
        afterChange: current => {
            setIsPrevDisabled(current === 0);
            setIsNextDisabled(current >= (data.length - 3));
        },
    };
    return (
        // fetured product
        <div className="Custom_Carousel_Card md:container m-auto py-10 ">
            <h2 className="text-4xl font-medium mb-5 ">Fetured products</h2>
            <Slider {...settings}>
                {data.map((item) => (
                    // item
                    <div className='w-full px-3' key={item.id}>
                        <Card_Product item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Carousel_Card
