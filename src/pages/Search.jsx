import React from 'react'
import "./Custom-checkbox.css"
import Category from "../components/Category.jsx"
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner.jsx';
import Subscribe from '../components/Subscribe.jsx';
import List_Products from '../components/List_Products.jsx';
import useFetch from '../hooks/useFetch.jsx';

const Search = () => {


    const location = useLocation();
    const { data: dataCategory, loading: loadingC, error: errorC } = useFetch('https://fakestoreapi.com/products/categories');
    const { data: dataProduct, loading: loadingP, error: errorP } = useFetch('https://fakestoreapi.com/products');

    if (errorC) return <p>Error: {errorC.message}</p>;
    if (errorP) return <p>Error: {errorP.message}</p>;

    const keyword = new URLSearchParams(location.search);
    const query = keyword.get('keyword'); // Lấy giá trị của tham số 'keyword'

    const searchItem = Object.values(dataProduct ?? {}).filter(item => item.title.includes(query))

    return (
        <div className="md:container m-auto pt-44">
            <h2 className='text-xl pl-5 pb-5 cursor-default'>Home {'>'} Search</h2>
            <div className='mb-5 flex gap-10 justify-start'>
                <div className='w-1/4'>
                    <Category data={dataCategory} />
                </div>
                <div className='w-full'>
                    <List_Products searchItem={searchItem} keyword={query} loading={loadingP} />
                </div>
            </div>
            <Banner />
            <Subscribe />
        </div >
    );
};


export default Search
