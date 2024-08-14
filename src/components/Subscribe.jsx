import React from 'react'

const Subscribe = () => {
    return (
        <div className="md:container m-auto py-10" >
            <div className="flex flex-col justify-center items-center mx-80 gap-5">
                <h5 className="text-3xl font-semibold text-center">
                    Subscribe to our newsletter to get updates to our latest collections
                </h5>
                <span className="text-gray-500">
                    Get 20% off on your first order just by subscribing to our
                    newsletter
                </span>
                <div className="flex w-4/5 gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-7 outline-gray-400 bg-[url('./img/search.svg')] bg-no-repeat bg-[length:25px] bg-[5px_15px] py-2 w-full border-2 rounded-lg"
                    />
                    <button className="bg-slate-900 text-white py-3 px-5 rounded-lg border-2 border-slate-900 hover:border-red-500 transition duration-500">
                        Subscribe
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <span className="text-sm text-gray-400">
                        You will be able to unsubscribe at any time.
                    </span>
                    <span className="text-sm text-gray-400">
                        Read our Privacy
                        <a href="" className="underline text-slate-800 font-bold ml-1">
                            here
                        </a>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Subscribe
