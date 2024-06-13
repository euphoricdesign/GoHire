import React from 'react';
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { categories } from '../../utils/categories'

const Categories = () => {
  return (
    <div>
      <div className='text-center'>
        <h1 className='xl:text-4xl text-[2rem] font-semibold text-[#05264E]'>Browse by category</h1>
        <p className='text-[#6c757d] mt-[10px] mb-[35px] text-sm xl:text-base'>Find the job that's perfect for you. about 800+ new jobs everyday</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {
          categories.map(category => (
            <CategoryCard key={category.id} title={category.category} vacancies={category.vacancies} img={category.img} />
          ))
        }
      </div>
    </div>
  );
};

export default Categories;