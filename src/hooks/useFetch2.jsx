import React, { useEffect, useState } from 'react'

const useFetch2 = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await url.axios;
                setData(Object.values(response.data ?? {}));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url.url]);
    return { data, loading, error };
}

export default useFetch2
