import React from 'react'

const Banner = () => {
    return (
        <div className="md:container m-auto py-10" >
            <div className="flex justify-start h-[400px]">
                <img
                    src=".img/model_nike_2.jpg"
                    alt=""
                    className="w-1/2 h-full object-cover rounded-s-lg"
                />
                <div className="bg-slate-900 w-2/3 rounded-e-lg flex items-center">
                    <div className="pl-14 pr-24">
                        <h5 className="text-gray-400 uppercase">Limit offer</h5>
                        <p className="text-5xl text-white mb-10 mt-5">
                            35% off only this friday and get special gift
                        </p>
                        <button className="bg-white p-2 rounded-lg text-gray-500 hover:scale-x-110 transition duration-500">
                            Grab it now
                            <i className="fa-solid fa-arrow-right text-gray-500 ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Banner
