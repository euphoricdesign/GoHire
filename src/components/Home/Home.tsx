import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import imagenHome from '../../../public/chica.png'
import Image from 'next/image'

const Home = () => {
  return (
    <>
        <div className='md:min-h-screen md:flex justify-center items-center md:bg-violetBg bg-fixed z-0 bg-center mobile:px-[30px]'>
            <div className='md:flex justify-evenly items-center'>
                <div className='flex flex-col gap-14 md:mt-[250px] mobile:mt-[200px]'>
                    <h1 className='md:text-6xl mobile:text-4xl font-bold text-[#363636] md:w-[500px]'>Your <span className='text-[#5049e1]'>perfect job</span> awaits</h1>
                    <p className='text-[#363636] font-normal text-2xl'>25.478 Offers Worldwide</p>
                    <SearchBar />
                    <p className='text-[#363636] text-sm mt-10'>Don’t know where to start?</p>
                    <div>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Sales</a>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Customer Service</a>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Accounting</a>
                    </div>
                </div>
                <Image className='mobile:hidden md:block w-[540px]' src={imagenHome} alt="" />
            </div>
        </div>
    </>
  )
}

export default Home

