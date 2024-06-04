"use client";

import React, { useState, useEffect } from "react";
import CardJobs from "../../components/CardJobs/CardJobs";
import { useGetAllJobsQuery } from "@/lib/services/jobsApi";
import { JobsData } from "@/types/jobsTypes";
import RetractableJobInfo from "@/components/RetractableJobInfo/RetractableJobInfo";
import RetractableView from "@/components/RetractableView/RetractableView";

const SearchJobs: React.FC = () => {
  const { data, error, isLoading, isFetching } = useGetAllJobsQuery(null);

  const [selectedJobPost, setSelectedJobPost] = useState<JobsData | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<JobsData[] | undefined>(data);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    if (data) {
      applyFilters();
    }
  }, [data, selectedCategory, selectedLocation]);

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

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  const applyFilters = () => {
    let filtered = data;

    if (selectedCategory) {
      filtered = filtered?.filter((job) => job.category === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered?.filter((job) => job.user.city === selectedLocation);
    }

    setFilteredJobs(filtered);
  };

  if (error) return <p>Some Error</p>;

  return (
    <div className="px-[124px]">
      <div className="container mx-auto mt-[100px] flex gap-[20px] items-start">
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
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="custom-select">
              <option value="">Filter by location</option>
              <option value="Ciudad 1">Ciudad 1</option>
              <option value="Ciudad 2">Ciudad 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {isLoading || isFetching ? <p>Loading...</p> : " "}
          {filteredJobs?.map((job) => (
            <CardJobs key={job.id} {...job} onClick={() => handleDescription(job)} />
          ))}
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
