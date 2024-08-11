import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../app/store';

const Login = () => {
  const [move, setmove] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (isAuthenticated)
      navigate("/")
  }, [])



  const handleMove = () => {
    setmove(!move);
  };

  const handleNullInPut = () => {
    setError("please enter username or password!!")
    setLoading(false)
  }


  const handleLogin = async () => {
    setError("")
    setLoading(true)
    if (!username || !password)
      return handleNullInPut()
    try {
      let response = await loginApi(username, password)
      if (response && response.data) {
        // localStorage.setItem("token", response.data.token)
        dispatch(login(response.data))
        navigate("/")
      }
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }


  return (
    <div
      className="bg-gradient-to-r from-white to-blue-300
    flex items-center justify-center h-screen"
    >
      <div
        className=" bg-white rounded-lg shadow-slate-950 relative overflow-hidden w-[768px] max-w-full min-h-[600px]"
        id="container"
      >
        {/* Register */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out ${move
            ? "translate-x-full opacity-100 z-10"
            : "left-0 w-1/2 opacity-0 z-0"
            }`}
        >
          <form className="bg-white flex flex-col justify-center items-center px-10 h-full">
            <h1 className="text-3xl font-semibold">Create Account</h1>
            <div className="my-5">
              <a
                href="#"
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
              >
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="#"
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-center text-gray-500 text-sm">
              or use your email for registeration
            </span>
            <input
              className="bg-gray-400 placeholder-gray-700 outline-none my-2 py-3 px-4 text-sm rounded-lg w-full"
              type="text"
              placeholder="Name"
            />
            <input
              className="bg-gray-400 placeholder-gray-700 outline-none my-2 py-3 px-4 text-sm rounded-lg w-full"
              type="email"
              placeholder="Email"
            />
            <input
              className="bg-gray-400 placeholder-gray-700 outline-none my-2 py-3 px-4 text-sm rounded-lg w-full"
              type="password"
              placeholder="Password"
            />
            <Link to="/Most" >
              <button className="bg-indigo-500 text-white text-xs py-3 px-10 border border-transparent rounded-xl uppercase mt-3 cursor-pointer">
                Sign Up

              </button>
            </Link>
          </form>
        </div>
        {/* Login */}
        <div
          className={`absolute top-0 h-full transition-all duration-1000 ease-in-out left-0 w-1/2 ${move ? `translate-x-full z-[2]  ` : ` z-0`
            }`}
        >
          <div className="bg-white flex flex-col justify-center items-center px-10 h-full">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <div className="my-5">
              <a
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
                href="#"
              >
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
                href="#"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
                href="#"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                className="border py-2 border-gray-400 rounded-md inline-flex justify-center items-center mx-1 w-10"
                href="#"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-center text-gray-500 text-sm mb-3">
              or use your email password
            </span>
            <input
              className="bg-gray-400 placeholder-gray-700 outline-none my-2 py-3 px-4 text-sm rounded-lg w-full"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="bg-gray-400 placeholder-gray-700 outline-none my-2 py-3 px-4 text-sm rounded-lg w-full"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="flex justify-start w-full ml-5">
              <span className="text-red-500">{error}</span>
            </div>}

            <a href="#" className="my-2">
              Forget Your Password?
            </a>
            <button onClick={() => handleLogin()} className="bg-indigo-500 text-white text-xs py-3 px-10 border border-transparent rounded-xl uppercase mt-3 cursor-pointer">
              {loading ? <i class="fas fa-circle-notch fa-spin"></i> : "Sign In"}

            </button>
          </div>
        </div>
        {/* move_s */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-1000 ease-in-out z-50
           ${move ? `-translate-x-full rounded-e-[150px]` : `rounded-s-[150px]`
            }`}
        >
          <div
            className={`bg-purple-600 h-full bg-gradient-to-r from-purple-500 to-purple-700 text-white relative -left-full w-[200%] transition-all duration-500 ease-in-out ${move ? "translate-x-1/2" : "translate-x-0"
              }`}
          >
            {/* Login move */}
            <div
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-1000 ${move ? "translate-x-0" : "-translate-x-[200%]"
                }`}
            >
              <h1>Welcome Back!</h1>
              <p className="text-sm tracking-wide my-5">
                Enter your personal details to use all of site features
              </p>
              <button
                className="bg-transparent text-white text-xs py-3 px-10 border border-white rounded-xl uppercase mt-3 cursor-pointer"
                onClick={handleMove}
              >
                Sign In
              </button>
            </div>
            {/* Register move */}
            <div
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-1000 ease-in-out right-0 ${move ? "translate-x-[200%]" : "translate-x-0"
                }`}
            >
              <h1>Hello, Friend!</h1>
              <p className="text-sm tracking-wide my-5">
                Register with your personal details to use all of site features
              </p>
              <button
                className="bg-transparent text-white text-xs py-3 px-10 border border-white rounded-xl uppercase mt-3 cursor-pointer"
                onClick={handleMove}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
