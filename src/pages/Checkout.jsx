import React from 'react'
import Cart_Item from '../components/Cart'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import { setCart } from '../app/store'

const Checkout = () => {
    const { listItem, Total } = useSelector((state) => state.cart)

    console

    return (
        <div className='md:container m-auto mb-96 min-h-96 pt-44'>
            <h2 className='text-4xl font-medium mb-5'>Checkout</h2>
            <table className='min-w-full  border-spacing-y-10 h-full  '>
                <thead>
                    <tr>
                        <th className=''>Image</th>
                        <th className=''>Name</th>
                        <th className=''>Price</th>
                        <th className=''>Quantity</th>
                        <th className=''>Total</th>
                        <th className=''></th>
                    </tr>
                </thead>
                <tbody >
                    {listItem.map((item) => {
                        return <Cart_Item item={item} key={item.id} />
                    })}

                </tbody>
            </table>
            <div className='flex justify-end'>
                <span className='text-xl font-semibold flex'>Total: ${Total}</span>
            </div>
            <div className='flex justify-end my-4'>
                <button className='bg-blue-500 p-2  rounded-md hover:bg-blue-700 '>Payment</button>
            </div>
        </div>

    )
}

export default Checkout
