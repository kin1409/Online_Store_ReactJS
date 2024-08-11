import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteItemCart, setCart } from '../app/store'

const Cart_Item = ({ item }) => {
    const dispatch = useDispatch()

    const handleMinusQuantity = () => {
        dispatch(setCart({ ...item, quantity: -1 }))
    }
    const handlePlusQuantity = () => {

        dispatch(setCart({ ...item, quantity: +1 }))
    }

    const handleDeleteItem = () => {
        dispatch(deleteItemCart(item.id))
    }
    return (
        <tr className=' text-center border-t border-b'>
            <td className=' w-24 h-24 p-2'>
                <img src={item.image} alt="" className='object-fill w-full h-full py-2' />
            </td>
            <td className='  px-2 py-2'><span className='line-clamp-2'>{item.title}</span></td>
            <td className='  px-2 py-2'><span>${item.price}</span></td>
            <td className='  px-2 py-2 gap-3 flex items-center h-20 justify-center'>
                <button onClick={() => handleMinusQuantity()} disabled={item.quantity === 1}
                    className={`${item.quantity === 1 ? `cursor-not-allowed bg-gray-100` : ``} border-gray-300 border  rounded-md flex justify-center items-center`}>
                    <i className="fa-solid fa-minus px-2 py-2"></i>
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handlePlusQuantity()}
                    className='border-gray-300 border rounded-md flex justify-center items-center'>
                    <i className="fa-solid fa-plus px-2 py-2"></i>
                </button>
            </td>
            <td className=''><span className='line-clamp-1  px-2 py-2'>${(item.price * item.quantity).toFixed(2)}</span></td>
            <td className='px-2 py-2 h-full flex items-center justify-center'>
                <button onClick={() => handleDeleteItem()}
                    className='border-gray-300 rounded-md flex justify-center items-center'>
                    <i className="fa-solid fa-trash text-red-500"></i>
                </button>
            </td>
        </tr>

    )
}

export default Cart_Item
