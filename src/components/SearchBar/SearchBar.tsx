import React, { useEffect, useState } from 'react'
import { GoLocation, GoPencil } from "react-icons/go";
import { useGetAllJobsQuery } from '@/lib/services/jobsApi';
import { JobsData } from '@/types/jobsTypes';

const SearchBar = () => {

  const { data, isLoading, isFetching, error } = useGetAllJobsQuery(null)
  const [job, setJob] = useState<JobsData[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setJob(data)
      setLoading(false); // Esto para asegurarte de que `loading` se actualiza correctamente
    }
  }, [data]) // Asegúrate de agregar `data` como dependencia del useEffect

  const filteredJobs = job.filter(jobItem =>
    jobItem.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const JobsItem = ({ job }: { job: JobsData }) => (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <a href={job.category}>{job.category}</a> {/* Ajusta el contenido según necesites */}
      </div>
    </article>
  );

  return (
    <form className='md:w-[600px] bg-white py-[12px] px-[16px] md:flex gap-4 items-center justify-center rounded shadow-custom'>
      <div className='w-[200px] flex items-center mobile:mb-[15px] md:mb-0'>
        <label htmlFor="search"><GoPencil className='text-gray-600' /></label>
        <input
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='py-[0.6rem] px-4 focus:outline-none'
          type="text"
          placeholder='Keywords'
        />
        {searchTerm.length > 0 && !loading && (
          <div className="absolute z-10 bg-white text-blue-700 w-full rounded-md mt-1">
            {filteredJobs.map(job => (
              <JobsItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
      {/* <div className='w-[200px] flex items-center mobile:mb-[15px] md:mb-0'>
        <label htmlFor=""><GoLocation className='text-gray-600' /></label>
        <input className='py-[0.6rem] px-4 focus:outline-none' type="text" placeholder='Location' />
      </div> */}
      <div>
        <button className='mb-0 text-sm border-none md:w-28 mobile:w-full p-2.5 h-10 rounded text-white font-medium bg-[#3C65F5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80'>
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
