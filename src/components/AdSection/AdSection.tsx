import React from 'react';
import { Merriweather } from "next/font/google";
import Cohete from '../../../public/rocket.svg'
import Image from "next/image";

const merriweather = Merriweather({weight: ["300","400","700","900"], style:["italic", "normal"], subsets:["latin"]})

const AdSection = () => {
  return (
    <div className="text-[#05264E] w-full bg-white pl-[90px] pr-[190px] py-[25px] flex mt-[100px] border border-[#E0E6F7] rounded-[4px] justify-between">
      <div>
        <span className="text-[18px]">Stand out and win more work</span>
        <p className={`${merriweather.className} text-[27px] mt-[10px] max-w-[600px]`}>Ads are a proven way to help you get hired at any stage of your career.</p>
        <button className="mt-[35px] mb-5 text-sm border-none w-[150px] p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden">
          <a href="/ads">Show me how</a>
        </button>
      </div>
      <Image className="w-[240px] justify-self-end" src={Cohete} alt="" />
    </div>
  );
};

export default AdSection;