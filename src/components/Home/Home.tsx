import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import imagenHome from '../../../public/chica.png'
import Image from 'next/image'

const Home = () => {
  return (
    <>
        <div className='min-h-screen flex justify-center items-center bg-violetBg bg-fixed z-0 bg-center'>
            <div className='flex justify-evenly items-center'>
                <div className='flex flex-col gap-14 mt-[250px]'>
                    <h1 className='text-6xl font-bold text-[#363636] w-[500px]'>Your perfect job awaits</h1>
                    <p className='text-[#363636] font-normal text-2xl'>25.478 Offers Worldwide</p>
                    <SearchBar />
                    <p className='text-[#363636] text-sm mt-10'>Don’t know where to start?</p>
                    <div>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Sales</a>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Customer Service</a>
                        <a href="" className='inline-block bg-[#f3f2fc] rounded px-4 py-2 text-xs text-[#5049e1] mr-2 mb-2 transition-colors duration-300 ease-in'>Accounting</a>
                    </div>
                </div>
                <Image className='w-[540px]' src={imagenHome} alt="" />
            </div>
        </div>

        <div className='p-10'>
            <h2 className='font-bold text-4xl'>Simple section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto doloribus perferendis non incidunt tenetur aliquam eligendi laudantium quisquam nemo. Sunt modi et quidem ab ipsa non, nesciunt optio amet architecto, voluptatibus eum itaque, hic exercitationem perspiciatis labore fugit blanditiis nulla?</p>
        </div>
    </>
  )
}

export default Home

