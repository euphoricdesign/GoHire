"use client";

import React, { useState, useEffect } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import { useListJobsQuery } from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";

const SearchJobs: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { data, isLoading, isFetching, error } = useListJobsQuery({
    page,
    category: selectedCategory,
    city: selectedCity,
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

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  if (error) return <p>Some Error</p>;

  return (
    <div className="md:px-[124px] mobile:px-[30px]">
      <div className="container mx-auto mt-[100px] flex gap-[20px] items-start md:flex-row md:items-start mobile:flex-col mobile:items-center">
        <div className="flex justify-center mb-4 flex-col gap-[20px]">
          <div className="mr-4">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="custom-select">
              <option value="">Filter by category</option>
              <option value="Enfermera">Enfermera</option>
              <option value="Chef">Chef</option>
              <option value="Dentista">Dentista</option>
              <option value="Psicólogo">Psicólogo</option>
              <option value="Doctor">Doctor</option>
              <option value="Fotógrafo">Fotógrafo</option>
              <option value="Científico">Científico</option>
              <option value="Maestro">Maestro</option>
              <option value="Mecánico">Mecánico</option>
              <option value="Abogado">Abogado</option>
            </select>
          </div>

          <div>
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="custom-select">
              <option value="">Filter by City</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Arica">Arica</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {isLoading || isFetching ? <p>Loading...</p> : ""}
            {data && data.length > 0 ? (
              data.map((job) => (
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
            <button onClick={() => setPage(page + 1)} disabled={isFetching}>
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
