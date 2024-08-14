import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCart } from '../app/store';
const Card_Product = ({ item }) => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const quantity = 1


    const handleAddCart = () => {
        if (isAuthenticated) {
            dispatch(setCart({ id: item.id, title: item.title, image: item.image, price: item.price, quantity: quantity }))
        }
        else {
            navigate("/Online_Store_ReactJS/login")
        }

    }

    return (
        // item
        <div className=" flex flex-col justify-center  w-full pt-2 cursor-pointer "
        >
            <div className='transition-all duration-700 ease-in-out hover:-translate-y-2'>
                <Link to={`/Online_Store_ReactJS/detail/${item.id}`}
                >
                    <div className="h-[450px] flex justify-center border border-gray-300 rounded-lg">
                        <img
                            src={item.image}
                            alt=""
                            className="object-fill h-full p-2 rounded-2xl"
                        />
                    </div>
                </Link>
                <div className="flex justify-between mt-3 px-2 py-1 gap-2">
                    <Link to={`/Online_Store_ReactJS/detail/${item.id}`}>
                        <div>
                            <h3 className="text-base line-clamp-1">{item.title}</h3>
                            <span className="text-2xl font-bold">${item.price}</span>
                            <span className="relative -top-2 text-lg line-through text-gray-400 hidden">
                                -
                            </span>
                        </div>
                    </Link>
                    <div className='items-center flex justify-center'>
                        <button onClick={() => handleAddCart()}
                            className=" bg-black px-3 py-2 rounded-lg hover:scale-x-110 transition duration-500">
                            <i className="fa-solid fa-cart-arrow-down fa-flip-horizontal text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card_Product
