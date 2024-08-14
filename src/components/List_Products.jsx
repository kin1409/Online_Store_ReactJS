import React, { useEffect, useMemo, useRef, useState } from 'react'
import Card_Product from './Card_Product';

const List_Products = ({ searchItem, keyword, loading }) => {

    const Item_In_Page = 9
    const totalPages = Math.ceil(searchItem.length / Item_In_Page);


    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setVisible] = useState(false);
    const [Sortby, setSortby] = useState("None");
    useEffect(() => { setCurrentPage(1) }, [keyword])


    const ItemsInPage = (() => {
        const start = (currentPage - 1) * Item_In_Page
        const end = currentPage * Item_In_Page
        return searchItem.slice(start, end)
    })();



    const handlePageClick = (page) => {
        setCurrentPage(page);
        scrollToTop()
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        scrollToTop()
    };

    const handleNextClick = () => {
        scrollToTop();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }

    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...', totalPages);
            } else if (currentPage > totalPages - 4) {
                pageNumbers.push(1, '...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1, '...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...', totalPages);
            }
        }
        return pageNumbers;
    }

    const handleVisible = () => setVisible(!isVisible)

    const SortbyName = [
        'Popularity',
        'Size',
        'Price',
        'A-Z',
    ]

    const handleSortClick = (value) => {
        setSortby(value)
        setVisible(!isVisible)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };;


    return (
        <>
            <div className='flex justify-between m-4'>
                <h2>showing {ItemsInPage.length} result from total {searchItem.length} for "{keyword}"</h2>
                <div className='flex gap-2 justify-center items-center'>
                    <span>Sort by</span>
                    <div className='relative'>
                        <button type="button" class="inline-flex justify-between w-24 border-gray-300 border rounded-md p-1 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            onClick={handleVisible}>
                            <span>{Sortby}</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <ul className={`border border-gray-300 text-center absolute w-full z-[1] bg-white  
                                ${isVisible
                                ? `visible opacity-100 transition-all duration-300 ease-in-out `
                                : `invisible opacity-0  transition-all duration-300 ease-in-out`
                            }`}>
                            <li onClick={() => handleSortClick(SortbyName[0])} className='hover:border-gray-200 hover:bg-gray-300 cursor-pointer p-1'>Popularity</li>
                            <li onClick={() => handleSortClick(SortbyName[1])} className='hover:border-gray-200 hover:bg-gray-300 cursor-pointer p-1'>Price</li>
                            <li onClick={() => handleSortClick(SortbyName[2])} className='hover:border-gray-200 hover:bg-gray-300 cursor-pointer p-1'>Size</li>
                            <li onClick={() => handleSortClick(SortbyName[3])} className='hover:border-gray-200 hover:bg-gray-300 cursor-pointer p-1'>A-Z</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mx-4 flex gap-2 flex-wrap items-center invisible'>
                <h2 className='inline'>Applied Filters:</h2>
                <span className='border border-gray-400 rounded-full px-4 py-1 inline-block' >
                    Tops
                    <button className='ml-3'><i class="fa-solid fa-xmark"></i></button>
                </span>
                <span className='border border-gray-400 rounded-full px-4 py-1 inline-block' >
                    $20-$100
                    <button className='ml-3'><i class="fa-solid fa-xmark"></i></button>
                </span>
                <span className='border border-gray-400 rounded-full px-4 py-1 inline-block' >
                    Medium
                    <button className='ml-3'><i class="fa-solid fa-xmark"></i></button>
                </span>

            </div>
            <div className='h-[1800px]'>
                {!loading
                    ?
                    <div className='flex flex-wrap justify-start'>
                        {ItemsInPage.map((item) => (
                            // item
                            <div className='max-w-[500px] w-[365px] m-3'>
                                <Card_Product item={item} />
                            </div>
                        ))}

                    </div>
                    :
                    <div className="flex justify-center items-center h-screen pb-52">
                        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-9xl"></i>
                    </div>
                }

            </div>
            <div className='w-full flex gap-2 justify-center'>
                <button className={`border border-gray-300 rounded-md px-3 py-2 ${currentPage === 1
                    ? ` text-gray-400`
                    : ``
                    }`}
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        className={`px-3 py-2 ${page === currentPage ? 'bg-gray-200' : ''} rounded`}
                        onClick={() => typeof page === 'number' && handlePageClick(page)}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
                <button className={`border border-gray-300 rounded-md px-3 py-2 ${currentPage === totalPages
                    ? ` text-gray-400 cursor-not-allowed`
                    : ``
                    }`}
                    onClick={() => handleNextClick()}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    )
}

export default List_Products
