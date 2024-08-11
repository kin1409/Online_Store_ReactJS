import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart_Item from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/store";
const Header = () => {

  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { listItem, Total, length } = useSelector((state) => state.cart)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleToogle = () => {
    setIsVisible(!isVisible)
  }
  const handleToogleTrue = () => {
    setIsVisible(true)
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?keyword=${encodeURIComponent(inputValue)}`);
      console.log(encodeURIComponent(inputValue))
      event.target.value = ""
    }
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <header>
      <div className={`fixed w-full z-20 transition-all duration-500 ease-in-out ${isScrolled ? `bg-gray-200` : `bg-white`} `}>
        {/* <!-- Sign up now --> */}
        {!isAuthenticated && <div className={` bg-black ${isVisible ? 'none' : 'opacity-0 transition-opacity duration-1000 hidden'}`}>
          <div className="bg-black md:container m-auto">
            <div className="text-center flex justify-center bg-black text-white relative text-xs">
              <span className="pb-1 pt-1">
                Sign up and GET 20% OFF for your first order.
                <Link to="/login" className="underline">
                  {" "}
                  Sign up now.
                </Link>
              </span>
              <button className="absolute right-2 pt-1"
                onClick={handleToogle}>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        </div>}


        {/* <!-- nav --> */}
        <nav className={`md:container m-auto flex justify-between transition-all duration-500 ease-in-out ${isScrolled ? `bg-gray-200` : `bg-white`}`}>
          {/* <!-- logo --> */}
          <div className="h-24 w-24">
            <Link to="/" onClick={handleToogleTrue} ><img src="../img/logo.png" alt="" /></Link>

          </div>
          {/* <!-- list --> */}
          <ul className="flex gap-8 items-center">
            <li className="cursor-pointer group relative hover:text-red-400 transition duration-1000 ease-in-out">
              Shop <i className="fa-solid fa-chevron-down"></i>
              <ul className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-75 group-hover:scale-100 z-50 group-hover:z-50 bg-white border-2 border-gray-200 w-28 text-black">
                <li className="p-2 hover:text-red-400 transition duration-500 ease-in-out">
                  <Link to="/men">Men</Link>
                </li>
                <li className="p-2 hover:text-red-400 transition duration-500 ease-in-out">
                  Women
                </li>
                <li className="p-2 hover:text-red-400 transition duration-500 ease-in-out">
                  Unisex
                </li>
              </ul>
            </li>
            <li className="hover:text-red-400 transition duration-500 ease-in">
              <Link to="/Most">Most wanted</Link>
            </li>
            <li className="hover:text-red-400 transition duration-500 ease-in">
              <a href="">New arrival</a>
            </li>
            <li className="hover:text-red-400 transition duration-500 ease-in">
              <a href="">Brands</a>
            </li>
          </ul>

          <div className="flex items-center gap-8">
            {/* <!-- search --> */}
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-2 bottom-1/4 red text-gray-400"></i>
              <input
                className="pl-8 p-1 md:h-10 md:w-60 rounded-md border-2 bg-gray-100 border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                placeholder="Search..."
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => { handleInputChange(e) }}
              />
            </div>
            {/* cart */}
            <div className="w-10 group relative h-full flex items-center justify-center">
              <div className={`${length === 0 ? `invisible opacity-0 scale-75` : `visible opacity-100 scale-100`} absolute z-[2] select-none rounded-full w-5 h-5 bg-red-500 flex justify-center items-center top-6 right-0 transition-all duration-300 ease-in-out`}>
                <span className="animate-spin-slow absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className=" text-xs" >{length <= 9 ? length : "+9"}</span>
              </div>
              <i className="fa-solid fa-cart-arrow-down fa-flip-horizontal relative"></i>
              <div className="max-h-96 rounded-md absolute p-2 space-y-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 origin-top-right z-10 group-hover:z-50 bg-white border-2 border-gray-200 w-[600px] text-black top-20 -right-10">
                <div className="relative z-20">
                  <ul className="max-h-80 overflow-y-auto space-y-5">
                    {
                      isAuthenticated ?
                        <>
                          {
                            listItem.length === 0 ?
                              <>
                                <div className="h-72 flex flex-col justify-center items-center">
                                  <img className="w-[130px] h-[130px]" src="../img/box.png" alt="" />
                                  <span>Chưa có sản phẩm nào</span>
                                </div>
                              </>
                              :
                              <>
                                <li className="text-3xl">Your Cart</li>
                                <li>
                                  <table className="w-full h-full">
                                    <tbody>
                                      {listItem.map((item) => {
                                        return <Cart_Item item={item} key={item.id} />
                                      })}
                                    </tbody>
                                  </table>
                                </li>
                                <li className="flex justify-between mt-2">
                                  <span className='text-xl font-semibold flex'>Total: ${Total}</span>
                                  <Link to="/checkout" className='bg-blue-500 p-2 ml-2 rounded-md hover:bg-blue-700'>Checkout</Link>
                                </li>
                              </>
                          }
                        </>
                        :
                        <>
                          <div className="h-72 flex flex-col justify-center items-center">
                            <img className="w-[130px] h-[130px]" src="../img/box.png" alt="" />
                            <span>Chưa có sản phẩm nào</span>
                          </div>
                        </>
                    }
                  </ul>
                </div>
                <div className="absolute z-10 -top-5 right-10 bg-white w-10 h-10 rotate-45"></div>
              </div>



            </div>
            <div className="group relative">
              <i className="fa-regular fa-user"></i>
              <ul className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-75 group-hover:scale-100 z-50 group-hover:z-50 bg-white border-2 border-gray-200 w-28 text-black">
                <li className="p-2 hover:text-red-400 transition duration-500 ease-in">
                  {isAuthenticated ?
                    <>
                      <Link to="/admin">Admin</Link>
                    </>
                    :
                    <>
                      <Link to="/login">Login</Link>
                    </>
                  }
                </li>
                <li className="cursor-pointer p-2 hover:text-red-400  transition duration-500 ease-in">
                  Setting
                </li>
                <li className="cursor-pointer p-2 hover:text-red-400 transition duration-500 ease-in"
                  onClick={() => handleLogout()}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div >
    </header >
  );
};

export default Header;
