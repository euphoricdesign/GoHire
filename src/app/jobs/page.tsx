"use client";

import React, { useState, useEffect } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import { useListJobsQuery } from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";
import BannerCategory from "@/components/BannerCategory/BannerCategory";

const SearchJobs: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data, isLoading, isFetching, error } = useListJobsQuery({
    page,
    category: selectedCategory,
    city: selectedCountry,
  });

  useEffect(() => {
    setPage(page);
  }, [data]);

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
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const totalPages = Math.ceil((data?.count ?? 0) / 10);

  if (error) return <p>Some Error</p>;

  return (
    <div className="md:px-[124px] mobile:px-[30px]">
      <BannerCategory
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />

      <div className="container mx-auto mt-[100px] gap-[20px] items-start md:flex-row md:items-start mobile:flex-col mobile:items-center">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {isLoading || isFetching ? <p>Loading...</p> : ""}
            {data?.publicationsFind && data.publicationsFind.length > 0 ? (
              data.publicationsFind.map((job) => (
                <CardJobs key={job.id} {...job} onClick={() => handleDescription(job)} />
              ))
            ) : (
              <p className="text-center text-red-500 mt-8">
                No hay datos disponibles para mostrar por el momento
              </p>
            )}
          </div>
          <div className="w-full flex justify-center mt-4">
            <button onClick={() => setPage(page - 1)} disabled={isFetching || page === 1}>
              Previous
            </button>
            <div>{page}</div>
            <button onClick={() => setPage(page + 1)} disabled={isFetching || page === totalPages}>
              Next
            </button>
          </div>
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
