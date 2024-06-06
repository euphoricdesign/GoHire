'use client'

import React, { useState } from "react";
import Home from "@/components/Home/Home";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { categories } from '../utils/categories'
import jobData from '../utils/jobs.json'
import CardJobs from "@/components/CardJobs/CardJobs";
import { JobsData } from "@/types/jobsTypes";


export default function MainPage() {
  
  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const dispatch = useAppDispatch()

  const handleDescription = (job: JobsData | null) => {
    setSelectedJobPost(job);
    setShowDescription(true);
  }

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedJobPost(null);
  }

  return (
    <div className="relative">
      <Home />
      <div className="md:px-[124px] mobile:px-[30px] mt-[100px]">
        
          <div className='text-center'>
            <h1 className='text-4xl font-semibold text-[#363636]'>Browse by category</h1>
            <p className='text-[#6c757d] mt-[10px] mb-[35px]'>Find the job that’s perfect for you. about 800+ new jobs everyday</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {
              categories.map(category => (
                <CategoryCard key={category.id} title={category.category} vacancies={category.vacancies} img={category.img} />
              ))
            }
          </div>

          <div className='text-center mt-[100px]'>
            <h1 className='text-4xl font-semibold text-[#363636]'>Latest Listings</h1>
            <p className='text-[#6c757d] mt-[10px] mb-[35px]'>Get started with best jobs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-[100px]">
            {/* {
              jobData.users.map((user, index) => (
                <CardJobs  key={index} {...user} onClick={() => handleDescription({...user})} />
              ))
            } */}
          </div>
      </div>
      
     
       
    </div>
  );
}