"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobsPostData } from '@/types/jobsTypes';
import { usePostJobMutation } from "@/lib/services/jobsApi"
import { FaInfoCircle, FaBriefcase, FaAlignLeft, FaFolder } from 'react-icons/fa';
import Collaborators from '../../../public/collaborators.svg'
import Image from 'next/image';


const FormJobs: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<JobsPostData>();
    const [postJob, { isLoading, isError, isSuccess }] = usePostJobMutation();

    const onSubmit: SubmitHandler<JobsPostData> = async (data) => {
        try {
            await postJob(data).unwrap();
            toast.success("Post created successfully!");
        } catch (error) {
            toast.error("Failed to create post. Please try again.");
            console.error("Error creating post:", error);
        }
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const hourString = hour.toString().padStart(2, '0');
                const minuteString = minute.toString().padStart(2, '0');
                const timeString = `${hourString}:${minuteString}`;
                options.push(<option key={timeString} value={timeString}>{timeString}</option>);
            }
        }
        return options;
    };

    return (
        <section className="mt-[80px]">
            <ToastContainer />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex gap-[90px]">
                    <div className="lg:col-span-2 flex flex-col gap-[80px]">
                        <p className="max-w-xl text-[30px] text-[#05264E] font-semibold text-center">
                            Create Your Best Job Proposal
                        </p>
                        <Image src={Collaborators} width={100} height={1} alt='' className='w-[840px]' />
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                                <div className="flex items-center">
                                    <div className="w-10 text-[#3C65F5]">
                                        <FaBriefcase className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow relative">
                                        <input
                                            className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                                            placeholder="Job Title"
                                            type="text"
                                            id="jobTitle"
                                            {...register("title", {
                                                required: "The title is required.",
                                                maxLength: { value: 20, message: "The title cannot be more than 20 characters." }
                                            })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                                        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 text-[#3C65F5] mt-2">
                                        <FaAlignLeft className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow relative">
                                        <textarea
                                            className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 resize-none peer"
                                            placeholder="Description"
                                            id="description"
                                            rows={4}
                                            {...register("description", {
                                                required: "The description is mandatory.",
                                                maxLength: { value: 200, message: "The description cannot be more than 200 characters." }
                                            })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-10 text-[#3C65F5]">
                                        <FaFolder className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow relative">
                                        <input
                                            className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                                            placeholder="Category"
                                            type="text"
                                            id="category"
                                            {...register("category", {
                                                required: "The Category is required",
                                                maxLength: { value: 20, message: "The Category cannot be more than 20 characters." }
                                            })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                                        {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-100 rounded-lg flex items-start space-x-2">
                                    <FaInfoCircle className="w-5 h-5 text-[#3C65F5] mt-1 flex-shrink-0" />
                                    <p className="text-sm text-blue-700">
                                        <span className="font-semibold">Nota:</span> The time of publication will be automatically added to your post when you submit it.
                                    </p>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full text-white px-4 py-3 rounded font-semibold transition duration-300"
                                        style={{ backgroundColor: '#4537D4' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Creating...' : 'Create Proposal'}
                                    </button>
                                </div>
                                {isError && <div className="text-red-500 text-center">An error occurred while creating the post.</div>}
                                {isSuccess && <div className="text-green-500 text-center">Post created successfully!</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormJobs;
