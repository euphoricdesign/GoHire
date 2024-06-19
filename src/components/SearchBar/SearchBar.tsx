"use client"

import React, { useEffect, useState } from 'react'
import { GoPencil } from "react-icons/go";
import { useGetAllPublicationQuery } from '@/lib/services/jobsApi';
import {JobsData } from '@/types/jobsTypes';
import Link from 'next/link';

const SearchBar = () => {
  const { data, isLoading } = useGetAllPublicationQuery(null);
  const [job, setJob] = useState<JobsData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && data?.publicationsFind?.length > 0) {
      setJob(data.publicationsFind);
      setLoading(false);
    }
  }, [data]);

  const filteredJobs = data?.publicationsFind?.filter(jobItem =>
    jobItem.category.includes(searchTerm)
  );

  console.log(filteredJobs)
  
  const JobsItem = ({ job }: { job: JobsData }) => (
    <article className="rounded-xl border-2 border-gray-100 bg-white p-2 mb-1">
      <div className="flex items-start gap-2">
          <a href={`/jobs/${job.id}`} className="block shrink-0">
            <img
              alt=""
              src={job.imgUrl}
              className="w-14 h-14 rounded-lg object-cover cursor-pointer"
            />
          </a>
        <div className="flex-1">
          <p className="font-medium text-sm">
              <a href={`/jobs/${job.id}`} className="hover:underline cursor-pointer">{job.title}</a>
          </p>
          <p className="line-clamp-2 text-xs text-gray-700">
            {job.description}
          </p>
          <p className="line-clamp-2 text-xs text-gray-700 mb-1">
            {job.date}
          </p>
          <div className="mt-1 text-gray-500 font-medium text-xs">{job.category}</div>
        </div>
      </div>
    </article>
  );
  return (
    <form className='relative max-w-[500px] bg-white py-[12px] px-[16px] flex gap-4 items-center rounded shadow-custom'>
        <div className='flex-1 relative'>
          <div className='flex items-center'>
            <GoPencil className='text-gray-600 mr-2' />
            <input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='py-[0.6rem] px-4 focus:outline-none w-full'
              type="text"
              placeholder='Keywords'
            />
          </div>
          {searchTerm.length > 0 && !loading && (
            <div className="absolute z-10 bg-white text-blue-700 w-full rounded-md mt-1 max-h-60 overflow-y-auto">
              {filteredJobs?.map(job => (
                <JobsItem key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
    </form>
  );
}
export default SearchBar;