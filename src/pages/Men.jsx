import React from 'react'
import useFetch from '../hooks/useFetch';

const Men = () => {
    const id = 12
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }
    return (
        <div>
            Men {data.id}
        </div>
    )
}

export default Men
