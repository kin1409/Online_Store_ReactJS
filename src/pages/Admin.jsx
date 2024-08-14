import React, { useEffect, useState } from 'react'

import { Link, Outlet, useLocation, } from 'react-router-dom'

const Admin = () => {
    const MENU = [
        {
            title: "Products",
            icon: "fa-solid fa-users"
        },
        {
            title: "Users",
            icon: "fa-solid fa-users"
        },
        {
            title: "Carts",
            icon: "fa-solid fa-users"
        },

    ]
    const [isSelected, setIsSelected] = useState("Products")
    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(segment => segment);
        const currentMenu = pathSegments[pathSegments.length - 1];
        const selectedItem = MENU.find(item => item.title.toLowerCase() === currentMenu);
        if (selectedItem) {
            setIsSelected(selectedItem.title);
        }
    }, [location.pathname]);

    const handleSelected = (name) => {
        setIsSelected(name)
    }
    return (
        <div className='flex min-h-96 h-screen'>
            <div className='bg-gray-200 fixed h-screen w-1/6 pt-40 pl-5 pr-7 flex flex-col gap-3'>
                {MENU.map((item, index) => {
                    return (
                        <div onClick={() => handleSelected(item.title)}
                            key={index}
                            className={`w-full ${isSelected === item.title ? `bg-white shadow-md shadow-black` : `bg-gray-200`} rounded-xl cursor-pointer`}>
                            <Link to={`/Online_Store_ReactJS/admin/${item.title.toLowerCase()}`}
                                className='p-2 flex gap-5 items-center'>
                                <i className={`${item.icon}`}></i>
                                <span className='text-xl'>{item.title}</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className='pt-32  w-full ml-96 mr-16'>
                <Outlet />
            </div>
        </div >
    )
}

export default Admin
