import React, { useState } from 'react'

const category = ({ data }) => {

    const submenuArray = Object.values(data ?? {}).map(item => item.title);
    const dataCategory = [
        {
            name: "category",
            submenu: Object.entries(data ?? {}).map(([key, value]) => ({
                name: value,
                sub_check: ["123"] // Hoặc các giá trị khác bạn muốn
            }))
        },
        {
            name: "Brands",
            sub_check: [
                "nike",
                "nike",
                "nike",
                "nike",
                "nike",
                "nike",
                "nike",
                "nike",
                "nike",
            ]
        },
        {
            name: "Price",
            sub_check: [
                "100-300",
                "300-500",
                "500-1tr"
            ]
        },
        {
            name: "Size",
            sub_check: [
                "S",
                "M",
                "L"
            ]
        }
    ]
    const [menuStates, setMenuStates] = useState({});

    const toggleMenu = (menuPath) => {
        setMenuStates((prevState) => ({
            ...prevState,
            [menuPath]: !prevState[menuPath]
        }));

    };

    const renderSubMenu = (menuPath, subMenus) => {
        return (
            <div className="pl-8 w-full">
                {subMenus.map((subMenu, index) => {
                    const subMenuPath = `${menuPath}.${index}`;
                    return (
                        <div key={subMenuPath}>
                            <div
                                className="p-2 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleMenu(subMenuPath)}
                            >
                                <span className='text-lg'> {subMenu.name}</span>
                                <i className={`fa-solid fa-chevron-right ml-2 ${menuStates[subMenuPath] ? 'rotate-90' : ''} transition-all duration-300 ease-in-out`}></i>

                            </div>
                            {menuStates[subMenuPath] && subMenu.sub_check && (
                                renderSubCheck(subMenuPath, subMenu.sub_check)
                            )}
                            {menuStates[subMenuPath] && subMenu.submenu && (
                                renderSubMenu(subMenuPath, subMenu)
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderSubCheck = (subMenuPath, subMenu) => {
        return (
            <div className="pl-10 w-full mb-5  space-y-2">
                {subMenu.map((item, index) => {
                    const ssubMenuPath = `${subMenuPath}.${index}`;
                    return (
                        <div key={ssubMenuPath} className='flex w-[80%] justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                                <input type="checkbox" id={`custom-checkbox-${ssubMenuPath}`} />
                                <span>{item}</span>
                            </div>
                            <span className=' p-1 rounded-xl max-w-4 max-h-4 flex justify-center items-center text-center bg-gray-400 ml-5 text-[12px] font-medium'>36</span>
                        </div>

                    )
                })}
            </div>
        )
    }

    return (
        <div className='block border-2 border-gray-200 shadow-md rounded-md mt-2'>
            {dataCategory.map((menu, index) => (
                <div className='flex flex-col justify-center items-center'
                    key={index}>
                    <div
                        className=" p-4 pl-6 w-full cursor-pointer mt-2 flex justify-between items-center"
                        onClick={() => toggleMenu(index.toString())}
                    >
                        <span className='text-xl'>{menu.name}</span>
                        {(menu.submenu || menu.sub_check) && (
                            <i className={`fa-solid fa-chevron-right ml-2 ${menuStates[index] ? 'rotate-90' : ''} transition-all duration-300 ease-in-out`}></i>
                        )}
                    </div>
                    {menuStates[index] && menu.submenu && (
                        renderSubMenu(index.toString(), menu.submenu)
                    )}
                    {menuStates[index] && menu.sub_check && (
                        renderSubCheck(index.toString(), menu.sub_check)
                    )}
                    <div className='h-[0.5px] w-[90%] bg-gray-300'></div>
                </div>
            ))}
        </div>
    )
}

export default category
