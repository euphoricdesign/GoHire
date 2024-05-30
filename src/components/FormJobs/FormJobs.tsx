// pages/formulario.tsx
"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormData {
    name: string;
    jobTitle: string;
    description: string;
    bio: string;
    publishedDate: string;
    readingTime: string;
    imageUrl: string;
}

const FormJobs: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();



    const onSubmit: SubmitHandler<FormData> = data => {
        toast.success("Post created successfully!");
        console.log(data, "el boton funciona");
        // Aquí se realizará el envío de datos a la API.



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
        <section className="bg-gray-100">
            <ToastContainer />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                        Create Your Best Job Proposal
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

                                <div>
                                    <label htmlFor="jobTitle"></label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Job Title"
                                        type="text"
                                        id="jobTitle"
                                        {...register("jobTitle", {
                                            required: "El título del trabajo es obligatorio.",
                                            maxLength: { value: 20, message: "El título no puede tener más de 20 caracteres." }
                                        })}
                                    />
                                    {errors.jobTitle && <span>{errors.jobTitle.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="description"></label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Description"
                                        id="description"
                                        {...register("description", {
                                            required: "La descripción es obligatoria.",
                                            maxLength: { value: 200, message: "La descripción no puede tener más de 200 caracteres." }
                                        })}
                                    />
                                    {errors.description && <span>{errors.description.message}</span>}
                                </div>

                                <div>
                                    <label htmlFor="publishedDate"></label>
                                    <input
                                        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-custom-focus"
                                        placeholder="Published Date"
                                        type="date"
                                        id="publishedDate"
                                        {...register("publishedDate", { required: "La fecha de publicación es obligatoria." })}
                                    />
                                    {errors.publishedDate && <span>{errors.publishedDate.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="readingTime"></label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        id="readingTime"
                                        {...register("readingTime", { required: "El tiempo de lectura es obligatorio." })}
                                    >
                                        <option value="">Select Reading Time</option>
                                        {generateTimeOptions()}
                                    </select>
                                    {errors.readingTime && <span>{errors.readingTime.message}</span>}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg px-5 py-3 font-medium text-white sm:w-auto"
                                        style={{ backgroundColor: '#4537D4' }}
                                    >
                                        Create Proposal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormJobs;
