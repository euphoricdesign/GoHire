import React from 'react'
import { GoLocation, GoPencil } from "react-icons/go";
2
const SearchBar = () => {
  return (
    <form className='w-[730px] bg-white py-[12px] px-[16px] flex gap-4 items-center justify-center rounded shadow-custom'>
       <div className='w-[calc(50% - 63px)] flex items-center'>
          <label htmlFor=""><GoPencil className='text-gray-600' /></label>
          <input className='py-[0.6rem] px-4 focus:outline-none' type="text" placeholder='Keywords' />
       </div>
       <div></div>
       <div className='w-[calc(50% - 63px)] flex items-center'>
          <label htmlFor=""><GoLocation className='text-gray-600' /></label>
          <input className='py-[0.6rem] px-4 focus:outline-none' type="text" placeholder='Location' />
       </div>
       <div>
        <button className='mb-0 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium bg-[#5049E5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 '>Buscar</button>
       </div>
    </form>
  )
}

export default SearchBar