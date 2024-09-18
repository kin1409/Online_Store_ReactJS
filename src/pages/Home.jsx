import React from "react";
import Carousel from "../components/Carousel";
import Carousel_Card from "../components/Carousel_Card";
import Banner from "../components/Banner";
import Subscribe from "../components/Subscribe";
import useFetch from "../hooks/useFetch";

const image_brands = [
  "./img/nike.png",
  "./img/gucci.png",
  "./img/lv.png",
  "./img/puma.png",
  "./img/chanel.png",
  "./img/levi.png",
  "./img/adidas.png",
  "./img/ck.png",
];
const image_Currated = [
  {
    image: "./img/8.jpg",
    title: "Best Seller"
  },
  {
    image: "./img/5.jpg",
    title: "Shop Men"
  },
  {
    image: "./img/3.jpg",
    title: "Shop Women"
  },
  {
    image: "./img/4.jpg",
    title: "Shop Kid"
  },

];

const Home = () => {
  const { data, loading, error } = useFetch('https://fakestoreapi.com/products/categories');

  if (loading) return (
    <>
      <div className="flex justify-center items-center h-screen pb-52">
        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-9xl"></i>
      </div>
    </>
  );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pt-32">
      {/* <Image_Slider /> */}
      <Carousel />
      {/* <!-- brands --> */}
      <div className="md:container m-auto flex flex-col py-5">
        <h2 className="text-4xl font-medium mt-10">Brands123</h2>
        <div className="flex justify-around mt-10">
          {image_brands.map((s, index) => (
            <div className="w-14 h-14" key={index}>
              <img src={s} alt="" className="w-full h-full object-fill" />
            </div>
          ))}
        </div>
      </div>
      {/* <!-- customer experiences --> */}
      <div className="md:container m-auto py-10">
        <div className="flex justify-between">
          <h2 className="text-4xl font-medium text-wrap">
            We provide best <br />
            customer experiences
          </h2>
          <div className="flex justify-center items-center">
            <div className="w-px h-20 bg-black"></div>
            <span className="ml-5">
              We ensure our customers have the best shopping experiences
            </span>
          </div>
        </div>
        {/* <!-- list item --> */}
        <div className="flex justify-around py-5 gap-5">
          <div className="p-4 border-2 border-white rounded-lg hover:border-2 hover:border-red-500 scale-100 hover:scale-105 transition-all duration-1000">
            <i className="fa-solid fa-chevron-down bg-gray-200 p-5 rounded-lg mb-3"></i>
            <h5 className="text-xl font-medium mb-2">Original Products</h5>
            <p className="text-gray-500">
              We provide money back guarantee if the product are not original
            </p>
          </div>
          <div className="p-4 border-2 border-white rounded-lg hover:border-2 hover:border-red-500 scale-100 hover:scale-105 transition-all duration-1000">
            <i className="fa-solid fa-chevron-down bg-gray-200 p-5 rounded-lg mb-3"></i>
            <h5 className="text-xl font-medium mb-2">Original Products</h5>
            <p className="text-gray-500">
              We provide money back guarantee if the product are not original
            </p>
          </div>
          <div className="p-4 border-2 border-white rounded-lg hover:border-2 hover:border-red-500 scale-100 hover:scale-105 transition-all duration-1000">
            <i className="fa-solid fa-chevron-down bg-gray-200 p-5 rounded-lg mb-3"></i>
            <h5 className="text-xl font-medium mb-2">Original Products</h5>
            <p className="text-gray-500">
              We provide money back guarantee if the product are not original
            </p>
          </div>
          <div className="p-4 border-2 border-white rounded-lg hover:border-2 hover:border-red-500 scale-100 hover:scale-105 transition-all duration-1000">
            <i className="fa-solid fa-chevron-down bg-gray-200 p-5 rounded-lg mb-3"></i>
            <h5 className="text-xl font-medium mb-2">Original Products</h5>
            <p className="text-gray-500">
              We provide money back guarantee if the product are not original
            </p>
          </div>
        </div>
      </div>
      {/* <!-- Currated picks --> */}
      <div className="md:container m-auto py-10">
        <h2 className="text-4xl font-medium mb-10">Currated picks</h2>
        <div className="flex justify-between">
          {/* item */}
          {image_Currated.map((item, index) => (
            <div
              key={index}
              className="max-w-[350px] h-[350px] w-[350px] relative flex justify-center items-end border-2 rounded-2xl hover:scale-x-105 transition duration-500"
            >
              <img
                src={item.image}
                alt=""
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>
              <div className="absolute min-w-[50px] max-w-[240px] w-full flex items-center mb-6 justify-between border-2 rounded-lg p-2 border-white hover:border-red-500 bg-white scale-100 hover:scale-105 transition-all duration-500">
                <a href="">{item.title}</a>
                <i className="fa-regular fa-user"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- Fetured picks --> */}
      <Carousel_Card />
      {/* <!-- banner offer --> */}
      <Banner />
      {/* <!-- Subscribe --> */}
      <Subscribe />
    </div>
  );
};

export default Home;
