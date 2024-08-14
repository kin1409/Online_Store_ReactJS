import React, { useEffect, useState } from 'react'
import useFetch2 from '../hooks/useFetch2';
import { DeleteCart, getAllCarts, getProduct } from '../services/Service';
import ViewProduct from './ViewProduct';

const Carts = () => {
    const { data, loading, error } = useFetch2(getAllCarts());
    const [dialogView, setDialogView] = useState(false)
    const [dialogDelete, setDialogDelete] = useState(false)
    const [itemProducts, setItemProducts] = useState(null)
    const [loadingD, setLoadingD] = useState(null);
    const [errorD, setErrorD] = useState(null);
    const [dataD, setDataD] = useState(null);
    const [Total, setTotal] = useState(0)
    const [id, setID] = useState()
    const [data2, setData2] = useState()
    useEffect(() => {
        setData2(data)
    }, [data])
    useEffect(() => {
        if (!dialogDelete) {
            if (dataD != null) {
                setTimeout(() => {
                    setDataD(null)
                }, 5000);
            }
            else
                setTimeout(() => {
                    setErrorD(null)
                }, 5000);
        }
    }, [dataD || errorD])

    const handleSearch = (value) => {
        setData2(data.filter(item => item.userId === parseInt(value)))
    }

    const handleDate = (itemdate) => {
        const date = new Date(itemdate);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    }

    const handleDelete = async () => {
        setLoadingD(true)
        try {
            const dataD = await DeleteCart(id)
            setDataD(dataD.status)
        } catch (error) {
            setErrorD(error)
        } finally {
            setLoadingD(false)
        }
        setID(null)
        setDialogDelete(false)
    }

    const handleTotal = (item) => {
        setTotal(prevTotal => prevTotal + item);
    };

    const handleView = (item) => {
        if (item !== itemProducts) {
            setTotal(0)
        }
        setDialogView(true)
        setItemProducts(item)
    }
    const handleOnDelete = (id) => {
        setDialogDelete(true)
        setID(id)
    }
    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleCloseView = () => {
        setDialogView(false)
    }
    return (
        <div className='relative'>
            {/* dialog */}
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${dataD !== null ? `translate-x-0` : `translate-x-60`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i className={`fa-regular fa-circle-check text-lg text-green-500`}></i>
                    <span className='text-lg font-semibold'>Đã xóa thành công!</span>
                </div>
            </div>
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${errorD !== null ? `translate-x-0` : `translate-x-60`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i class="fa-regular fa-circle-xmark text-lg text-red-500"></i>
                    <span className='text-lg font-semibold'>Xóa không thành công!</span>
                </div>
            </div>


            <div className='mb-10 flex justify-between'>
                <span className='text-4xl font-bold'>Carts</span>

                {/* Search */}

                <div className='relative'>
                    <i className="fa-solid fa-magnifying-glass absolute left-2 bottom-1/4 red text-gray-400"></i>
                    <input
                        className="pl-8 p-1 md:h-10 md:w-60 rounded-md border-2 bg-gray-100 border-gray-200 focus:border-gray-400 focus:outline-none"
                        type="text"
                        placeholder="Search by UserId..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            <table className='min-w-full  border-spacing-y-10 h-full'>
                <thead>
                    <tr>
                        <th className='text-lg'>ID</th>
                        <th className='text-lg'>UserId</th>
                        <th className='text-lg'>Date</th>
                        <th className='text-lg'>Products</th>
                        <th className='text-lg'></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {loading ?
                        <>
                            <div className="absolute w-full flex justify-center items-center mt-52">
                                <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-9xl"></i>
                            </div>
                        </>
                        :
                        <>

                            {data2.map((item) => {
                                return (
                                    <tr className='border-t border-b' key={item.id}>
                                        <td className='py-10 text-lg'>{item.id}</td>
                                        <td className='py-10 text-lg line-clamp-2'>{item.userId}</td>
                                        <td className='py-10 text-lg'>{handleDate(item.date)}</td>
                                        <td className='py-10 text-lg'>{item.products.length}</td>
                                        <td className=' py-10 flex gap-2 justify-center items-center'>
                                            <button onClick={() => handleView(item.products)}>
                                                <i class="fa-solid fa-eye text-blue-700"></i>
                                            </button>
                                            <button
                                                onClick={() => handleOnDelete(item.id)}
                                            >
                                                <i className="fa-solid fa-trash p-2 text-red-500"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>}
                </tbody>
            </table>

            <div className={` ${dialogView ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500  ease-in-out fixed bg-black inset-0 bg-opacity-50 z-50 flex justify-center items-center`}>
                <div className={` ${dialogView ? ` opacity-100 visible scale-100` : ` scale-0 opacity-0 invisible`} transition-all duration-1000 ease-in-out bg-white rounded-3xl w-1/2  flex flex-col relative `}>
                    <i onClick={() => handleCloseView()}
                        className="fa-solid fa-xmark absolute z-50 cursor-pointer top-2 right-7 text-2xl"></i>
                    <div className='pt-12 px-10'>
                        <table className=' w-full' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Object.values(itemProducts ?? {}).map((item) => {
                                    return <ViewProduct key={item.id} quantity={item.quantity} id={item.productId} handleTotal={handleTotal} />
                                })}
                                <tr className='text-center border-t'>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td className='font-bold py-5' >${Total}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={`  ${dialogDelete ? 'opacity-100 visible' : ' opacity-0 invisible'} transition-all duration-500 ease-in-out fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center`}>
                {loadingD
                    ?
                    <>
                        <i class="fa-solid fa-circle-notch fa-spin text-7xl text-gray-300"></i>
                    </>
                    :
                    <>
                        <div className={` ${dialogDelete ? 'opacity-100 visible' : ' opacity-0 invisible'} transition-all duration-500 ease-in-out bg-white flex flex-col h-1/5 w-1/5 gap-10 rounded-lg justify-center items-center`}>
                            <span className='text-4xl'>Are you sure?</span>
                            <div className='flex gap-20 '>
                                <button onClick={() => handleDelete()}
                                    className='border bg-blue-500 rounded-md  h-10'><span className='text-xl  px-3'>Yes</span></button>
                                <button onClick={() => handleCloseDelete()}
                                    className='border bg-red-500 rounded-md h-10 '><span className='text-xl  px-3' >No</span></button>
                            </div>
                        </div>
                    </>
                }
                <>
                </>
            </div>

        </div>
    )
}

export default Carts
