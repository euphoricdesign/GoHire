'use client'

import React, { useState } from "react";
import { Merriweather } from "next/font/google";
import Home from "@/components/Home/Home";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {increment, decrement} from "@/lib/features/counter/counterSlice"
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { categories } from '../utils/categories'
import jobData from '../utils/jobs.json'
import CardJobs from "@/components/CardJobs/CardJobs";
import { JobsData } from "@/types/jobsTypes";
import Cohete from '../../public/rocket.svg'
import Image from "next/image";

const merriweather = Merriweather({weight: ["300","400","700","900"], style:["italic", "normal"], subsets:["latin"]})

export default function MainPage() {
  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const count = useAppSelector(state => state.counterReducer.value)
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
      <div className="xl:px-[124px] md:px-[60px] mobile:px-[30px] mt-[100px]">
          <div className='text-center'>
            <h1 className='xl:text-4xl text-[2rem] font-semibold text-[#05264E]'>Browse by category</h1>
            <p className='text-[#6c757d] mt-[10px] mb-[35px] text-sm xl:text-base'>Find the job that’s perfect for you. about 800+ new jobs everyday</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {
              categories.map(category => (
                <CategoryCard key={category.id} title={category.category} vacancies={category.vacancies} img={category.img} />
              ))
            }
          </div>

          <div className="text-[#05264E] w-full bg-white pl-[90px] pr-[190px] py-[25px] flex mt-[100px] border border-[#E0E6F7] rounded-[4px] justify-between">
            <div>
              <span className="text-[18px]">Stand out and win more work</span>
              <p className={`${merriweather.className} text-[27px] mt-[10px] max-w-[600px]`}>Ads are a proven way to help you get hired at any stage of your career.</p>
              <button className="mt-[35px] mb-5 text-sm border-none w-[150px] p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden" onClick={() => window.location.href = '/formJobs'}>
                Show me how
              </button>
            </div>
              <Image className="w-[240px] justify-self-end" src={Cohete} alt="" />
          </div>

          <div className='text-center mt-[100px]'>
            <h1 className='xl:text-4xl text-[2rem] font-semibold text-[#05264E]'>Latest Listings</h1>
            <p className='text-[#6c757d] mt-[10px] mb-[35px] text-sm xl:text-base'>Get started with best jobs</p>
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