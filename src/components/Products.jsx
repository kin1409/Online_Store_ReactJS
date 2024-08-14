import React, { useEffect, useState } from 'react'
import { addProduct, DeleteProduct, getAllProducts } from '../services/Service';
import useFetch2 from '../hooks/useFetch2';

const Products = () => {
    const { data, loading, error } = useFetch2(getAllProducts());
    const [dialogUpdate, setDialogUpdate] = useState(false)
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogAdd, setDialogAdd] = useState(false)
    const [loadingD, setLoadingD] = useState(null);
    const [errorD, setErrorD] = useState(null);
    const [dataD, setDataD] = useState(null);
    const [loadingA, setLoadingA] = useState(null);
    const [errorA, setErrorA] = useState(null);
    const [dataA, setDataA] = useState(null);
    const [loadingU, setLoadingU] = useState(null);
    const [errorU, setErrorU] = useState(null);
    const [dataU, setDataU] = useState(null);
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [category, setCategory] = useState()
    const [id, setID] = useState()
    const [item, setItem] = useState()
    const [nullInput, setNullInput] = useState()
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
        if (!dialogAdd) {
            if (dataA != null) {
                setTimeout(() => {
                    setDataA(null)
                }, 5000);
            }
            else
                setTimeout(() => {
                    setErrorA(null)
                }, 5000);
        }
        if (!dialogUpdate) {
            if (dataU != null) {
                setTimeout(() => {
                    setDataU(null)
                }, 5000);
            }
            else
                setTimeout(() => {
                    setErrorU(null)
                }, 5000);
        }
    }, [dataD || errorD || dataA || errorA || dataU || errorU])


    const handleDelete = async () => {
        setLoadingD(true)
        try {
            const dataD = await DeleteProduct(id)
            setDataD(dataD.status)
        } catch (error) {
            setErrorD(error)
        } finally {
            setLoadingD(false)
        }
        setID(null)
        setDialogDelete(false)
    }
    const handleOnDelete = (id) => {
        setDialogDelete(true)
        setID(id)
    }

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }
    const handleNull = () => {
        setNullInput(true)
    }
    const handleAddProduct = async () => {
        if (!title || !price || !description || !image || !category)
            return handleNull()
        setLoadingA(true)
        const item = {
            title: title,
            price: price,
            description: description,
            image: image,
            category: category,
        }
        try {
            const dataA = await addProduct(item)
            setDataA(dataA.status)
        } catch (error) {
            setErrorA(error)
        } finally {
            setLoadingA(false)
        }
        setDialogAdd(false)
        setTitle("")
        setImage("")
        setDescription("")
        setPrice("")
        setCategory("")
    }

    const handleUpdateProduct = async () => {
        if (!title || !price || !description || !image || !category)
            return handleNull()
        setLoadingU(true)
        const item = {
            id: id,
            title: title,
            price: price,
            description: description,
            image: image,
            category: category,
        }
        try {
            const dataU = await addProduct(item)
            setDataU(dataU.status)
        } catch (error) {
            setErrorU(error)
        } finally {
            setLoadingU(false)
        }
        setDialogUpdate(false)
        setTitle("")
        setImage("")
        setDescription("")
        setPrice("")
        setCategory("")
    }

    const handleUpdate = (item) => {
        setDialogUpdate(true)
        setTitle(item.title)
        setImage(item.image)
        setDescription(item.description)
        setPrice(item.price)
        setCategory(item.category)
        setItem(item)
    }
    const handleCloseUpdate = () => {
        setDialogUpdate(false)
    }
    const handleAdd = () => {
        setDialogAdd(true)
        setTitle("")
        setImage("")
        setDescription("")
        setPrice("")
        setCategory("")
    }
    const handleCloseAdd = () => {
        setDialogAdd(false)
        setTitle("")
        setImage("")
        setDescription("")
        setPrice("")
        setCategory("")
    }
    const handleTitle = (value) => {
        setTitle(value)
    }
    const handleImage = (value) => {
        setImage(value)
    }
    const handlePrice = (value) => {
        setPrice(value)
    }
    const handleDescription = (value) => {
        setDescription(value)
    }
    const handleCategory = (value) => {
        setCategory(value)
    }

    return (
        <div className='relative'>
            {/* dialog delete */}
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${dataD !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i className={`fa-regular fa-circle-check text-lg text-green-500`}></i>
                    <span className='text-lg font-semibold'>Đã xóa thành công!</span>
                </div>
            </div>
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${errorD !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i class="fa-regular fa-circle-xmark text-lg text-red-500"></i>
                    <span className='text-lg font-semibold'>Xóa không thành công!</span>
                </div>
            </div>
            {/* dialog update */}
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${dataU !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i className={`fa-regular fa-circle-check text-lg text-green-500`}></i>
                    <span className='text-lg font-semibold'>Đã cập nhật thành công!</span>
                </div>
            </div>
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${errorU !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i class="fa-regular fa-circle-xmark text-lg text-red-500"></i>
                    <span className='text-lg font-semibold'>Cập nhật không thành công!</span>
                </div>
            </div>
            {/* dialog add */}
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${dataA !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i className={`fa-regular fa-circle-check text-lg text-green-500`}></i>
                    <span className='text-lg font-semibold'>Đã thêm thành công!</span>
                </div>
            </div>
            <div className={`fixed z-50  bg-gray-300 transition-transform duration-1000 ease-in-out right-0 top-50   ${errorA !== null ? `translate-x-0` : `translate-x-full`} `}>
                <div className='flex items-center gap-2 p-2'>
                    <i class="fa-regular fa-circle-xmark text-lg text-red-500"></i>
                    <span className='text-lg font-semibold'>Thêm không thành công!</span>
                </div>
            </div>

            <div className='mb-10 flex justify-between'>
                <span className='text-4xl font-bold'>Products</span>

                {/* Search */}

                <div className='flex items-center gap-5'>
                    <div className='relative'>
                        <i className="fa-solid fa-magnifying-glass absolute left-2 bottom-1/4 red text-gray-400"></i>
                        <input
                            className="pl-8 p-1 md:h-10 md:w-60 rounded-md border-2 bg-gray-100 border-gray-200 focus:border-gray-400 focus:outline-none"
                            type="text"
                            placeholder="Search by ID..."
                        />
                    </div>
                    <div
                        onClick={() => handleAdd()}
                        className='border rounded-md cursor-pointer'>
                        <i className="fa-solid fa-plus py-2 px-3 text-green-500 text-xl bg-gray-200"></i>
                    </div>
                </div>
            </div>
            <table className='min-w-full  border-spacing-y-10 h-full'>
                <thead>
                    <tr>
                        <th className='text-lg'>ID</th>
                        <th className='text-lg'>Image</th>
                        <th className='text-lg'>Title</th>
                        <th className='text-lg'>price</th>
                        <th className='text-lg'>category</th>
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
                            {data.map((item) => {
                                return (
                                    <tr className='border-t border-b' key={item.id}>
                                        <td className='py-10 text-lg'>{item.id}</td>
                                        <td className=' w-24 h-24 p-2'>
                                            <img src={item.image} alt="" className='object-fill w-full h-full py-2' />
                                        </td>
                                        <td className='py-10 px-10 text-lg  max-w-52 '><span className='line-clamp-2'>{item.title}</span></td>
                                        <td className='py-10 text-lg'><span>{item.price}</span></td>
                                        <td className='py-10 text-lg'><span>{item.category}</span></td>
                                        <td className=' py-10 flex gap-2 justify-center items-center h-full'>
                                            <button onClick={() => handleUpdate(item)}>
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

            <div className={`  ${dialogUpdate ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500 fixed ease-in-out  bg-black inset-0 bg-opacity-50 z-50 flex justify-center items-center`}>
                <div className='bg-white rounded-3xl w-1/3  flex flex-col relative justify-center items-center'>
                    <i onClick={() => handleCloseUpdate()}
                        className="fa-solid fa-xmark absolute z-50 cursor-pointer top-2 right-7 text-2xl"></i>
                    <div className='gap-10 flex flex-col py-10 pt-16 w-10/12'>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='relative '>
                                <div tabIndex="0" className='rounded-xl p-2  border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>
                                    <img src={image} className='w-28 h-28' alt="" />
                                </div>
                                <span className='rounded-xl absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Image
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <textarea
                                    value={title}
                                    onChange={(e) => handleTitle(e.target.value)}
                                    className='rounded-xl text-center cursor-text p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>
                                    <span></span>
                                </textarea>

                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Title
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='relative w-full'>
                                <input type="number"
                                    value={price}
                                    onChange={(e) => handlePrice(e.target.value)}
                                    className='rounded-xl p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Price
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <input type="text"
                                    value={category}
                                    onChange={(e) => handleCategory(e.target.value)}
                                    className=' rounded-xl p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Category
                                </span>
                            </div>
                        </div>
                        <div className='relative w-full'>
                            <textarea
                                value={description}
                                onChange={(e) => handleDescription(e.target.value)}
                                rows={10}
                                className='rounded-xl cursor-text p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>
                            </textarea>
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Description
                            </span>
                        </div>
                    </div>
                    <span className={`${nullInput ? `visible` : `invisible`} text-red-500`}>Không được để trống!!!</span>

                    <div className='bg-green-500 rounded-xl'>
                        <button
                            onClick={() => handleUpdateProduct()}
                            className='p-2 text-xl'>
                            {loadingU && <i class="fas fa-circle-notch fa-spin"></i>}
                            Submit</button>
                    </div>
                </div>
            </div>

            <div className={`  ${dialogAdd ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500 fixed ease-in-out  bg-black inset-0 bg-opacity-50 z-50 flex justify-center items-center`}>
                <div className='bg-white rounded-3xl w-1/3  h-full flex flex-col relative justify-center items-center'>
                    <i onClick={() => handleCloseAdd()}
                        className="fa-solid fa-xmark absolute z-50 cursor-pointer top-2 right-7 text-2xl"></i>
                    <div className='gap-5 flex flex-col py-5 pt-16 w-10/12'>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='relative '>
                                <div tabIndex="0" className='rounded-xl p-2  border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>
                                    <img src={image} className='w-28 h-28' alt="" />
                                </div>
                                <span className='rounded-xl absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Image
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <input
                                    value={image}
                                    onChange={(e) => handleImage(e.target.value)}
                                    className='rounded-xl text-center cursor-text p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />


                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Link
                                </span>
                            </div>
                        </div>
                        <div className='relative w-full'>
                            <textarea
                                value={title}
                                onChange={(e) => handleTitle(e.target.value)}
                                className='rounded-xl text-center cursor-text p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>

                            </textarea>

                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Title
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='relative w-full'>
                                <input type="number"
                                    value={price}
                                    onChange={(e) => handlePrice(e.target.value)}
                                    className='rounded-xl p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Price
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <input type="text"
                                    value={category}
                                    onChange={(e) => handleCategory(e.target.value)}
                                    className=' rounded-xl p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Category
                                </span>
                            </div>
                        </div>
                        <div className='relative w-full'>
                            <textarea
                                value={description}
                                onChange={(e) => handleDescription(e.target.value)}
                                rows={10}
                                className='rounded-xl cursor-text p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600'>
                            </textarea>
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Description
                            </span>
                        </div>
                    </div>

                    <span className={`${nullInput ? `visible` : `invisible`} text-red-500`}>Không được để trống!!!</span>

                    <div className='bg-green-500 rounded-xl mb-10'>
                        <button
                            onClick={() => handleAddProduct()}
                            className='p-2 text-xl'>
                            {loadingA && <i class="fas fa-circle-notch fa-spin"></i>}
                            Submit</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Products
