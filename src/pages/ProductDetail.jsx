import React, { useEffect, useState } from 'react'
import Carousel_Card from '../components/Carousel_Card'
import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../app/store';

const ProductDetail = () => {
    const { id } = useParams()
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isChange, setIsChange] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate()
    const [nums, setNums] = useState(1);
    const dispatch = useDispatch()
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
    useEffect(() => { }, [id])

    const RATING = 4.5
    const SIZE = ['S', 'M', 'L', 'XL', 'XXL']
    const COLOR = [
        {
            name: "green",
            bg: "bg-green-500",
            border: "border-green-500"
        },
        {
            name: "gray",
            bg: "bg-gray-500",
            border: "border-gray-500"
        },
        {
            name: "blue",
            bg: "bg-blue-500",
            border: "border-blue-500"
        },
        {
            name: "yellow",
            bg: "bg-yellow-500",
            border: "border-yellow-500"
        },
        {
            name: "red",
            bg: "bg-red-500",
            border: "border-red-500"
        },
    ]
    const IMG = [
        data ? data.image : null,
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
    ]

    const starRating = () => {
        const rating = Math.round(RATING * 2) / 2;
        return (
            Array.from({ length: 5 }, (_, index) => {
                const value = index + 1
                if (value <= rating)
                    return <i key={value} className="fa-solid fa-star text-yellow-500 text-lg"></i>
                else if (value === Math.ceil(rating))
                    return <i key={value} className="fa-solid fa-star-half-stroke text-yellow-500 text-lg"></i>
                else return <i key={value} className="fa-regular fa-star text-yellow-500 text-lg"></i>
            })
        )
    }

    const handleCheck = (size) => {
        setSelectedSize(size === selectedSize ? null : size);
    };

    const handleCheckColor = (color) => {
        setSelectedColor(color === selectedColor ? null : color);
        console.log(color)

    };
    const handlePlus = () => {
        setNums(nums + 1)
    }

    const handleMinus = () => {
        if (nums > 1)
            setNums(nums - 1)
    }

    const handleAddCart = () => {
        if (!isAuthenticated)
            navigate("/Online_Store_ReactJS/login")
        else {
            dispatch(setCart({ id: data.id, title: data.title, image: data.image, price: data.price, quantity: nums }))
        }
    }

    const handleSelectImage = (index) => {
        setIsChange(true)
        setTimeout(() => {
            setSelectedImage(index)
            setIsChange(false)
        }, 200);
    }
    const handlePrevImage = () => {
        if (selectedImage === 0)
            setSelectedImage(IMG.length - 1)
        else
            setSelectedImage(selectedImage - 1)
    }
    const handleNextImage = () => {
        if (selectedImage === IMG.length - 1) {
            setIsChange(true)
            setTimeout(() => {
                setSelectedImage(0)
                setIsChange(false)
            }, 200);
        }
        else {
            setIsChange(true)
            setTimeout(() => {
                setSelectedImage(selectedImage + 1)
                setIsChange(false)
            }, 200);
        }

    }
    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen pb-52">
                    <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-9xl"></i>
                </div>
            </>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div className='md:container m-auto mb-5 pt-32'>
            <div className='flex justify-between'>
                {/* image */}
                <div className='w-1/2 space-y-5  h-full flex flex-col '>
                    <div className='h-[600px] w-11/12 relative'>
                        <button onClick={() => handlePrevImage()}
                            className='absolute z-[1] bottom-1/2 left-5 bg-gray-200 rounded-md'>
                            <i class="fa-solid fa-chevron-left py-2 px-3"></i>
                        </button>
                        <img className={`rounded-xl object-fill h-full w-full translate-x-1 transition-all duration-500 ease-in-out
                                ${isChange ? `opacity-0` : `opacity-100`}`} src={IMG[selectedImage]} alt="" />
                        <button onClick={() => handleNextImage()}
                            className='absolute bottom-1/2 right-5 bg-white rounded-md'>
                            <i class="fa-solid fa-chevron-right py-2 px-3"></i>
                        </button>
                    </div>
                    <div className='flex justify-start gap-5 w-11/12'>
                        {IMG.map((item, index) => {
                            return <img
                                onClick={() => handleSelectImage(index)}
                                key={index}
                                className={`${index === selectedImage ? `border-gray-600 border-2` : ``} cursor-pointer rounded-xl lg:h-[150px] md:h-[100px] h-[50px] lg:w-[23%] md:w-[21%] w-[20%] object-fill`} src={item} alt="" />
                        })}

                    </div>
                </div>
                <div className='w-1/2  flex flex-col  space-y-5 h-full'>
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-4xl font-bold'>{data.title}</h1>
                        <div className='flex gap-2 items-center'>
                            {starRating()}
                            <span>({RATING})</span>
                        </div>
                        <span className='text-4xl font-bold'>{`$${data.price}`}</span>
                    </div>
                    <div className='flex gap-1 border-t border-b py-5' >
                        <div className='w-1/2 space-y-1'>
                            <span className='text-xl font-medium'>Available Size</span>
                            <div className='space-y-2'>
                                {SIZE.map((item, index) => (
                                    <label className="inline-block cursor-pointer mr-4" key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedSize === item}
                                            onChange={() => handleCheck(item)}
                                            className="sr-only" // Hide default checkbox
                                        />
                                        <div
                                            className={`w-12 h-12 flex items-center justify-center border-2 rounded-md transition-all duration-300 
                                                  ${selectedSize === item ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-300'
                                                }`}
                                        >
                                            {item}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='w-1/2 space-y-5'>
                            <span className='text-xl font-medium'>Available Color</span>
                            <div className='flex gap-1'>
                                {COLOR.map((item, index) => (
                                    <label className="flex items-center cursor-pointer mr-4" key={index}>
                                        <input
                                            type="radio"
                                            checked={item.name === selectedColor}
                                            // onChange={() => handleCheckColor(item)}
                                            readOnly
                                            className="sr-only" // Ẩn radio button mặc định
                                        />

                                        <div
                                            onClick={() => handleCheckColor(item.name)}
                                            className={`w-8 h-8 flex items-center justify-center border-2 rounded-full transition-all duration-300 ${selectedColor === item.name ? item.border : 'border-white'}`}
                                        >
                                            <div
                                                className={`w-4 h-4 ${item.bg} rounded-full`}
                                            ></div>

                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-5'>
                            <span className='text-xl pl-2 '>Make it yours!</span>
                        </div>
                        <div className='flex gap-5'>
                            <div className=' border border-gray-400 rounded-lg inline-block'>

                                <button onClick={() => handleMinus()} className='h-full py-2 px-4 hover:bg-gray-300 rounded-s-lg font-semibold text-2xl '>-</button>
                                <span className='h-full py-2 px-4 font-semibold text-2xl'>{nums}</span>
                                <button onClick={() => handlePlus()} className='h-full  py-2 px-4 hover:bg-gray-300 rounded-e-lg font-semibold  text-2xl '>+</button>

                            </div>
                            <button onClick={() => handleAddCart()}
                                className='py-3 px-2 hover:bg-gray-600 bg-gray-800 rounded-lg font-thin  text-2xl  text-white'>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-5 '>
                <div className='flex justify-around mt-36 items-center h-12'>
                    <div className='border-b-2 border-gray-800 text-gray-800 font-semibold w-full text-center pb-5 text-2xl'><span className='cursor-pointer'>The Details</span></div>
                    <div className='border-b-2 border-gray-200  text-gray-400 w-full text-center pb-5 text-2xl'><span className='cursor-pointer' >Ratings & Reviews</span></div>
                    <div className='border-b-2 border-gray-200 text-gray-400  w-full text-center pb-5 text-2xl'><span className='cursor-pointer'>Discussion</span></div>
                </div>
                <div className='space-y-5 '>
                    <span className='text-3xl font-bold'>Details</span>
                    <p className='text-2xl leading-10 px-5'>{data.description}</p>
                </div>
            </div>

            <Carousel_Card />
        </div>


    )
}

export default ProductDetail
