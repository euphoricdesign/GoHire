import React from 'react';
import Carousel from '../Carousel/Carousel';

const SpotlightListings = () => {
  return (
    <div className='text-center mt-[100px]'>
      <h1 className='xl:text-4xl text-[2rem] font-semibold text-[#05264E]'>Spotlight Listings</h1>
      <p className='text-[#6c757d] mt-[10px] mb-[35px] text-sm xl:text-base'>Get started with best jobs</p>
      <Carousel />
    </div>
  );
};

export default SpotlightListings;