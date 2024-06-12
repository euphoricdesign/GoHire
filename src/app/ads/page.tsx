'use client'

import Image from 'next/image'
import React from 'react'
import Grow from '../../../public/grow.svg'
import { FaHighlighter, FaRegLightbulb  } from "react-icons/fa6";
import { SiSpotlight } from "react-icons/si";

const Ads = () => {
  return (
    <div className='my-[170px] px-[124px]'>
        <div className='flex justify-between'>
            <div className='w-[600px] text-[#05264E]'>
                <h1 className='text-5xl font-bold'>Gain work opportunities with ads</h1>
                <p className='mt-[2.1rem] text-[1.25rem]'>Choosing the recommended budget means that your offer will receive better visibility and will be displayed more often in search results, making it easier for people looking for a job like yours to apply.</p>
                <div className='mt-[2.1rem] flex items-center gap-[20px]'>
                    <button
                        className="text-base border-none w-40 p-2.5 h-12 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0"
                        onClick={() => (window.location.href = "/formJobs")}>
                        Get Started
                    </button>
                    <a href='#' className='text-[#3C65F5]'>Learn about ads products</a>
                </div>
            </div>
            <Image src={Grow} alt='' className='w-[550px]' />
        </div>

        <h2 className='text-4xl font-bold text-[#05264E] mt-[4.5rem]'>Benefits of using spotlight posts to reach your work goal</h2>

        <div className='mt-[4.5rem] flex justify-between'>
            <div className="card">
                <div className="content">
                    <FaHighlighter />
                    <p className="para">
                        Highlighting posts attracts more candidates, expanding your hiring options.
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="content">
                    <SiSpotlight />
                    <p className="para">
                        Highlight your postings to target candidates with specific skills and relevant experience.
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="content">
                    <FaRegLightbulb />
                    <p className="para">
                        Standing out attracts more qualified candidates, streamlining the hiring process.
                    </p>
                </div>
            </div>
        </div>

        <div>
            <h2 className='text-4xl font-bold text-[#05264E] mt-[4.5rem]'>Why do I need to use ads?</h2>
            <p className='text-[#05264E] mt-[2.1rem] text-[1.25rem]'>Advertising is an optional choice; proposals can be submitted without it. However, ads provide increased visibility, helping you secure desired projects and streamline your workflow for maximized earnings on high-quality endeavors.</p>
            <button
                className="mt-[2.1rem] text-base border-none w-40 p-2.5 h-12 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0"
                onClick={() => (window.location.href = "/formJobs/spotlight-post")}>
                Try ads today
            </button>
        </div>

        
        
        
    </div>
  )
}

export default Ads

// three ways to use featured posts to achieve your work goal