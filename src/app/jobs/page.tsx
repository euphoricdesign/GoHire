"use client"

import React, { useState, useEffect } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import { useListJobsQuery, useGetAllJobsQuery } from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";
import BannerCategory from "@/components/BannerCategory/BannerCategory";

const SearchJobs: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { data: dataGetAll, isLoading: isLoadingGetAll, isFetching: isFetchengGetAll, error: errorGetAll } = useGetAllJobsQuery(null)
console.log("dataGetAll: ", dataGetAll)

  const { data, isLoading, isFetching, error } = useListJobsQuery({
    page,
    category: selectedCategory,
    city: selectedCountry,
  });

  useEffect(() => {
    console.log("Current page:", page);
    console.log("Current category:", selectedCategory);
    console.log("Current country:", selectedCountry);
  }, [page, selectedCategory, selectedCountry, data]);

  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const handleDescription = (job: JobsData | null) => {
    setSelectedJobPost(job);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedJobPost(null);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset page to 1 when category changes
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setPage(1); // Reset page to 1 when country changes
  };

  const totalPages = Math.ceil((dataGetAll?.length ?? 0) / 10);

  return (
    <div className="md:px-[124px] mobile:px-[30px]">
      <BannerCategory
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />

      <div className="container mx-auto mt-[100px] mb-[40px] gap-[20px] items-start md:flex-row md:items-start mobile:flex-col mobile:items-center">
        <div className="flex flex-col">
          {isLoading || isFetching ? (
            <div className="w-full flex flex-row gap-2 justify-center items-center">
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {data && data.length > 0 && data.map((job) => (
                <CardJobs key={job.id} {...job} onClick={() => handleDescription(job)} />
              ))}
            </div>
          )}

          {/* Paginado */}
          <div className={`flex items-center justify-center mt-4 ${isLoading && 'hidden'}`}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={isFetching || page === 1}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isFetching || page === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#3C65F5] hover:bg-[#3c52f5] text-white'
              }`}
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="px-4 py-2 text-gray-700">
              {page}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={isFetching || page === totalPages}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isFetching || page === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#3C65F5] hover:bg-[#3c52f5] text-white'
              }`}
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Fin Paginado */}
        </div>
        <div>
          <RetractableView show={showDescription} onClose={handleCloseDescription}>
            {selectedJobPost && <RetractableJobInfo selectedJob={selectedJobPost} />}
          </RetractableView>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
