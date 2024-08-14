import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className='h-screen flex flex-col justify-center items-center space-y-4' >
            <h2 className='text-4xl'>Oops! Something went wrong.</h2>
            <p className='text-lg'>{error?.statusText || error?.message || "Page not found"}</p>
            <Link to="/Online_Store_ReactJS/" className='rounded-md py-2 px-2 text-blue-700 underline hover:text-blue-800'>Go back to Home</Link>
        </div>
    );
};

export default ErrorPage;
