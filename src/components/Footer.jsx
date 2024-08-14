import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="md:container m-auto bg-gray-200">
        {/* deprision */}
        <div className="flex  pt-10 justify-between">
          <div className=" w-[600px] items-start">
            <div className="rounded-full border-[3px] border-black h-20 w-20 flex justify-center items-center">
              <img className="h-16 w-16 text-black p-2" src="./img/logo_v3.png" alt="" />
            </div>
            <p className=" max-w-[500px] pl-4 pr-4 text-gray-400 text-lg mt-5 ">
              Specializes in providing high-quality,stylish products for your
              wardrobe
            </p>
          </div>
          {/* Shop */}
          <div className="flex flex-col space-y-2  ">
            <h6 className="font-semibold uppercase text-lg">Shop</h6>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="">All Collectionss</a>
              </li>
              <li>
                <a href="">Winter Edition</a>
              </li>
              <li>
                <a href="">Discount</a>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div className="flex flex-col space-y-2  ">
            <h6 className="font-semibold uppercase text-lg">Company</h6>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="">Affilitaes</a>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div className="flex flex-col space-y-2  ">
            <h6 className="font-semibold uppercase text-lg">Support</h6>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="">FAQs</a>
              </li>
              <li>
                <a href="">Cookie Policy</a>
              </li>
              <li>
                <a href="">Term of Use</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="font-semibold uppercase text-center text-lg">
              Payment Methods
            </h6>
            <div className="flex justify-between gap-8">
              <img className="h-10 w-10" src="./img/visa_icon.svg" alt="" />
              <img
                className="h-10 w-10"
                src="./img/mastercard_icon.svg"
                alt=""
              />
              <img className="h-10 w-10" src="./img/paypal_icon.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center space-y-10 py-10">
          <div className="w-full h-px bg-gray-400"></div>
          <p className="text-gray-400">
            Copyright @ 2022 Nostra. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
