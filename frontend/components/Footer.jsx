import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-10">
      <div className="">
        <div className="">
          <a href="#hero" className="flex justify-center">
            <Image
              src="/KumbiVote-Footer.svg"
              width={140}
              height={45}
              alt="Kumbi Logo"
            />
          </a>
          <ul className="flex flex-col items-center justify-center gap-6 pb-16 text-lg transition-all duration-500 md:flex-row md:gap-12">
            <li>
              <a href="#hero" className="text-gray-800 hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-gray-800 hover:text-indigo-600"
              >
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-800 hover:text-indigo-600">
                About us
              </a>
            </li>
            <li>
              <a href="#steps" className="text-gray-800 hover:text-indigo-600">
                Steps
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 py-7">
          <div className="flex flex-col-reverse items-center justify-between md:flex-row">
            <span className="text-sm text-gray-500 mt-7 md:mt-0">
              ©<a href="https://pagedone.io/">KumbiTrace</a> 2024, All rights
              reserved.
            </span>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <input
                type="text"
                name="email"
                className="h-12 px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none"
                placeholder="Enter your mail.."
              />
              <button className="h-12 py-3.5 px-7 text-sm bg-indigo-600 shadow-sm rounded-full text-white font-bold hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
