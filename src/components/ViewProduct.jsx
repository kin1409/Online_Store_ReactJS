import React, { useEffect, useState } from 'react'
import { getProduct } from '../services/Service'
import useFetch from '../hooks/useFetch'


const ViewProduct = (props) => {
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${props.id}`);
    useEffect(() => {

        if (props.handleTotal) {
            props.handleTotal(parseFloat((data ? (data.price * props.quantity) : 0).toFixed(2)));
        }
    }, [data]);
    if (!data)
        return (
            <><p>loading...</p></>
        );
    if (loading)
        return (
            <>
            </>
        );

    return (


        <tr className=' text-center border-t border-b'>
            <td className='  px-2 py-2'><span>{data.id}</span></td>
            <td className=' w-24 h-24 p-2'>
                <img src={data.image} alt="" className='object-fill w-full h-full py-2' />
            </td>
            <td className='  px-2 py-2 max-w-32'><span className='line-clamp-2'>{data.title}</span></td>
            <td className='  px-2 py-2 gap-3 flex items-center h-20 justify-center'>
                <span>{props.quantity}</span>
            </td>
            <td className=''><span className='line-clamp-1  px-2 py-2'>${(data.price * props.quantity).toFixed(2)}</span></td>
        </tr>


    )
}

export default ViewProduct
