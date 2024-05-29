
"use client"
import React, { useState } from 'react';

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
    const [formData, setFormData] = useState<FormData>({
        name: '',
        jobTitle: '',
        description: '',
        bio: '',
        publishedDate: '',
        readingTime: '',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        //aca se va a ser el envio de datos a la apiiii.
    };

    return (
        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            At the same time, the fact that we are wholly owned and totally independent from
                            manufacturer and other group control gives you confidence that we will only recommend what
                            is right for you.
                        </p>

                        <div className="mt-8">
                            <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
                            <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="sr-only" htmlFor="name">Name</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="jobTitle">Job Title</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Job Title"
                                    type="text"
                                    id="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="description">Description</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Description"
                                    type="text"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="bio">Bio</label>
                                <textarea
                                    className="w-full rounded-lg focus:border-custom-focus p-3 text-sm"
                                    placeholder="Bio"
                                    id="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="publishedDate">Published Date</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-custom-focus"
                                    placeholder="Published Date"
                                    type="text"
                                    id="publishedDate"
                                    value={formData.publishedDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="readingTime">Reading Time</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Reading Time"
                                    type="text"
                                    id="readingTime"
                                    value={formData.readingTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="imageUrl">Image URL</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Image URL"
                                    type="text"
                                    id="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg px-5 py-3 font-medium text-white sm:w-auto"
                                    style={{ backgroundColor: '#4537D4' }}
                                >
                                    Send Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormJobs;
