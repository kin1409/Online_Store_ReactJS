import React, { useEffect, useState } from 'react'
import useFetch2 from '../hooks/useFetch2'
import { DeleteUser, getAllUsers } from '../services/Service'

const Users = () => {

    const { data, loading, error } = useFetch2(getAllUsers());
    const [data2, setData2] = useState([])
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogVIew, setdialogVIew] = useState(false)
    const [id, setID] = useState(null)
    const [item, setItem] = useState(null)
    const [loadingD, setLoadingD] = useState(null);
    const [errorD, setErrorD] = useState(null);
    const [dataD, setDataD] = useState(null);

    useEffect(() => {
        setData2(data);
    }, [data]);
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


    const handleChange = (value) => {
        setData2(data.filter(item => item.username.includes(value)))
    }
    const handleOnClick = (id) => {
        setDialogDelete(!dialogDelete)
        setID(id)
    }
    const handleOnClickView = (item) => {
        setdialogVIew(true)
        setItem(item)
    }
    const handleCloseViewDialog = () => {
        setdialogVIew(false)
    }


    const handleDelete = async () => {
        setLoadingD(true)
        try {
            const dataD = await DeleteUser(id)
            setDataD(dataD.status)
            setData2(data.filter(item => item.id !== id))
        } catch (error) {
            setErrorD(error)
        } finally {
            setLoadingD(false)
        }
        setID(null)
        setDialogDelete(false)
    }
    return (
        <div className=' relative'>
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
                <span className='text-4xl font-bold'>Users</span>

                {/* Search */}

                <div className='relative'>
                    <i className="fa-solid fa-magnifying-glass absolute left-2 bottom-1/4 red text-gray-400"></i>
                    <input
                        className="pl-8 p-1 md:h-10 md:w-60 rounded-md border-2 bg-gray-100 border-gray-200 focus:border-gray-400 focus:outline-none"
                        type="text"
                        placeholder="Search by ID..."
                        onChange={(e) => handleChange(e.target.value)} />
                </div>
            </div>
            <table className='min-w-full  border-spacing-y-10 h-full'>
                <thead>
                    <tr>
                        <th className='text-lg'>ID</th>
                        <th className='text-lg'>UserName</th>
                        <th className='text-lg'>Email</th>
                        <th className='text-lg'>Name</th>
                        <th className='text-lg'>Address</th>
                        <th className='text-lg'>Phone</th>
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
                            {
                                data2.map((item) => {
                                    return (
                                        <tr className='border-t border-b' key={item.id}>
                                            <td className='py-10 text-lg'>{item.id}</td>
                                            <td className='py-10 text-lg line-clamp-2'>{item.username}</td>
                                            <td className='py-10 text-lg'>{item.email}</td>
                                            <td className='py-10 text-lg'>{item.name.firstname} {item.name.lastname}</td>
                                            <td className='py-10 text-lg line-clamp-2'>{item.address.number}, {item.address.street}, {item.address.city}</td>
                                            <td className='py-10 text-lg'>{item.phone}</td>
                                            <td className=' py-10 flex gap-2 justify-center items-center'>
                                                <button onClick={() => handleOnClickView(item)}>
                                                    <i class="fa-solid fa-eye text-blue-700"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleOnClick(item.id)}
                                                >
                                                    <i className="fa-solid fa-trash p-2 text-red-500"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </>}
                </tbody>
            </table>

            {/* Delete Dialog */}
            <div className={`  ${dialogDelete ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500  ease-in-out fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center`}>
                {loadingD
                    ?
                    <>
                        <i class="fa-solid fa-circle-notch fa-spin text-7xl text-gray-300"></i>
                    </>
                    :
                    <>
                        <div className={`${dialogDelete ? ` opacity-100 visible scale-100` : `  opacity-0 invisible scale-0`} transition-all duration-500  ease-in-out bg-white flex flex-col h-1/5 w-1/5 gap-10 rounded-lg justify-center items-center`}>
                            <span className='text-4xl'>Are you sure?</span>
                            <div className='flex gap-20 '>
                                <button onClick={() => handleDelete()}
                                    className='border bg-blue-500 rounded-md  h-10'><span className='text-xl  px-3'>Yes</span></button>
                                <button onClick={() => handleOnClick()}
                                    className='border bg-red-500 rounded-md h-10 '><span className='text-xl  px-3' >No</span></button>
                            </div>
                        </div>
                    </>
                }
                <>
                </>
            </div>


            {/* Edit Dialog */}

            <div className={`${dialogVIew ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500  ease-in-out fixed bg-black inset-0 bg-opacity-50 z-50 flex justify-center items-center`}>
                <div className={`${dialogVIew ? ` opacity-100 visible` : `  opacity-0 invisible`} transition-all duration-500  ease-in-out bg-white rounded-3xl w-1/3  flex flex-col relative justify-center items-center`}>
                    <i onClick={() => handleCloseViewDialog()}
                        className="fa-solid fa-xmark absolute z-50 cursor-pointer top-2 right-7 text-2xl"></i>
                    <div className='gap-10 flex flex-col py-10 pt-16'>
                        <div className='relative w-full'>
                            <input type="text"
                                value={item ? item.name.firstname + " " + item.name.lastname : ""}
                                readOnly={true}
                                className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />

                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Name
                            </span>
                        </div>
                        <div className='relative w-full'>
                            <input type="text"
                                value={item ? item.email : ""}
                                readOnly={true}
                                className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Email
                            </span>
                        </div>
                        <div className='relative w-full'>
                            <input type="text"
                                value={item ? item.address.city : ""}
                                readOnly={true}
                                className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                City
                            </span>
                        </div>
                        <div className='relative w-full'>
                            <input type="text"
                                value={item ? item.address.street : ""}
                                readOnly={true}
                                className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Street
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <div className='relative w-1/2'>
                                <input type="text"
                                    value={item ? item.address.number : ""}
                                    readOnly={true}
                                    className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Number
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <input type="text"
                                    value={item ? item.address.zipcode : ""}
                                    readOnly={true}
                                    className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                                <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                    Zipcode
                                </span>
                            </div>
                        </div>
                        <div className='relative w-full'>
                            <input type="text"
                                value={item ? item.phone : ""}
                                readOnly={true}
                                className='p-2 w-full border-gray-500 border peer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600' />
                            <span className='absolute left-2 -top-4 bg-white  px-2 peer-focus:text-green-600 transition-all duration-300 ease-in-out peer-focus:font-medium'>
                                Phone
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Users
