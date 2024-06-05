import React from 'react'
import { GoLocation, GoPencil } from "react-icons/go";
2
const SearchBar = () => {
  return (
   <form className='md:w-[450px] xl:w-[600px] bg-white py-[12px] px-[16px] md:flex gap-4 items-center xl:justify-center md:justify-between mobile:justify-center rounded shadow-custom'>
      <div className='w-[100px] xl:w-[200px] flex items-center mobile:mb-[15px] md:mb-0'>
         <label htmlFor=""><GoPencil className='text-gray-600 text-[14px] xl:text-[16px]' /></label>
         <input className='w-[130px] xl:w-[200px] py-[0.6rem] px-4 focus:outline-none text-[14px] xl:text-[16px]' type="text" placeholder='Keywords' />
      </div>
      <div className='w-[100px] xl:w-[200px] flex items-center mobile:mb-[15px] md:mb-0'>
         <label htmlFor=""><GoLocation className='text-gray-600 text-[14px] xl:text-[16px]' /></label>
         <input className='w-[130px] xl:w-[200px] py-[0.6rem] px-4 focus:outline-none text-[14px] xl:text-[16px]' type="text" placeholder='Location' />
      </div>
      <div>
         <button className='mb-0 text-sm border-none md:w-28 mobile:w-full p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 '>Buscar</button>
      </div>
   </form>
  )
}

export default SearchBar