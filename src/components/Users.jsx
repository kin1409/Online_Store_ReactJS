import React, { useEffect, useState } from 'react'
import useFetch2 from '../hooks/useFetch2'
import { DeleteUser, getAllUsers } from '../services/UserService'

const Users = () => {

    const { data, loading, error } = useFetch2(getAllUsers());
    const [data2, setData2] = useState([])
    const [dialog, setDialog] = useState(false)
    const [id, setID] = useState(null)
    const [loadingD, setLoadingD] = useState(null);
    const [errorD, setErrorD] = useState(null);
    const [dataD, setDataD] = useState(null);
    useEffect(() => {
        setData2(data);
    }, [data]);


    const handleChange = (value) => {
        setData2(data.filter(item => item.username.includes(value)))
    }
    const handleOnClick = (id) => {
        setDialog(!dialog)
        setID(id)
    }
    const handleTesst = () => {
        setTimeout(() => {
            setDataD(null)
            setDialog(false)
        }, 2000);

    }

    const handleDelete = async () => {
        setLoadingD(true)
        try {
            const dataD = await DeleteUser(id)
            setDataD(dataD.status)
        } catch (error) {
            setErrorD(error)
        } finally {
            setLoadingD(false)
        }
        setID(null)
        handleTesst()
    }
    return (
        <div>
            <div className='mb-10 flex justify-between'>
                <span className='text-4xl font-bold'>Users</span>
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
                    {data2.map((item) => {
                        return (
                            <tr className='border-t border-b' key={item.id}>
                                <td className='py-10 text-lg'>{item.id}</td>
                                <td className='py-10 text-lg line-clamp-2'>{item.username}</td>
                                <td className='py-10 text-lg'>{item.email}</td>
                                <td className='py-10 text-lg'>{item.name.firstname} {item.name.lastname}</td>
                                <td className='py-10 text-lg line-clamp-2'>{item.address.number}, {item.address.street}, {item.address.city}</td>
                                <td className='py-10 text-lg'>{item.phone}</td>
                                <td className=' py-10 flex gap-2 justify-center items-center'>
                                    <button >
                                        <i className="fa-solid fa-pencil p-2 text-blue-700"></i>
                                    </button>
                                    <button
                                        onClick={() => handleOnClick(item.id)}
                                    >
                                        <i className="fa-solid fa-trash p-2 text-red-500"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={`${dialog ? `visible` : `invisible`} fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center`}>

                {loadingD
                    ?
                    <>
                        <i class="fa-solid fa-circle-notch fa-spin text-7xl text-gray-300"></i>
                    </>
                    :
                    <>
                        {dataD === 200 ? <>
                            <i className={` fa-regular fa-circle-check text-7xl text-green-500`}></i>
                        </>
                            :
                            <>
                                <div className='bg-white flex flex-col h-1/5 w-1/5 gap-10 rounded-lg justify-center items-center'>
                                    <span className='text-4xl'>Are you sure?</span>
                                    <div className='flex gap-20 '>
                                        <button onClick={() => handleDelete()}
                                            className='border bg-blue-500 rounded-md  h-10'><span className='text-xl  px-3'>Yes</span></button>
                                        <button onClick={() => handleOnClick()}
                                            className='border bg-red-500 rounded-md h-10 '><span className='text-xl  px-3' >No</span></button>
                                    </div>
                                </div>
                            </>}


                    </>
                }
                <>

                </>

            </div>
        </div >
    )
}

export default Users
