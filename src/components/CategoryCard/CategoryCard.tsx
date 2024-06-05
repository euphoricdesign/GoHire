import Image from 'next/image'
import React from 'react'

interface CategoryCardProps {
  title: string,
  vacancies: string,
  img: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({title, vacancies, img}) => {
  return (
    <div className='border border-solid border-[rgba(6,18,36,0.1)] py-[22px] px-[18px] flex xl:w-[308px] md:w-[293px] mobile:w-full rounded-xl bg-white gap-3 items-center'>
        <Image src={img} alt='' width={100} height={1} className='w-[45px]' />
        <div>
            <span className='text-base text-[#05264E] font-semibold'>{title}</span>
            <p className='text-xs text-[#05264E]'>{vacancies}</p>
        </div>
    </div>
  )
}

export default CategoryCard