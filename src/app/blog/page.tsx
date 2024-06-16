import React from 'react'

const BlogPage = () => {
  return (
    <div className="px-[124px] mb-[100px]">
        <h1 className="text-4xl font-bold text-[#05264E] mt-[100px]">Blog</h1>
        <p className="text-[#05264E] mt-[1.3rem] text-[1.25rem]">Get the latest news, updates and tips</p>

        <div className="flex flex-wrap mt-[40px] justify-between">
        <div className="w-[32.333333%]">
            <div className="bg-gray-200 h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
            <div className="bg-bgBlog1 bg-center bg-no-repeat h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
                <div className="bg-grayBg absolute bottom-0 top-[10%] w-full z-[2]">
                <div className="absolute bottom-[20px] px-[28px] flex flex-col justify-center items-center">
                    <h3 className="font-[700] text-[28px] text-white mb-[20px]">Email Example: How To Respond to Employer Interview Requests</h3>
                    <div></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="w-[32.333333%]">
            <div className="bg-violet-200 h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
            <div className="bg-bgBlog2 bg-center bg-no-repeat h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
                <div className="bg-grayBg absolute bottom-0 top-[10%] w-full z-[2]">
                <div className="absolute bottom-[20px] px-[28px] flex flex-col justify-center items-center">
                    <h3 className="font-[700] text-[28px] text-white mb-[20px]">21 Job Interview Tips: How To Make a Great Impression</h3>
                    <div></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="w-[32.333333%]">
            <div className="bg-violet-200 h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
            <div className="bg-bgBlog3 bg-center bg-no-repeat h-[550px] bg-cover w-full relative inline-block rounded-[16px] overflow-hidden">
                <div className="bg-grayBg absolute bottom-0 top-[10%] w-full z-[2]">
                <div className="absolute bottom-[20px] px-[28px] flex flex-col justify-center items-center">
                    <h3 className="font-[700] text-[28px] text-white mb-[20px]">Recruiter and Land Your Dream Job Explore Nice Jobs</h3>
                    <div></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default BlogPage