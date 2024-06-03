import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import imagenHome from '../../../public/location.svg'
import Image from 'next/image'

const Home = () => {
  return (
    <>
        <div className='md:min-h-screen mobile:px-[30px] md:px-[124px]'>
            <div className='md:flex items-center justify-between'>
                <div className='flex flex-col gap-14 md:mt-[247px] mobile:mt-[200px]'>
                    <h1 className='md:text-6xl mobile:text-4xl font-bold text-[#363636] md:w-[500px]' style={{lineHeight: "63px"}}>Your <span className='text-[#3C65F5] relative spanAfter'>perfect job</span> awaits</h1>
                    <p className='text-[#363636] font-normal text-2xl'>25.478 Offers Worldwide</p>
                    <SearchBar />
                    <p className='text-[#363636] text-sm mt-10'>Don’t know where to start?</p>
                    <div>
                        <a href="" className='inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in'>Sales</a>
                        <a href="" className='inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in'>Customer Service</a>
                        <a href="" className='inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in'>Accounting</a>
                    </div>
                </div>
                <Image className='mobile:hidden md:block w-[560px]' src={imagenHome} alt="" />
            </div>
        </div>
    </>
  )
}

export default Home

